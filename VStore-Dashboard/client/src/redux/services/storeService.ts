import { createApi } from '@reduxjs/toolkit/query/react';
import { Store } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type CreateStoreInput = {
  name: string;
  userId: string;
};

type GetStoreInput = {
  storeId: string;
  userId: string;
};

type UpdateStoreInput = {
  name: string;
  userId: string;
  storeId: string;
};
type DeleteStoreInput = {
  userId: string;
  storeId: string;
};

export const storeApi = createApi({
  reducerPath: 'store-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Stores', 'Store'],
  endpoints: (build) => ({
    getStores: build.query<Store[], string>({
      query: (userId) => ({
        url: '/stores',
        params: {
          userId,
        },
      }),
      providesTags: ['Stores'],
    }),

    getStore: build.query<Store, GetStoreInput>({
      query: ({ storeId, userId }) => ({
        url: `/stores/${storeId}`,
        params: {
          userId,
        },
      }),
      providesTags: ['Store'],
    }),

    createStore: build.mutation<Store, CreateStoreInput>({
      query: (input) => ({
        url: '/stores',
        method: 'POST',
        body: input,
      }),
      invalidatesTags: ['Stores'],
    }),

    updateStore: build.mutation<Store, UpdateStoreInput>({
      query: ({ name, userId, storeId }) => ({
        url: `/stores/${storeId}`,
        method: 'PATCH',
        body: { name, userId },
      }),
      invalidatesTags: ['Stores', 'Store'],
    }),

    deleteStore: build.mutation<Store, DeleteStoreInput>({
      query: ({ userId, storeId }) => ({
        url: `/stores/${storeId}`,
        method: 'DELETE',
        body: { userId },
      }),
      invalidatesTags: ['Stores'],
    }),
  }),
});

// export auth hooks
export const {
  useGetStoresQuery,
  useCreateStoreMutation,
  useGetStoreQuery,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
