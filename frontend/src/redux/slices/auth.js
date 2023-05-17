import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/login', params);
  return data;
});

const initialState = {
  data: null,
  status: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
