import { createSlice } from '@reduxjs/toolkit';
import { searchMovies } from '../api/api';
import { MoviesState } from '../interface/interface';

// Initial state for the slice
const initialState: MoviesState = {
  entities: [], // Empty array to hold the list of movies
  isLoading: false, // Flag to indicate if data is being loaded
  error: null, // Error message or null if no error
};

// Create the slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Use the builder to define additional reducers
    builder.addCase(searchMovies.pending, (state, action) => {
      // Handle pending state
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      console.log('searchMovies.fulfilled', action);
      state.entities = action.payload;
      state.isLoading = false;
      // Handle fulfilled state
    });
    builder.addCase(searchMovies.rejected, (state, action) => {
      // Handle rejected state
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const { reducer: moviesReducer } = moviesSlice;
export default moviesReducer;