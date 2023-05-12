import { combineReducers } from 'redux';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

export default rootReducer;
