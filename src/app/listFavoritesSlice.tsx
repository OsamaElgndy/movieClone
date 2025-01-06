import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetails } from '../api/api';
import { MovieDetailsState } from '../interface/interface';

const initialState: MovieDetailsState = {
 movieDetails: [],
 isLoading: false, 
 error: null,
};



const moviesListSlice = createSlice({
 name: 'moviesListFavorites',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
   builder
     .addCase(fetchMovieDetails.pending, (state) => {
       state.isLoading = true;
     })
     .addCase(fetchMovieDetails.fulfilled, (state, action) => {
       state.movieDetails = action.payload;
       state.isLoading = false;
     })
     .addCase(fetchMovieDetails.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message || 'Something went wrong';
     });
 },
});

export const { reducer } = moviesListSlice;
export const moviesListActions = moviesListSlice.actions;
export default moviesListSlice.reducer;