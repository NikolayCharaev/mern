import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

const initialState = {
  posts: [],
  status: 'loading',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = 'error';
      state.posts = [];
    },
  },
});

export const postsReducer = postSlice.reducer;
