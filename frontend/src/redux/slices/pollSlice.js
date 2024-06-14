import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pollService from "@/services/pollService";
import { toast } from "react-toastify";

export const createPoll = createAsyncThunk(
  "poll/createPoll",
  async (formData, thunkAPI) => {
    try {
      const { data } = await pollService.createPoll(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPolls = createAsyncThunk(
  "poll/getPolls",
  async (params, thunkAPI) => {
    try {
      const { data } = await pollService.getPolls(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSinglePoll = createAsyncThunk(
  "poll/getSinglePoll",
  async (id, thunkAPI) => {
    try {
      const { data } = await pollService.getSinglePoll(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatePoll = createAsyncThunk(
  "poll/updatePoll",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await pollService.updatePoll(id, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePoll = createAsyncThunk(
  "poll/deletePoll",
  async (id, thunkAPI) => {
    try {
      const { data } = await pollService.deletePoll(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const votePoll = createAsyncThunk(
  "poll/votePoll",
  async ({ id, data }, thunkAPI) => {
    try {
      const { data: pollData } = await pollService.votePoll(id, data);
      return pollData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  polls: [],
  singlePoll: null,
  paginationData: {},
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
      .addCase(createPoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.polls.unshift(action.payload.data);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post created successfully");
        }
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(getPolls.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getPolls.fulfilled, (state, action) => {
        const { docs, paginationData } = action.payload.data;
        state.polls = docs;
        state.paginationData = paginationData;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getPolls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(getSinglePoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSinglePoll.fulfilled, (state, action) => {
        state.singlePoll = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getSinglePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
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
        state.singlePoll = action.payload.data;
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload.data._id ? action.payload.data : poll
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post updated successfully");
        }
      })
      .addCase(updatePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
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
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post deleted successfully");
        }
      })
      .addCase(deletePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
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
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload.data._id
            ? { ...poll, options: action.payload.data.options }
            : poll
        );
        if (state.singlePoll) {
          state.singlePoll.options = action.payload.data.options;
        }
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Voted successfully");
        }
      })
      .addCase(votePoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
  },
});

export default pollSlice.reducer;
