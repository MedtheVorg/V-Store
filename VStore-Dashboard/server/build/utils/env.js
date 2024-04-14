"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// define validation schema
const environmentSchema = zod_1.z.object({
    SERVER_PORT: zod_1.z.string().min(1),
    SERVER_HOSTNAME: zod_1.z.string().min(1),
    PUBLIC_KEY: zod_1.z.string().min(1),
    PRIVATE_KEY: zod_1.z.string().min(1),
    ISSUER: zod_1.z.string().min(1),
    AUDIENCE: zod_1.z.string().min(1),
    NODE_ENV: zod_1.z.string().min(1),
    PAYPAL_CLIENT_ID: zod_1.z.string().min(1),
    PAYPAL_CLIENT_SECRET: zod_1.z.string().min(1)
});
// grab  env variables to be parsed,
const { SERVER_PORT, SERVER_HOSTNAME, PUBLIC_KEY, PRIVATE_KEY, ISSUER, AUDIENCE, NODE_ENV, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
// parse
const parsedResults = environmentSchema.safeParse({
    SERVER_PORT,
    SERVER_HOSTNAME,
    PUBLIC_KEY,
    PRIVATE_KEY,
    ISSUER,
    AUDIENCE,
    NODE_ENV,
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET
});
// throw an error if  an env var is missing
if (!parsedResults.success) {
    console.log(parsedResults.error.errors);
    throw new Error('Expected environment variables are missing, please check your env file.');
}
