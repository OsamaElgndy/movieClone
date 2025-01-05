import { createAsyncThunk } from "@reduxjs/toolkit";


export const searchMovies = createAsyncThunk(
 'movies/searchMovies',
 async (searchTerm: string, thunkAPI) => {
   const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=6f19371e`)
   
   const data = await response.json()
   console.log(data , "data I MA HERE IN FILE FEATCH DATA");

   // If the request fails (e.g., no results found)
   if (data.Response === 'False') {
     return thunkAPI.rejectWithValue(data.Error)
   }

   // Return the list of movies
   return data.Search
 }
)