import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Post, InsertPost } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  filterText: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  filterText: '',
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await apiRequest('GET', '/api/posts');
  return (await response.json()) as Post[];
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: InsertPost) => {
    const response = await apiRequest('POST', '/api/posts', postData);
    return (await response.json()) as Post;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    const response = await apiRequest('DELETE', `/api/posts/${id}`);
    return (await response.json()) as Post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
      state.filteredPosts = state.posts.filter(post =>
        post.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilter: (state) => {
      state.filterText = '';
      state.filteredPosts = state.posts;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.filteredPosts = action.payload.filter(post =>
          post.name.toLowerCase().includes(state.filterText.toLowerCase())
        );
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
        state.filteredPosts = state.posts.filter(post =>
          post.name.toLowerCase().includes(state.filterText.toLowerCase())
        );
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create post';
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.filteredPosts = state.posts.filter(post =>
          post.name.toLowerCase().includes(state.filterText.toLowerCase())
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete post';
      });
  },
});

export const { setFilterText, clearFilter } = postsSlice.actions;
export default postsSlice.reducer;
