import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchPost = createAsyncThunk('/posts/fetchPost', async (params) => {
  const { data } = await axios.post('/posts', params);
  return data;
});

export const fetchRemovePost = createAsyncThunk('/posts/remove', async (id) => {
   axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: [],
  status: 'loading',
  addPostStatus: '',
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

    [fetchPost.pending]: (state) => {
      state.addPostStatus = 'loading';
    },
    [fetchPost.fulfilled]: (state) => {
      state.addPostStatus = 'loaded';
    },
    [fetchPost.rejected]: (state) => {
      state.addPostStatus = 'error';
    },

    [fetchRemovePost.pending]: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const postsReducer = postSlice.reducer;
