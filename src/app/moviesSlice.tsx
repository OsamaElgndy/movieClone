import {  createSlice } from '@reduxjs/toolkit'
import { searchMovies } from '../api/api';
import { MoviesState } from '../interface/interface';
// Define the type for the movie search result

// Create the async thunk to fetch movie data based on the search term



// Initial state for the slice
const initialState: MoviesState = {
  entities: [],   // Empty array to hold the list of movies
}


// Create the slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Use the builder to define additional reducers
    builder.addCase(searchMovies.pending, (state , action) => {
      // Handle pending state
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
     console.log('searchMovies.fulfilled' , action);
      state.entities = action.payload
     
      // Handle fulfilled state
    });
    builder.addCase(searchMovies.rejected, (state, action) => {
      // Handle rejected state
    });
    


  },
})
export const { reducer: moviesReducer } = moviesSlice
export default moviesReducer
