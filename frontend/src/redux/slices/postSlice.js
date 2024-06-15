import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "@/services/postService";
import { toast } from "react-toastify";
import likeService from "@/services/likeService";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, thunkAPI) => {
    try {
      const { data } = await postService.createPost(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (params, thunkAPI) => {
    try {
      const { data } = await postService.getPosts(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      const { data } = await postService.deletePost(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImage = createAsyncThunk(
  "post/deleteImage",
  async ({ postId, imageId }, thunkAPI) => {
    try {
      const { data } = await postService.deleteImage(postId, imageId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, thunkAPI) => {
    try {
      const { data } = await postService.getPost(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await postService.updatePost(id, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const toggleLikePost = createAsyncThunk(
  "post/toggleLikePost",
  async (formData, thunkAPI) => {
    try {
      const { data } = await likeService.toggleLike({
        ...formData,
        item_type: "post",
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  singlePost: null,
  paginationData: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.data);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post created successfully");
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { docs, ...paginationData } = action.payload.data;
        state.posts = docs;
        state.paginationData = paginationData;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
      });
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.data._id
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post deleted successfully");
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.singlePost.images = state.singlePost.images.filter(
          (img) => img._id !== action.payload.data._id
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Image deleted successfully");
        }
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.singlePost = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
      });
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload.data._id ? action.payload.data : post
        );
        state.singlePost = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        if (state.isSuccess) {
          toast.success("Post updated successfully");
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
        toast.error(state.message);
      });
    builder
      .addCase(toggleLikePost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        if (state.singlePost) {
          state.singlePost.likeCount = action.payload.data.likeCount;
          state.singlePost.hasLiked = action.payload.data.hasLiked;
        }
        state.posts = state.posts.map((post) =>
          post._id === action.payload.data.item_id
            ? {
                ...post,
                likeCount: action.payload.data.likeCount,
                hasLiked: action.payload.data.hasLiked,
              }
            : post
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.response?.data?.message || "An error occurred";
      });
  },
});

export default postSlice.reducer;
