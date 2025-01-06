import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import netflix from "../../../assets/netflix.png";
import { useNavigate } from 'react-router-dom';
export default function CardMovies() {
  const [favorites, setFavorites] = useState<string[]>([]); 
  const navigate = useNavigate();
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites!));
    }
  }, []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isFavorite = (imdbID: string) => {
    return favorites.includes(imdbID);
  };
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
  const { entities } = useSelector(
    (state: RootState) => state.searchMoviesSlice
  );
  console.log(entities.length, "length of movies");

  const totalPages = entities.length; // 10   replace with the actual total number of pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();
  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Movie List
        </h1>
        <div className="flex flex-wrap justify-center items-cta gap-7 sm:flex-1 lg:flex-2 xl:flex-3">
          {entities?.map((movie, index) => (
            <div
              key={index}
              className="max-w-md mx-auto bg-tranitions group border text-white border-gray-300 rounded-lg shadow-md overflow-hidden transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#FAEFD9]"
            >
              <div className="flex flex-wrap justify-center p-4">
                <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                  <img
                    src={movie.Poster == "N/A" ? netflix : movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover rounded-lg transition duration-300 hover:scale-110 hover:border-2 hover:border-black"
                  />
                </div>
                <div className="w-full md:w-1/2 xl:w-2/3 p-4">
                  <h2
                    className="text-2xl font-bold group-hover:text-black transition duration-300 truncate"
                    style={{ maxWidth: "200px" }}
                  >
                    {movie.Title}
                  </h2>
                  <p className="text-lg group-hover:text-black">{movie.Year}</p>
                  <p className="text-lg group-hover:text-black">
                    {movie.imdbID}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold group-hover:text-black">
                      ⭐ {movie.Type}
                    </span>
                  </div>
                </div >
                <div className="w-full flex sm:gap-5 md:gap-10 justify-center  items-center  ">

                <button
  className={`bg-transparent border-2 ${
    isFavorite(movie.imdbID) ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'
  } font-semibold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white hover:shadow-lg`}
  onClick={() => handleFavorite(movie.imdbID)}
>
  {isFavorite(movie.imdbID) ? (
    <svg
      className="w-6 h-6 inline-block"
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
      className="w-6 h-6 inline-block"
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

{/* View Details Button */}
<button
  className="mt-0 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 px-8 rounded-full  transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l"
  onClick={() => {
    localStorage.setItem("imdbID", movie.imdbID);
    navigate(`/details`)
  }
  }
>
  View Details
</button>
  </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <ul className="flex justify-center mb-4">
          <li className="mr-2">
            <button
              className="page-number py-2 px-4 rounded-md transition duration-300 text-[#BBFFFF]  hover:bg-#BBFFFF hover:text-gray-800"
              onClick={() => handlePageChange(currentPage - 1)}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="mr-2">
              <button
                className={`page-number py-2 px-4 rounded-md transition duration-300 ${
                  currentPage === pageNumber
                    ? " text-[#BBFFFF]"
                    : " text-white hover:bg-#BBFFFF hover:text-gray-800"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
                <span
                  className={`underline transition duration-300 ${
                    currentPage === pageNumber ? "underline-offset-4" : ""
                  }`}
                />
              </button>
            </li>
          ))}
          <li className="mr-2">
            <button
              className="page-number py-2 px-4 rounded-md transition duration-300 text-[#BBFFFF]  hover:bg-#BBFFFF hover:text-gray-800"
              onClick={() => handlePageChange(currentPage + 1)}
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
