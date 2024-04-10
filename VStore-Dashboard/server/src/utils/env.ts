import { z } from 'zod';

// define validation schema
const environmentSchema = z.object({
    SERVER_PORT: z.string().min(1),
    SERVER_HOSTNAME: z.string().min(1),
    PUBLIC_KEY: z.string().min(1),
    PRIVATE_KEY: z.string().min(1),
    ISSUER: z.string().min(1),
    AUDIENCE: z.string().min(1),
    NODE_ENV: z.string().min(1),
    PAYPAL_CLIENT_ID: z.string().min(1),
    PAYPAL_CLIENT_SECRET: z.string().min(1)
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

// add the env variables types to the global typescript definition
type EnvVarSchemaType = z.infer<typeof environmentSchema>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVarSchemaType {}
    }
}
