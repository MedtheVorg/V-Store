import { createApi } from '@reduxjs/toolkit/query/react';
import { Order } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllOrdersInput = {
  storeId: string;
};
type GetOrderInput = {
  orderId: string;
  storeId: string;
};
type CreateOrderInput = {
  orderItems: string[];
  phone?: string;
  address?: string;
  isPaid?: boolean;
  storeId: string;
};

type DeleteOrderInput = {
  storeId: string;
  orderId: string;
};

export const orderApi = createApi({
  reducerPath: 'order-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Orders', 'Order'],
  endpoints: (build) => ({
    getOrders: build.query<Order[], GetAllOrdersInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/orders`,
      }),
      providesTags: ['Orders'],
    }),

    getOrder: build.query<Order, GetOrderInput>({
      query: ({ orderId, storeId }) => ({
        url: `/${storeId}/orders/${orderId}`,
      }),
      providesTags: ['Order'],
    }),

    createOrder: build.mutation<Order, CreateOrderInput>({
      query: ({ storeId, ...rest }) => ({
        url: `/${storeId}/orders`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Orders'],
    }),

    deleteOrder: build.mutation<
      { message: 'Order deleted.' },
      DeleteOrderInput
    >({
      query: ({ orderId, storeId }) => ({
        url: `/${storeId}/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

// export Billboard hooks
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useDeleteOrderMutation,
} = orderApi;
