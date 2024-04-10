import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '@/types';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

type SignUpData = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UpdateUserData = {
  userId: string;
  username?: string;
  oldPassword?: string;
  newPassword?: string;
  avatar?: string;
};

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (signUpData: SignUpData) => ({
        url: '/users',
        method: 'POST',
        body: signUpData,
      }),
    }),
    loginUser: build.mutation({
      query: (loginData: LoginData) => ({
        url: '/auth',
        method: 'POST',
        body: loginData,
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getUser: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: build.mutation<User, UpdateUserData>({
      query: ({ userId, ...rest }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// export auth hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
