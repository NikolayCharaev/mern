import { combineReducers } from 'redux';
import { postsReducer } from './slices/posts';

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
