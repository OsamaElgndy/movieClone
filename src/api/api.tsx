import { createAsyncThunk } from "@reduxjs/toolkit";
import { urlApi } from "../interface/interface";
export const searchMovies = createAsyncThunk(
 'movies/searchMovies',
 async (searchTerm: string, thunkAPI) => {
   const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${urlApi}`)
   const data = await response.json()
   if (data.Response === 'False') {
     return thunkAPI.rejectWithValue(data.Error)
   }
   return data.Search
 }
)

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string, thunkAPI) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${urlApi}`)
    const data = await response.json()
    if (data.Response === 'False') {
      return thunkAPI.rejectWithValue(data.Error)
    }
    return data
  }
)