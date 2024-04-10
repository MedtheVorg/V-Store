import { createSlice } from '@reduxjs/toolkit';

export type userInfo = {
  _id: string;
  username: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

type initialSliceState = {
  userInfo: userInfo | null;
  accessToken: string | null;
};
const initialState: initialSliceState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  accessToken: localStorage.getItem('accessToken')
    ? JSON.parse(localStorage.getItem('accessToken') as string)
    : null,
};

const authSlice = createSlice({
  name: 'auth-slice',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', JSON.stringify(action.payload));
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setUser, removeUser, setAccessToken, removeAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
