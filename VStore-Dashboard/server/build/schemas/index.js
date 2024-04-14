"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.Schemas = {
    user: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                username: (0, zod_1.string)({
                    required_error: 'Username is required'
                })
                    .min(4, 'username must be at least 4 characters long')
                    .max(30, 'username must not exceed 30 characters'),
                email: (0, zod_1.string)({
                    required_error: 'Email is required'
                }).email('Invalid email'),
                password: (0, zod_1.string)({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters'),
                avatar: (0, zod_1.string)({ required_error: 'avatar is required' })
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            }),
            body: (0, zod_1.object)({
                username: (0, zod_1.string)({
                    required_error: 'Username is required'
                })
                    .min(4, 'username must be at least 4 characters long')
                    .max(30, 'username must not exceed 30 characters')
                    .optional(),
                oldPassword: (0, zod_1.string)({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters')
                    .optional(),
                newPassword: (0, zod_1.string)({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters')
                    .optional(),
                avatar: (0, zod_1.string)({ required_error: 'avatar is required' }).optional(),
                refreshToken: (0, zod_1.string)({ required_error: 'refreshToken is required' }).optional()
            })
                .refine(({ newPassword, oldPassword }) => (newPassword && !oldPassword ? false : true), {
                message: 'old password is also required',
                path: ['oldPassword']
            })
                .refine(({ newPassword, oldPassword }) => (oldPassword && !newPassword ? false : true), {
                message: 'new password is also required',
                path: ['newPassword']
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            })
        }),
        signin: (0, zod_1.object)({
            body: (0, zod_1.object)({
                email: (0, zod_1.string)({
                    required_error: 'Email is required'
                }).email('Invalid email'),
                password: (0, zod_1.string)({
                    required_error: 'Password is required'
                }).min(1, 'password is required')
            })
        })
    },
    store: {
        storeId: (0, zod_1.object)({
            params: (0, zod_1.object)({
                storeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Store Id' })
                    .optional()
            })
        }),
        readAll: (0, zod_1.object)({
            query: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid userId Id' })
                    .optional()
            })
        }),
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'store name is required'),
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                storeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Store Id' })
            }),
            query: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid userId Id' })
                    .optional()
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                storeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Store Id' })
            }),
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'store name is required'),
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                storeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Store Id' })
            }),
            body: (0, zod_1.object)({
                userId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid User Id' })
            })
        })
    },
    billboard: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                label: (0, zod_1.string)().trim().min(1, 'billboard label is required'),
                imageUrl: (0, zod_1.string)().trim().min(1, 'billboard image url is required')
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                billboardId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Billboard Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                billboardId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Billboard Id' })
            }),
            body: (0, zod_1.object)({
                label: (0, zod_1.string)().trim().min(1, 'billboard label is required').optional(),
                imageUrl: (0, zod_1.string)().trim().min(1, 'billboard image url is required').optional()
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                billboardId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Billboard Id' })
            })
        })
    },
    category: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'category name is required'),
                billboardId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Billboard Id' })
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                categoryId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                categoryId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' })
            }),
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'category name is required').optional(),
                billboardId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Billboard Id' })
                    .optional()
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                categoryId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' })
            })
        })
    },
    size: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'size name is required'),
                value: (0, zod_1.string)().trim().min(1, 'size value is required')
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                sizeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                sizeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' })
            }),
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'size name is required').optional(),
                value: (0, zod_1.string)().trim().min(1, 'size name is required').optional()
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                sizeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' })
            })
        })
    },
    color: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'color name is required'),
                value: (0, zod_1.string)()
                    .trim()
                    .min(1, 'color value is required')
                    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex code Color.')
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                colorId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Color Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                colorId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Color Id' })
            }),
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'color name is required').optional(),
                value: (0, zod_1.string)()
                    .trim()
                    .min(1, 'color value is required')
                    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex code Color.')
                    .optional()
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                colorId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' })
            })
        })
    },
    product: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'color name is required'),
                price: (0, zod_1.number)({ required_error: 'price is required' }).finite('invalid number').safe('invalid number'),
                isFeatured: (0, zod_1.boolean)({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                isArchived: (0, zod_1.boolean)({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                images: (0, zod_1.array)((0, zod_1.object)({ url: (0, zod_1.string)().trim().min(1, 'image url is required') }), {
                    required_error: 'product images are required'
                }),
                category: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' }),
                size: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' }),
                color: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Color Id' })
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                productId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Product Id' })
            })
        }),
        update: (0, zod_1.object)({
            params: (0, zod_1.object)({
                productId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Product Id' })
            }),
            body: (0, zod_1.object)({
                name: (0, zod_1.string)().trim().min(1, 'color name is required').optional(),
                price: (0, zod_1.number)({ required_error: 'price is required' }).finite('invalid number').safe('invalid number').optional(),
                isFeatured: (0, zod_1.boolean)({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                isArchived: (0, zod_1.boolean)({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                images: (0, zod_1.array)((0, zod_1.object)({ url: (0, zod_1.string)().trim().min(1, 'image url is required') }), {
                    required_error: 'product images are required'
                }).optional(),
                category: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' })
                    .optional(),
                size: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' })
                    .optional(),
                color: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Color Id' })
                    .optional()
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                productId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Product Id' })
            })
        })
    },
    order: {
        create: (0, zod_1.object)({
            body: (0, zod_1.object)({
                phone: (0, zod_1.string)().trim().min(1, 'order phone number is required').optional(),
                address: (0, zod_1.string)().trim().min(1, 'order address is required').optional(),
                isPaid: (0, zod_1.boolean)({ invalid_type_error: 'isPaid must be a boolean' }).optional(),
                orderItems: (0, zod_1.array)((0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Product Item Id' })).nonempty('order Items array cannot be empty'),
                paypalOrderId: (0, zod_1.string)()
            })
        }),
        read: (0, zod_1.object)({
            params: (0, zod_1.object)({
                orderId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Order Id' })
            })
        }),
        delete: (0, zod_1.object)({
            params: (0, zod_1.object)({
                orderId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Order Id' })
            })
        }),
        checkout: (0, zod_1.object)({
            body: (0, zod_1.object)({
                cartDetails: (0, zod_1.object)({
                    _id: (0, zod_1.string)()
                        .trim()
                        .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Order Id' }),
                    name: (0, zod_1.string)().trim().min(1, 'color name is required'),
                    price: (0, zod_1.number)({ required_error: 'price is required' }).finite('invalid number').safe('invalid number'),
                    isFeatured: (0, zod_1.boolean)({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                    isArchived: (0, zod_1.boolean)({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                    images: (0, zod_1.array)((0, zod_1.object)({ url: (0, zod_1.string)().trim().min(1, 'image url is required') }), {
                        required_error: 'product images are required'
                    }),
                    category: (0, zod_1.string)()
                        .trim()
                        .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Category Id' }),
                    size: (0, zod_1.string)()
                        .trim()
                        .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Size Id' }),
                    color: (0, zod_1.string)()
                        .trim()
                        .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Color Id' })
                }).array(),
                storeId: (0, zod_1.string)()
                    .trim()
                    .refine((id) => (0, mongoose_1.isValidObjectId)(id), { message: 'Invalid Order Id' }),
                customerDetails: (0, zod_1.object)({
                    address: (0, zod_1.string)().trim().min(1, 'customer address is required'),
                    phone: (0, zod_1.string)().trim().min(1, 'customer phone number is required')
                })
            })
        }),
        capture: (0, zod_1.object)({
            body: (0, zod_1.object)({
                orderId: (0, zod_1.string)()
            })
        })
    }
};
