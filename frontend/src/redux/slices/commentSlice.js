import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import commentService from "@/services/commentService";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await commentService.createComment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await commentService.getComments(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await commentService.deleteComment(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await commentService.updateComment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  comments: [],
  isLoading: false,
  message: "",
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload.data);
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload?.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload?.response?.data?.message || "An error occurred";
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.data._id
        );
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload?.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments = state.comments.map((comment) =>
          comment._id === action.payload.data._id
            ? action.payload.data
            : comment
        );
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload?.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
  },
});

export default commentSlice.reducer;
