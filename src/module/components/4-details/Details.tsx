import { useEffect, useState } from "react";
import netflix from "../../../assets/netflix.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchMovieDetails } from "../../../api/api";
import { MovieDetails } from "../../../interface/interface";
export default function MovieSearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [singleMovie, setSingleMovie] = useState<MovieDetails>({} as MovieDetails);

  const [moviesCards, setMoviesCards] = useState<MovieDetails[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { movieDetails } = useSelector(
    (state: RootState) => state.listMoviesSlice
  );

  const isFavorite = (imdbID: string) => {
    return favorites.includes(imdbID);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const imdbID = JSON.parse(localStorage.getItem("favorites") || "[]");
      console.log(imdbID, "imdbID");

      const promises = imdbID.map((id: string) =>
        dispatch(fetchMovieDetails(id))
      );

      const responses = await Promise.all(promises);
      setMoviesCards(responses.map((response) => response.payload));
      console.log(
        responses.map((response) => response.payload),
        "response.payload ---------------"
      );
    };

    fetchFavorites();
    const cardDetails = localStorage.getItem("imdbID");
     dispatch(fetchMovieDetails( cardDetails || "")) .then((response) =>{
     setSingleMovie(response.payload)}
  )}, [])


  const handleFavorite = (imdbID: string) => {
    if (isFavorite(imdbID)) {
      const newFavorites = favorites.filter((id) => id !== imdbID);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, imdbID];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };
  const handleRemoveFromFavorites = (imdbID: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = favorites.filter((id: string) => id !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setMoviesCards(moviesCards.filter((movie) => movie.imdbID !== imdbID));
  };
  console.log(singleMovie, "singleMovie");
  

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
        <div className="container mx-auto p-6">
          {/* Hero Section with smaller title and poster */}
          <div className="flex flex-col sm:flex-row justify-center lg:gap-28 items-center bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <img
              src={singleMovie.Poster}
              alt={singleMovie.Title}
              className="w-32 sm:w-48 h-auto rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 truncate">
                {singleMovie.Title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400">{singleMovie.Year}</p>
              <div className="mt-2 text-md sm:text-lg">
                <span className="font-semibold">Rated: </span>
                {singleMovie.Rated}
                <br />
                <span className="font-semibold">Released: </span>
                {singleMovie.Released}
              </div>
              <div className="mt-2 text-md sm:text-lg">
                <span className="font-semibold">Runtime: </span>
                {singleMovie.Runtime}
              </div>
            </div>
          </div>

          {/* singleMovie Information */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="sm:w-1/2">
                <p className="font-semibold text-lg">Genre:</p>
                <p>{singleMovie.Genre}</p>
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <p className="font-semibold text-lg">Language:</p>
                <p>{singleMovie.Language}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
              <div className="sm:w-1/2">
                <p className="font-semibold text-lg">Country:</p>
                <p>{singleMovie.Country}</p>
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <p className="font-semibold text-lg">Director:</p>
                <p>{singleMovie.Director}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
              <div className="sm:w-1/2">
                <p className="font-semibold text-lg">Writer(s):</p>
                <p>{singleMovie.Writer}</p>
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <p className="font-semibold text-lg">Actors:</p>
                <p>{singleMovie.Actors}</p>
              </div>
            </div>
          </div>

          {/* Plot */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <p className="font-semibold text-lg">Plot:</p>
            <p className="text-lg">{singleMovie.Plot}</p>
          </div>

          {/* Ratings */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <p className="font-semibold text-lg">Ratings:</p>
            <ul className="space-y-2">
              {singleMovie?.Ratings?.map((rating, index) => (
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
                <p>{singleMovie.BoxOffice}</p>
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <p className="font-semibold text-lg">Awards:</p>
                <p>{singleMovie.Awards}</p>
              </div>
            </div>
          </div>

          {/* Metascore and IMDB */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="sm:w-1/2">
                <p className="font-semibold text-lg">Metascore:</p>
                <p>{singleMovie.Metascore}</p>
              </div>
              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <p className="font-semibold text-lg">IMDB Rating:</p>
                <p>
                  {singleMovie?.imdbRating} ({singleMovie.imdbVotes} votes)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center md:gap-0 gap-20 bg-gray-900">
      {moviesCards?.map((movie, index) => (
  <div
    key={index}
    className="max-w-md mx-auto bg-transparent group border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-[#FAEFD9]"
  >
    {/* Image Container */}
    <div className="w-full h-[300px] flex justify-center items-center relative overflow-hidden">
  <img
    src={movie.Poster === "N/A" ? netflix : movie.Poster}
    alt={movie.Title}
    style={{ maxWidth: "50%", maxHeight: "100%" }}
    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
  />
</div>

    {/* Movie Info */}
    <div className="flex flex-col p-4">
      {/* Movie Title */}
      <h2
        className="text-2xl font-semibold text-white group-hover:text-black truncate"
        style={{ maxWidth: "200px" }}
      >
        {movie.Title}
      </h2>

      <div className="mt-2 text-white group-hover:text-black">
        <p className="text-sm font-medium">Year: {movie.Year}</p>
        <p className="text-sm font-medium">Rated: {movie.Rated}</p>
        <p className="text-sm font-medium">Runtime: {movie.Runtime}</p>
        <p className="text-sm font-medium">Director: {movie.Director}</p>
        <p className="text-sm font-medium">Actors: {movie.Actors}</p>

        <div className="mt-2">
          <p className="text-sm font-medium">Plot:</p>
          <p className="text-sm">{movie.Plot}</p>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="mt-4 space-y-1 group-hover:text-black">
        <h3 className="text-lg font-medium">Ratings:</h3>
        {movie.Ratings?.map((rating, index) => (
          <div key={index} className="flex items-center text-sm text-white group-hover:text-black">
            <span className="font-medium">{rating.Source}:</span>
            <span className="ml-2 text-white">{rating.Value}</span>
          </div>
        ))}
      </div>

      {/* Box Office Section */}
      {movie.BoxOffice && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Box Office:</h3>
          <p className="text-sm">{movie.BoxOffice}</p>
        </div>
      )}

      {/* Remove from Favorites Button */}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300"
        onClick={() => handleRemoveFromFavorites(movie.imdbID)}
      >
        Remove from Favorites
      </button>
    </div>
  </div>
))}

      </div>
    </>
  );
}
