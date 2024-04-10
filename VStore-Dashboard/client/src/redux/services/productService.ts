import { createApi } from '@reduxjs/toolkit/query/react';
import { Image, Product } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllProductsInput = {
  storeId: string;
};
type GetProductInput = {
  productId: string;
  storeId: string;
};
type CreateProductInput = {
  name: string;
  price: number;
  images: Image[];
  category: string;
  size: string;
  color: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  storeId: string;
};

type UpdateProductInput = {
  name: string;
  price: number;
  images: Image[] | undefined;
  category: string;
  size: string;
  color: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  storeId: string;
  productId: string;
};
type DeleteProductInput = {
  storeId: string;
  productId: string;
};

export const productApi = createApi({
  reducerPath: 'product-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Products', 'Product'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], GetAllProductsInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/products`,
      }),
      providesTags: ['Products'],
    }),

    getProduct: build.query<Product, GetProductInput>({
      query: ({ productId, storeId }) => ({
        url: `/${storeId}/products/${productId}`,
      }),
      providesTags: ['Product'],
    }),

    createProduct: build.mutation<Product, CreateProductInput>({
      query: ({ storeId, ...rest }) => ({
        url: `/${storeId}/products`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: build.mutation<Product, UpdateProductInput>({
      query: ({ productId, storeId, ...rest }) => ({
        url: `/${storeId}/products/${productId}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    deleteProduct: build.mutation<Product, DeleteProductInput>({
      query: ({ productId, storeId }) => ({
        url: `/${storeId}/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

// export Product hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
