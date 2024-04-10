import { createApi } from '@reduxjs/toolkit/query/react';
import { Billboard } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllBillboardsInput = {
  storeId: string;
};
type GetBillboardInput = {
  billboardId: string;
  storeId: string;
};
type CreateBillboardInput = {
  imageUrl: string;
  label: string;
  storeId: string;
};

type UpdateBillboardInput = {
  imageUrl?: string;
  label?: string;
  storeId: string;
  billboardId: string;
};
type DeleteBillboardInput = {
  storeId: string;
  billboardId: string;
};

export const billboardApi = createApi({
  reducerPath: 'billboard-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Billboards', 'Billboard'],
  endpoints: (build) => ({
    getBillboards: build.query<Billboard[], GetAllBillboardsInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/billboards`,
      }),
      providesTags: ['Billboards'],
    }),

    getBillboard: build.query<Billboard, GetBillboardInput>({
      query: ({ billboardId, storeId }) => ({
        url: `/${storeId}/billboards/${billboardId}`,
      }),
      providesTags: ['Billboard'],
    }),

    createBillboard: build.mutation<Billboard, CreateBillboardInput>({
      query: ({ imageUrl, label, storeId }) => ({
        url: `/${storeId}/billboards`,
        method: 'POST',
        body: { label, imageUrl },
      }),
      invalidatesTags: ['Billboards'],
    }),

    updateBillboard: build.mutation<Billboard, UpdateBillboardInput>({
      query: ({ label, imageUrl, billboardId, storeId }) => ({
        url: `/${storeId}/billboards/${billboardId}`,
        method: 'PATCH',
        body: { label, imageUrl },
      }),
      invalidatesTags: ['Billboards', 'Billboard'],
    }),

    deleteBillboard: build.mutation<Billboard, DeleteBillboardInput>({
      query: ({ billboardId, storeId }) => ({
        url: `/${storeId}/billboards/${billboardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Billboards'],
    }),
  }),
});

// export Billboard hooks
export const {
  useGetBillboardsQuery,
  useGetBillboardQuery,
  useCreateBillboardMutation,
  useUpdateBillboardMutation,
  useDeleteBillboardMutation,
} = billboardApi;
