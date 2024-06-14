import { configureStore } from "@reduxjs/toolkit";

// import reducers
import postReducer from "./slices/postSlice.js";
import pollReducer from "./slices/pollSlice.js";

const store = configureStore({
  reducer: {
    post: postReducer,
    poll: pollReducer,
  },
});

export default store;
