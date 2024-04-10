import { createApi } from '@reduxjs/toolkit/query/react';
import { Color } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllColorsInput = {
  storeId: string;
};
type GetColorInput = {
  colorId: string;
  storeId: string;
};
type CreateColorInput = {
  name: string;
  value: string;
  storeId: string;
};

type UpdateColorInput = {
  storeId: string;
  name?: string;
  value?: string;
  colorId: string;
};
type DeleteColorInput = {
  storeId: string;
  colorId: string;
};

export const ColorApi = createApi({
  reducerPath: 'Color-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Colors', 'Color'],
  endpoints: (build) => ({
    getColors: build.query<Color[], GetAllColorsInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/Colors`,
      }),
      providesTags: ['Colors'],
    }),

    getColor: build.query<Color, GetColorInput>({
      query: ({ colorId, storeId }) => ({
        url: `/${storeId}/Colors/${colorId}`,
      }),
      providesTags: ['Color'],
    }),

    createColor: build.mutation<Color, CreateColorInput>({
      query: ({ value, name, storeId }) => ({
        url: `/${storeId}/Colors`,
        method: 'POST',
        body: { name, value },
      }),
      invalidatesTags: ['Colors'],
    }),

    updateColor: build.mutation<Color, UpdateColorInput>({
      query: ({ storeId, value, name, colorId }) => ({
        url: `/${storeId}/Colors/${colorId}`,
        method: 'PATCH',
        body: { name, value },
      }),
      invalidatesTags: ['Colors', 'Color'],
    }),

    deleteColor: build.mutation<
      { message: 'Color deleted.' },
      DeleteColorInput
    >({
      query: ({ colorId, storeId }) => ({
        url: `/${storeId}/Colors/${colorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Colors'],
    }),
  }),
});

// export Colors hooks
export const {
  useCreateColorMutation,
  useGetColorsQuery,
  useGetColorQuery,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = ColorApi;
