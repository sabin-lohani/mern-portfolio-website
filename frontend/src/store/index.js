import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import pollReducer from "@/features/poll/poll.slice.js";

const store = configureStore({
  reducer: {
    poll: pollReducer,
  },
});

export default store;
