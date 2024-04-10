// -------------------------------- STANDARD WAY BASED ON PAYPAL REST API DOCUMENTATION--------------------------------

import { type OrdersCreate } from '@paypal/checkout-server-sdk/lib/orders/lib';
import { HttpCode, throwError } from './customError';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NODE_ENV } = process.env;
const paypal_endpoint_url = NODE_ENV === 'development' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            return throwError(HttpCode.INTERNAL_SERVER_ERROR, 'Payment failed');
        }
        const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
        const response = await fetch(`${paypal_endpoint_url}/v1/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Failed to generate Access Token:', error);
        return throwError(HttpCode.INTERNAL_SERVER_ERROR, 'Payment failed');
    }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export const createPaypalOrder = async (payload: OrdersCreate.RequestData) => {
    // use the cart information passed from the front-end to calculate the purchase unit details

    const accessToken = await generateAccessToken();
    const url = `${paypal_endpoint_url}/v2/checkout/orders`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log('CREATE PAYPAL ORDER : ', responseData);

    return responseData;
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export const captureOrder = async (orderID: string) => {
    const accessToken = await generateAccessToken();
    const url = `${paypal_endpoint_url}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    const responseData = await response.json();

    return responseData;
};
