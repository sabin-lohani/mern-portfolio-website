import { configureStore } from "@reduxjs/toolkit";

// import reducers
import postReducer from "./slices/postSlice.js";

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
