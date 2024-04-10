import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CaptureInput, CheckoutInput, CreateOrderInput, OrderParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import {
    createAndSaveOrderToDatabase,
    findOrder,
    findOrderByFilterAndDelete,
    findOrderByFilterAndUpdate,
    getOrders
} from '../services/order.service';
import { toObjectId } from '../utils/helper-functions';
import { findProductByFilterAndUpdate, getProducts } from '../services/product.service';
import '../utils/paypal-api';
import { captureOrder, createPaypalOrder } from '../utils/paypal-api';
import { OrdersCreate } from '@paypal/checkout-server-sdk/lib/orders/lib';

const readAllOrdersHandler = asyncHandler(async (req: Request<StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;
    const orders = await getOrders({ storeId: params.storeId });
    res.status(HttpCode.OK).json(orders);
});

const readOrderHandler = asyncHandler(async (req: Request<OrderParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const order = await findOrder({ _id: params.orderId, storeId: params.storeId });

    if (order.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Order not found');
    }

    res.status(HttpCode.OK).json(order[0]);
});

const createOrderHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateOrderInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const order = await createAndSaveOrderToDatabase({
        ...body,
        storeId: toObjectId(params.storeId),
        orderItems: [...body.orderItems.map((order) => toObjectId(order))]
    });

    res.status(201).json(order);
});

const deleteOrderHandler = asyncHandler(async (req: Request<OrderParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const order = await findOrderByFilterAndDelete({ _id: params.orderId, storeId: params.storeId });

    if (!order) {
        return throwError(HttpCode.NOT_FOUND, 'Order not found.');
    }
    res.status(HttpCode.OK).json({ message: 'order deleted.' });
});

// Paypal Payment Controllers
const checkoutOrderHandler = asyncHandler(async (req: Request<StoreParams, {}, CheckoutInput>, res: Response, next: NextFunction) => {
    const { cartDetails, storeId, customerDetails } = req.body;

    // save order items ids to save later to the order  model in our database
    const orderItems_Ids = cartDetails.map((item) => toObjectId(item._id));

    let orderProducts;
    try {
        // fetch products by id from database
        orderProducts = await getProducts({ _id: { $in: orderItems_Ids } });

        // calculate order total price
        const orderTotal = orderProducts.reduce((total, product) => total + product.price, 0);

        // Generate order payload
        const createOrderPayload: OrdersCreate.RequestData = {
            // set intent mode
            intent: 'CAPTURE',
            // set order details
            purchase_units: [
                {
                    // order total after taxes,insurance...etc
                    amount: {
                        value: String(orderTotal),
                        currency_code: 'USD',
                        // how was the order total Calculated
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: String(orderTotal)
                            }
                        }
                    },
                    // order items
                    items: orderProducts.map((product) => ({
                        name: product.name,
                        quantity: '1',
                        category: 'PHYSICAL_GOODS',
                        unit_amount: { value: String(product.price), currency_code: 'USD' }
                    }))
                }
            ]
        };

        // send the request to Paypal Rest API
        const createOrderResponse = await createPaypalOrder(createOrderPayload);

        // update the database
        const savedOrder = await createAndSaveOrderToDatabase({
            storeId: toObjectId(storeId),
            orderItems: orderItems_Ids,
            paypalOrderId: createOrderResponse.id,
            address: customerDetails.address,
            phone: customerDetails.phone
        });

        // send  the order ID back to the client to complete the checkout process
        res.status(201).json(createOrderResponse);
    } catch (error) {
        return throwError(HttpCode.INTERNAL_SERVER_ERROR, 'Payment Process Failed');
    }
});

const captureOrderHandler = asyncHandler(async (req: Request<StoreParams, {}, CaptureInput>, res: Response, next: NextFunction) => {
    const { orderId } = req.body;
    const { storeId } = req.params;

    try {
        // Capture the order
        const captureOrderResponse = await captureOrder(orderId);

        // update order and make it as paid
        const confirmedOrder = await findOrderByFilterAndUpdate({ paypalOrderId: orderId, storeId: storeId }, { isPaid: true });

        // mark order products as archived and unFeatured
        if (confirmedOrder && confirmedOrder.orderItems?.length > 0) {
            for (let i = 0; i < confirmedOrder?.orderItems.length; i++) {
                const productId = confirmedOrder?.orderItems[i]._id;
                await findProductByFilterAndUpdate({ _id: productId }, { isArchived: true, isFeatured: false });
            }
        }

        res.json({ success: true });
    } catch (error) {
        return throwError(HttpCode.INTERNAL_SERVER_ERROR, 'failed to capture the order details');
    }
});

export const orderControllers = {
    readAllOrdersHandler,
    readOrderHandler,
    createOrderHandler,
    deleteOrderHandler,
    checkoutOrderHandler,
    captureOrderHandler
};
