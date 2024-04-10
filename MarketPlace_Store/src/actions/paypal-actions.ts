import {
    OnApproveData,
    OnApproveActions,
    CreateOrderData,
    CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';

const CHECKOUT_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`;
const CAPTURE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/orders/capture`;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

export async function createOrder(
    cartDetails: any[],
    customerDetails: { address: string; phone: string }
) {
    try {
        // send request to the server with cart details
        const createOrderResponse = await fetch(CHECKOUT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartDetails,
                storeId: STORE_ID,
                customerDetails,
            }),
            cache: 'no-cache',
        });

        const createOrderDetails = await createOrderResponse.json();

        // Return order id
        return createOrderDetails.id;
    } catch (error) {
        throw new Error('Payment Failed. 😣');
    }
}

export async function approveOrder(data: OnApproveData) {
    // This function captures the funds from the transaction.
    try {
        const captureOrderResponse = await fetch(CAPTURE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: data.orderID,
            }),
            cache: 'no-cache',
        });
        const captureOrderDetails = await captureOrderResponse.json();
        return captureOrderDetails;
    } catch (error) {
        throw new Error('Payment Failed. 😣');
    }
}
