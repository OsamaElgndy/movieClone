import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { searchMovies } from "../../../api/api";
import netflix from "../../../assets/netflix.png";
import { sortData } from "../../../app/moviesSlice";

export default function MovieSearchPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
    const movie =
    {
     "Title": "Batman Begins",
     "Year": "2005",
     "Rated": "PG-13",
     "Released": "15 Jun 2005",
     "Runtime": "140 min",
     "Genre": "Action, Drama",
     "Director": "Christopher Nolan",
     "Writer": "Bob Kane, David S. Goyer, Christopher Nolan",
     "Actors": "Christian Bale, Michael Caine, Ken Watanabe",
     "Plot": "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
     "Language": "English, Mandarin",
     "Country": "United States, United Kingdom",
     "Awards": "Nominated for 1 Oscar. 15 wins & 79 nominations total",
     "Poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
     "Ratings": [
       {
         "Source": "Internet Movie Database",
         "Value": "8.2/10"
       },
       {
         "Source": "Rotten Tomatoes",
         "Value": "85%"
       },
       {
         "Source": "Metacritic",
         "Value": "70/100"
       }
     ],
     "Metascore": "70",
     "imdbRating": "8.2",
     "imdbVotes": "1,619,232",
     "imdbID": "tt0372784",
     "Type": "movie",
     "DVD": "N/A",
     "BoxOffice": "$206,863,479",
     "Production": "N/A",
     "Website": "N/A",
     "Response": "True"
   }




  const handleFavoriteToggle = (imdbID: string) => {
    const newFavorites = favorites.includes(imdbID)
      ? favorites.filter((id) => id !== imdbID)
      : [...favorites, imdbID];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };



  return (
   <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto p-6">
        {/* Hero Section with smaller title and poster */}
        <div className="flex flex-col sm:flex-row justify-center lg:gap-28 items-center bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-32 sm:w-48 h-auto rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 truncate">{movie.Title}</h1>
            <p className="text-lg sm:text-xl text-gray-400">{movie.Year}</p>
            <div className="mt-2 text-md sm:text-lg">
              <span className="font-semibold">Rated: </span>{movie.Rated}
              <br />
              <span className="font-semibold">Released: </span>{movie.Released}
            </div>
            <div className="mt-2 text-md sm:text-lg">
              <span className="font-semibold">Runtime: </span>{movie.Runtime}
            </div>
          </div>
        </div>

        {/* Movie Information */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="sm:w-1/2">
              <p className="font-semibold text-lg">Genre:</p>
              <p>{movie.Genre}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <p className="font-semibold text-lg">Language:</p>
              <p>{movie.Language}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <div className="sm:w-1/2">
              <p className="font-semibold text-lg">Country:</p>
              <p>{movie.Country}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <p className="font-semibold text-lg">Director:</p>
              <p>{movie.Director}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <div className="sm:w-1/2">
              <p className="font-semibold text-lg">Writer(s):</p>
              <p>{movie.Writer}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <p className="font-semibold text-lg">Actors:</p>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>

        {/* Plot */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <p className="font-semibold text-lg">Plot:</p>
          <p className="text-lg">{movie.Plot}</p>
        </div>

        {/* Ratings */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <p className="font-semibold text-lg">Ratings:</p>
          <ul className="space-y-2">
            {movie.Ratings.map((rating, index) => (
              <li key={index} className="text-lg">
                <strong>{rating.Source}:</strong> {rating.Value}
              </li>
            ))}
          </ul>
        </div>

        {/* Box Office and Awards */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="sm:w-1/2">
              <p className="font-semibold text-lg">Box Office:</p>
              <p>{movie.BoxOffice}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <p className="font-semibold text-lg">Awards:</p>
              <p>{movie.Awards}</p>
            </div>
          </div>
        </div>

        {/* Metascore and IMDB */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="sm:w-1/2">
              <p className="font-semibold text-lg">Metascore:</p>
              <p>{movie.Metascore}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <p className="font-semibold text-lg">IMDB Rating:</p>
              <p>{movie.imdbRating} ({movie.imdbVotes} votes)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
