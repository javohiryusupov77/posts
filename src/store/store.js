import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./PostsSlice";
export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});

