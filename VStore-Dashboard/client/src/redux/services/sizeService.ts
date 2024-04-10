import { createApi } from '@reduxjs/toolkit/query/react';
import { Size } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllSizesInput = {
  storeId: string;
};
type GetSizeInput = {
  sizeId: string;
  storeId: string;
};
type CreateSizeInput = {
  name: string;
  value: string;
  storeId: string;
};

type UpdateSizeInput = {
  storeId: string;
  name?: string;
  value?: string;
  sizeId: string;
};
type DeleteSizeInput = {
  storeId: string;
  sizeId: string;
};

export const sizeApi = createApi({
  reducerPath: 'size-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Sizes', 'Size'],
  endpoints: (build) => ({
    getSizes: build.query<Size[], GetAllSizesInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/sizes`,
      }),
      providesTags: ['Sizes'],
    }),

    getSize: build.query<Size, GetSizeInput>({
      query: ({ sizeId, storeId }) => ({
        url: `/${storeId}/sizes/${sizeId}`,
      }),
      providesTags: ['Size'],
    }),

    createSize: build.mutation<Size, CreateSizeInput>({
      query: ({ value, name, storeId }) => ({
        url: `/${storeId}/sizes`,
        method: 'POST',
        body: { name, value },
      }),
      invalidatesTags: ['Sizes'],
    }),

    updateSize: build.mutation<Size, UpdateSizeInput>({
      query: ({ storeId, value, name, sizeId }) => ({
        url: `/${storeId}/sizes/${sizeId}`,
        method: 'PATCH',
        body: { name, value },
      }),
      invalidatesTags: ['Sizes', 'Size'],
    }),

    deleteSize: build.mutation<{ message: 'Size deleted.' }, DeleteSizeInput>({
      query: ({ sizeId, storeId }) => ({
        url: `/${storeId}/sizes/${sizeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sizes'],
    }),
  }),
});

// export Billboard hooks
export const {
  useCreateSizeMutation,
  useGetSizesQuery,
  useGetSizeQuery,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApi;
