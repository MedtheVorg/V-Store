import { isValidObjectId } from 'mongoose';
import { array, boolean, number, object, string, z } from 'zod';

export const Schemas = {
    user: {
        create: object({
            body: object({
                username: string({
                    required_error: 'Username is required'
                })
                    .min(4, 'username must be at least 4 characters long')
                    .max(30, 'username must not exceed 30 characters'),

                email: string({
                    required_error: 'Email is required'
                }).email('Invalid email'),

                password: string({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters'),
                avatar: string({ required_error: 'avatar is required' })
            })
        }),
        read: object({
            params: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            })
        }),
        update: object({
            params: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            }),
            body: object({
                username: string({
                    required_error: 'Username is required'
                })
                    .min(4, 'username must be at least 4 characters long')
                    .max(30, 'username must not exceed 30 characters')
                    .optional(),

                oldPassword: string({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters')
                    .optional(),
                newPassword: string({
                    required_error: 'Password is required'
                })
                    .min(5, 'password must be at least 5 characters long')
                    .max(30, 'password must not exceed 30 characters')
                    .optional(),
                avatar: string({ required_error: 'avatar is required' }).optional(),
                refreshToken: string({ required_error: 'refreshToken is required' }).optional()
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
        delete: object({
            params: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            })
        }),
        signin: object({
            body: object({
                email: string({
                    required_error: 'Email is required'
                }).email('Invalid email'),
                password: string({
                    required_error: 'Password is required'
                }).min(1, 'password is required')
            })
        })
    },
    store: {
        storeId: object({
            params: object({
                storeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Store Id' })
                    .optional()
            })
        }),
        readAll: object({
            query: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid userId Id' })
                    .optional()
            })
        }),
        create: object({
            body: object({
                name: string().trim().min(1, 'store name is required'),
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            })
        }),
        read: object({
            params: object({
                storeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Store Id' })
            }),
            query: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid userId Id' })
                    .optional()
            })
        }),
        update: object({
            params: object({
                storeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Store Id' })
            }),
            body: object({
                name: string().trim().min(1, 'store name is required'),
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            })
        }),
        delete: object({
            params: object({
                storeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Store Id' })
            }),
            body: object({
                userId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid User Id' })
            })
        })
    },
    billboard: {
        create: object({
            body: object({
                label: string().trim().min(1, 'billboard label is required'),
                imageUrl: string().trim().min(1, 'billboard image url is required')
            })
        }),
        read: object({
            params: object({
                billboardId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Billboard Id' })
            })
        }),
        update: object({
            params: object({
                billboardId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Billboard Id' })
            }),
            body: object({
                label: string().trim().min(1, 'billboard label is required').optional(),
                imageUrl: string().trim().min(1, 'billboard image url is required').optional()
            })
        }),
        delete: object({
            params: object({
                billboardId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Billboard Id' })
            })
        })
    },
    category: {
        create: object({
            body: object({
                name: string().trim().min(1, 'category name is required'),
                billboardId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Billboard Id' })
            })
        }),
        read: object({
            params: object({
                categoryId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' })
            })
        }),
        update: object({
            params: object({
                categoryId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' })
            }),
            body: object({
                name: string().trim().min(1, 'category name is required').optional(),
                billboardId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Billboard Id' })
                    .optional()
            })
        }),
        delete: object({
            params: object({
                categoryId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' })
            })
        })
    },
    size: {
        create: object({
            body: object({
                name: string().trim().min(1, 'size name is required'),
                value: string().trim().min(1, 'size value is required')
            })
        }),
        read: object({
            params: object({
                sizeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' })
            })
        }),
        update: object({
            params: object({
                sizeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' })
            }),
            body: object({
                name: string().trim().min(1, 'size name is required').optional(),
                value: string().trim().min(1, 'size name is required').optional()
            })
        }),
        delete: object({
            params: object({
                sizeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' })
            })
        })
    },
    color: {
        create: object({
            body: object({
                name: string().trim().min(1, 'color name is required'),
                value: string()
                    .trim()
                    .min(1, 'color value is required')
                    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex code Color.')
            })
        }),
        read: object({
            params: object({
                colorId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Color Id' })
            })
        }),
        update: object({
            params: object({
                colorId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Color Id' })
            }),
            body: object({
                name: string().trim().min(1, 'color name is required').optional(),
                value: string()
                    .trim()
                    .min(1, 'color value is required')
                    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex code Color.')
                    .optional()
            })
        }),
        delete: object({
            params: object({
                colorId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' })
            })
        })
    },
    product: {
        create: object({
            body: object({
                name: string().trim().min(1, 'color name is required'),
                price: number({ required_error: 'price is required' }).finite('invalid number').safe('invalid number'),
                isFeatured: boolean({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                isArchived: boolean({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                images: array(object({ url: string().trim().min(1, 'image url is required') }), {
                    required_error: 'product images are required'
                }),
                category: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' }),
                size: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' }),
                color: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Color Id' })
            })
        }),
        read: object({
            params: object({
                productId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Product Id' })
            })
        }),
        update: object({
            params: object({
                productId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Product Id' })
            }),
            body: object({
                name: string().trim().min(1, 'color name is required').optional(),
                price: number({ required_error: 'price is required' }).finite('invalid number').safe('invalid number').optional(),
                isFeatured: boolean({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                isArchived: boolean({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                images: array(object({ url: string().trim().min(1, 'image url is required') }), {
                    required_error: 'product images are required'
                }).optional(),
                category: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' })
                    .optional(),
                size: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' })
                    .optional(),
                color: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Color Id' })
                    .optional()
            })
        }),
        delete: object({
            params: object({
                productId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Product Id' })
            })
        })
    },
    order: {
        create: object({
            body: object({
                phone: string().trim().min(1, 'order phone number is required').optional(),
                address: string().trim().min(1, 'order address is required').optional(),

                isPaid: boolean({ invalid_type_error: 'isPaid must be a boolean' }).optional(),
                orderItems: array(
                    string()
                        .trim()
                        .refine((id) => isValidObjectId(id), { message: 'Invalid Product Item Id' })
                ).nonempty('order Items array cannot be empty'),
                paypalOrderId: string()
            })
        }),
        read: object({
            params: object({
                orderId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Order Id' })
            })
        }),
        delete: object({
            params: object({
                orderId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Order Id' })
            })
        }),
        checkout: object({
            body: object({
                cartDetails: object({
                    _id: string()
                        .trim()
                        .refine((id) => isValidObjectId(id), { message: 'Invalid Order Id' }),
                    name: string().trim().min(1, 'color name is required'),
                    price: number({ required_error: 'price is required' }).finite('invalid number').safe('invalid number'),
                    isFeatured: boolean({ invalid_type_error: 'isFeatured must be a boolean' }).optional(),
                    isArchived: boolean({ invalid_type_error: 'isArchived must be a boolean' }).optional(),
                    images: array(object({ url: string().trim().min(1, 'image url is required') }), {
                        required_error: 'product images are required'
                    }),
                    category: string()
                        .trim()
                        .refine((id) => isValidObjectId(id), { message: 'Invalid Category Id' }),
                    size: string()
                        .trim()
                        .refine((id) => isValidObjectId(id), { message: 'Invalid Size Id' }),
                    color: string()
                        .trim()
                        .refine((id) => isValidObjectId(id), { message: 'Invalid Color Id' })
                }).array(),
                storeId: string()
                    .trim()
                    .refine((id) => isValidObjectId(id), { message: 'Invalid Order Id' }),
                customerDetails: object({
                    address: string().trim().min(1, 'customer address is required'),
                    phone: string().trim().min(1, 'customer phone number is required')
                })
            })
        }),
        capture: object({
            body: object({
                orderId: string()
            })
        })
    }
};

// --------------Types--------------------------------------------
// User
export type UserParams = z.infer<typeof Schemas.user.update>['params'];
export type CreateUserInput = z.infer<typeof Schemas.user.create>['body'];
export type UpdateUserInput = z.infer<typeof Schemas.user.update>['body'];

// Store²
export type StoreParams = z.infer<typeof Schemas.store.read>['params'];
export type ReadStoreInput = z.infer<typeof Schemas.store.read>['query'];
export type ReadAllStoresInput = z.infer<typeof Schemas.store.readAll>['query'];
export type CreateStoreInput = z.infer<typeof Schemas.store.create>['body'];
export type UpdateStoreInput = z.infer<typeof Schemas.store.update>['body'];
export type DeleteStoreInput = z.infer<typeof Schemas.store.delete>['body'];

// Billboard
export type BillboardParams = z.infer<typeof Schemas.billboard.read>['params'];
export type CreateBillboardInput = z.infer<typeof Schemas.billboard.create>['body'];
export type UpdateBillboardInput = z.infer<typeof Schemas.billboard.update>['body'];

// Category
export type CategoryParams = z.infer<typeof Schemas.category.read>['params'];
export type CreateCategoryInput = z.infer<typeof Schemas.category.create>['body'];
export type UpdateCategoryInput = z.infer<typeof Schemas.category.update>['body'];

// Size
export type SizeParams = z.infer<typeof Schemas.size.read>['params'];
export type CreateSizeInput = z.infer<typeof Schemas.size.create>['body'];
export type UpdateSizeInput = z.infer<typeof Schemas.size.update>['body'];

// Color
export type ColorParams = z.infer<typeof Schemas.color.read>['params'];
export type CreateColorInput = z.infer<typeof Schemas.color.create>['body'];
export type UpdateColorInput = z.infer<typeof Schemas.color.update>['body'];

// Product
export type ProductParams = z.infer<typeof Schemas.product.read>['params'];
export type CreateProductInput = z.infer<typeof Schemas.product.create>['body'];
export type UpdateProductInput = z.infer<typeof Schemas.product.update>['body'];

// Order
export type OrderParams = z.infer<typeof Schemas.order.read>['params'];
export type CreateOrderInput = z.infer<typeof Schemas.order.create>['body'];
export type UpdateOrderInput = z.infer<typeof Schemas.order.create>['body'];
export type CheckoutInput = z.infer<typeof Schemas.order.checkout>['body'];
export type CaptureInput = z.infer<typeof Schemas.order.capture>['body'];
