import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';

export function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsedData = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!parsedData.success) {
            return res.status(422).json({ message: 'expected data was invalid', errors: parsedData.error.errors });
        }

        // Check if additional fields were passed
        // const parsedKeys = new Set(Object.keys(parsedData.data));
        // const schemaKeys = new Set(Object.keys(schema.shape));
        // const additionalKeys = [...parsedKeys].filter(key => !schemaKeys.has(key));

        // if (additionalKeys.length > 0) {
        //     return res.status(422).json({ message: 'Additional fields were passed', additionalFields: additionalKeys });
        // }

        next();
    };
}
