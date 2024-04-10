import { createApi } from '@reduxjs/toolkit/query/react';
import { Category } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type GetAllCategoriesInput = {
  storeId: string;
};
type GetCategoryInput = {
  categoryId: string;
  storeId: string;
};
type CreateCategoryInput = {
  billboardId: string;
  storeId: string;
  name: string;
};

type UpdateCategoryInput = {
  billboardId?: string;
  storeId: string;
  name?: string;
  categoryId: string;
};
type DeleteCategoryInput = {
  storeId: string;
  categoryId: string;
};

export const categoryApi = createApi({
  reducerPath: 'category-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Categories', 'Category'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], GetAllCategoriesInput>({
      query: ({ storeId }) => ({
        url: `/${storeId}/categories`,
      }),
      providesTags: ['Categories'],
    }),

    getCategory: build.query<Category, GetCategoryInput>({
      query: ({ categoryId, storeId }) => ({
        url: `/${storeId}/categories/${categoryId}`,
      }),
      providesTags: ['Category'],
    }),

    createCategory: build.mutation<Category, CreateCategoryInput>({
      query: ({ billboardId, name, storeId }) => ({
        url: `/${storeId}/categories`,
        method: 'POST',
        body: { name, billboardId },
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: build.mutation<Category, UpdateCategoryInput>({
      query: ({ storeId, billboardId, name, categoryId }) => ({
        url: `/${storeId}/categories/${categoryId}`,
        method: 'PATCH',
        body: { name, billboardId },
      }),
      invalidatesTags: ['Categories', 'Category'],
    }),

    deleteCategory: build.mutation<
      { message: 'Category deleted.' },
      DeleteCategoryInput
    >({
      query: ({ categoryId, storeId }) => ({
        url: `/${storeId}/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

// export Billboard hooks
export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
