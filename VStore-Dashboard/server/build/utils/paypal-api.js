"use strict";
// -------------------------------- STANDARD WAY BASED ON PAYPAL REST API DOCUMENTATION--------------------------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureOrder = exports.createPaypalOrder = void 0;
const customError_1 = require("./customError");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NODE_ENV } = process.env;
const paypal_endpoint_url = NODE_ENV === 'development' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            return (0, customError_1.throwError)(customError_1.HttpCode.INTERNAL_SERVER_ERROR, 'Payment failed');
        }
        const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
        const response = yield fetch(`${paypal_endpoint_url}/v1/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        const data = yield response.json();
        return data.access_token;
    }
    catch (error) {
        console.error('Failed to generate Access Token:', error);
        return (0, customError_1.throwError)(customError_1.HttpCode.INTERNAL_SERVER_ERROR, 'Payment failed');
    }
});
/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createPaypalOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // use the cart information passed from the front-end to calculate the purchase unit details
    const accessToken = yield generateAccessToken();
    const url = `${paypal_endpoint_url}/v2/checkout/orders`;
    const response = yield fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const responseData = yield response.json();
    console.log('CREATE PAYPAL ORDER : ', responseData);
    return responseData;
});
exports.createPaypalOrder = createPaypalOrder;
/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = (orderID) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield generateAccessToken();
    const url = `${paypal_endpoint_url}/v2/checkout/orders/${orderID}/capture`;
    const response = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });
    const responseData = yield response.json();
    return responseData;
});
exports.captureOrder = captureOrder;
