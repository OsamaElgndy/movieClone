import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  searchMovies } from '../api/api';
import { Movie, MoviesState } from '../interface/interface';

const initialState: MoviesState = {
  entities: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    sortData: (state) => {
      state.entities = [...state.entities].sort((a, b) => {
        const yearA = parseInt(a.Year.split('–')[0], 10);
        const yearB = parseInt(b.Year.split('–')[0], 10);
        return yearA - yearB;
      });
    },
  
    filterFavorites: (state) => {
      const favoriteIds = localStorage.getItem('favorites');
      
      if (favoriteIds) {
        const favoriteIdsArray: string[] = JSON.parse(favoriteIds);
        state.entities = state.entities.filter((movie: Movie) => 
          favoriteIdsArray.includes(movie.imdbID)
        );
      }
    },

    setEntities: (state, action: PayloadAction<Movie[]>) => {
      state.entities = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { sortData, filterFavorites, setEntities } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
export default moviesReducer;
