import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetails, searchMovies } from '../api/api';
import { Movie, MovieDetailsState, MoviesState } from '../interface/interface';

// Initial state for the slice
const initialState: MoviesState = {
  entities: [], // Empty array to hold the list of movies
  isLoading: false, // Flag to indicate if data is being loaded
  error: null, // Error message or null if no error
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    sortData: (state, action) => {
      state.entities = state.entities.sort((a, b) => {
        // Handle cases where Year might not be a simple number (e.g. ranges or "N/A")
        const yearA = parseInt(a.Year.split('–')[0], 10);
        const yearB = parseInt(b.Year.split('–')[0], 10);
        return yearA - yearB;
      });
    },
  
  filterFavorites: (state, action) => {
    console.log(state.entities, "state" , state.entities.length);
    
    const favoriteIds = localStorage.getItem('favorites');
    if (favoriteIds !== null && favoriteIds.length > 0) {
      const favoriteIdsArray = JSON.parse(favoriteIds);
      state.entities = state.entities.filter((movie: Movie) => {
        return favoriteIdsArray.includes(movie.imdbID);
      });
      console.log(state.entities, "state.entities");
    } else {
      // Handle the case where favoriteIds is null or empty
      state.entities = state.entities; // or some other default behavior
    }
  }
  ,
    entitiesStart: (state, action) => {
      state.entities = action.payload;
    }
  },
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


export const { sortData  , filterFavorites } = moviesSlice.actions;
export const { reducer: moviesReducer  } = moviesSlice;
export default moviesReducer;