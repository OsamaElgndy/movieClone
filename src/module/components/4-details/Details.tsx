import { useEffect, useState } from "react";
import netflix from "../../../assets/netflix.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchMovieDetails } from "../../../api/api";
import { Movie, MovieDetails } from "../../../interface/interface";
export default function MovieSearchPage() {
  const dispatch = useDispatch<AppDispatch>();
const [moviesCards, setMoviesCards] = useState<MovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { movieDetails } = useSelector(
    (state: RootState) => state.listMoviesSlice
  ); 

  
  const isFavorite = (imdbID: string) => {
    return favorites.includes(imdbID);
  };
  useEffect(() => {
  const imdbID = JSON.parse(localStorage.getItem("favorites") || "[]");
 
  imdbID.forEach((id: string) => {
    console.log(id);
    
    
    dispatch(fetchMovieDetails(id)).then((response) => {
      console.log(response.payload , "dddddddddddddddddd");
      setMoviesCards([...moviesCards, response.payload]);
      setIsLoading(false);
    });
  })
  
}, [dispatch]);
console.log(moviesCards.length, "moviesCards");

  const movie = {
    Title: "Batman Begins",
    Year: "2005",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Drama",
    Director: "Christopher Nolan",
    Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
    Actors: "Christian Bale, Michael Caine, Ken Watanabe",
    Plot: "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
    Language: "English, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Nominated for 1 Oscar. 15 wins & 79 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.2/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "85%",
      },
      {
        Source: "Metacritic",
        Value: "70/100",
      },
    ],
    Metascore: "70",
    imdbRating: "8.2",
    imdbVotes: "1,619,232",
    imdbID: "tt0372784",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$206,863,479",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  };






   const handleFavorite = (imdbID: string) => {
    if (isFavorite(imdbID)) {
      const newFavorites = favorites.filter((id) => id !== imdbID);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, imdbID];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };


  return (
    <>
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
              <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 truncate">
                {movie.Title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400">{movie.Year}</p>
              <div className="mt-2 text-md sm:text-lg">
                <span className="font-semibold">Rated: </span>
                {movie.Rated}
                <br />
                <span className="font-semibold">Released: </span>
                {movie.Released}
              </div>
              <div className="mt-2 text-md sm:text-lg">
                <span className="font-semibold">Runtime: </span>
                {movie.Runtime}
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
                <p>
                  {movie.imdbRating} ({movie.imdbVotes} votes)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {moviesCards?.map((movie, index) => (
  <div
    key={index}
    className="max-w-md mx-auto bg-transparent group border text-white border-gray-300 rounded-lg shadow-md overflow-hidden transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#FAEFD9]"
  >
    <div className="flex flex-wrap justify-center p-4">
      {/* Movie Poster */}
      <div className="w-full md:w-1/2 xl:w-1/3 p-4">
        <img
          src={movie.Poster === "N/A" ? netflix : movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover rounded-lg transition duration-300 hover:scale-110 hover:border-2 hover:border-black"
        />
      </div>

      {/* Movie Info */}
      <div className="w-full md:w-1/2 xl:w-2/3 p-4">
        <h2
          className="text-2xl font-bold group-hover:text-black transition duration-300 truncate"
          style={{ maxWidth: "200px" }}
        >
          {movie.Title}
        </h2>
        <p className="text-lg group-hover:text-black">{`Year: ${movie.Year}`}</p>
        <p className="text-lg group-hover:text-black">{`Rated: ${movie.Rated}`}</p>
        <p className="text-lg group-hover:text-black">{`Runtime: ${movie.Runtime}`}</p>
        <p className="text-lg group-hover:text-black">{`Director: ${movie.Director}`}</p>
        <p className="text-lg group-hover:text-black">{`Actors: ${movie.Actors}`}</p>
        <p className="text-lg group-hover:text-black">{`Plot: ${movie.Plot}`}</p>
        
        {/* Ratings */}
        <div className="flex flex-col mt-4">
          {movie.Ratings?.map((rating, index) => (
            <div key={index} className="flex items-center">
              <span className="font-bold">{rating.Source}:</span>
              <span className="ml-2">{rating.Value}</span>
            </div>
          ))}
        </div>
        
        {/* Box Office */}
        {movie.BoxOffice && (
          <div className="mt-4">
            <span className="text-lg font-bold">Box Office:</span>
            <span className="ml-2">{movie.BoxOffice}</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          className="bg-transparent hover:bg-blue-500 group-hover:bg-black text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4"
          onClick={() => handleFavorite(movie.imdbID)}
        >
          {isFavorite(movie.imdbID) ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  </div>
))}

       

    </>
  );



}

