import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async action to fetch movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=6f19371e`
    );
    // If the API responds with success, return the movie data
    return response.data.Response === "True" ? response.data.Search : [];
  }
);

// Define the Movie interface
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Initial state for the movies
const initialStateMovies: Movie[] = [
  {
    Title: "The Batman",
    Year: "2022",
    imdbID: "tt1877830",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg",
  }
];

// Create the slice
export const listMovies = createSlice({
  name: "movies",
  initialState: {
    movies: initialStateMovies,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // Add a new movie to the state
    addMovie: (state) => {
        state.movies = [...state.movies];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for loading
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset errors when starting a new fetch
      })
      // Handle fulfilled state after successful fetch
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Append the new movies to the state
        state.movies.push(...action.payload);
      })
      // Handle rejected state if there's an error in fetching
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { addMovie } = listMovies.actions;
// Default export the reducer
export default listMovies.reducer;