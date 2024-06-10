import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pollService from "./poll.service.js";
import { toast } from "react-toastify";

export const getPolls = createAsyncThunk("poll/getPolls", async (thunkAPI) => {
  try {
    return await pollService.getPolls();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createPoll = createAsyncThunk(
  "poll/createPoll",
  async (data, thunkAPI) => {
    try {
      return await pollService.createPoll(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatePoll = createAsyncThunk(
  "poll/updatePoll",
  async ({ id, data }, thunkAPI) => {
    try {
      return await pollService.updatePoll(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePoll = createAsyncThunk(
  "poll/deletePoll",
  async (id, thunkAPI) => {
    try {
      return await pollService.deletePoll(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const votePoll = createAsyncThunk(
  "poll/votePoll",
  async ({ id, data }, thunkAPI) => {
    try {
      return await pollService.votePoll(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  polls: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const pollSlice = createSlice({
  name: "poll",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPolls.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getPolls.fulfilled, (state, action) => {
        state.polls = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.statusCode < 400;
        state.message = action.payload.message;
      })
      .addCase(getPolls.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.response?.message || "An error occurred";
      });
    builder
      .addCase(createPoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.polls.unshift(action.payload.data);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.statusCode < 400;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Poll created successfully");
        }
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.response?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(updatePoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updatePoll.fulfilled, (state, action) => {
        const index = state.polls.findIndex(
          (poll) => poll._id === action.payload.data._id
        );
        state.polls[index] = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.statusCode < 400;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Poll updated successfully");
        }
      })
      .addCase(updatePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.response?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(deletePoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.polls = state.polls.filter(
          (poll) => poll._id !== action.payload.data._id
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.statusCode < 400;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Poll deleted successfully");
        }
      })
      .addCase(deletePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.response?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(votePoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        const index = state.polls.findIndex(
          (poll) => poll._id === action.payload.data._id
        );
        state.polls[index] = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.statusCode < 400;
        state.message = action.payload.message;
      })
      .addCase(votePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.response?.message || "An error occurred";
        toast.error(state.message);
      });
  },
});

export default pollSlice.reducer;
