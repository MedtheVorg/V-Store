import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { RootState } from '../store';
import { User } from '@/types';
import {
  removeAccessToken,
  removeUser,
  setAccessToken,
} from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// setup an interceptor to refetch the accessToken
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const userId = (
      JSON.parse(localStorage.getItem('userInfo') as string) as User
    )?._id;

    if (!userId) {
      // logout user
      api.dispatch(removeUser());
      api.dispatch(removeAccessToken());
    }

    // try refreshing the  access token
    const refreshResult = await baseQuery(
      `/auth/refreshToken?userId=${userId}`,
      api,
      extraOptions
    );

    if (refreshResult.meta?.response?.status === 403) {
      // refetching failed
      // logout user
      api.dispatch(removeUser());
      api.dispatch(removeAccessToken());
    } else {
      // store the new token
      api.dispatch(
        setAccessToken(
          (refreshResult.data as { accessToken: string }).accessToken
        )
      );

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
