import { configureStore } from "@reduxjs/toolkit";

// import reducers
import postReducer from "./slices/postSlice.js";
import pollReducer from "./slices/pollSlice.js";
import commentReducer from "./slices/commentSlice.js";

const store = configureStore({
  reducer: {
    post: postReducer,
    poll: pollReducer,
    comment: commentReducer,
  },
});

export default store;
