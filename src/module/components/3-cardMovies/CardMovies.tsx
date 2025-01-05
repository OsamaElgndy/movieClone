import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export default function CardMovies() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { entities } = useSelector((state: RootState) => state.searchMoviesSlice)
  console.log(entities);
  

  const totalPages = 10; // replace with the actual total number of pages
 
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
              className="w-[390px] h-[166px] bg-transparent border  border-solid border-[#E0D9D9] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:bg-[#E0D9D9] hover:scale-105 hover:cursor-pointer"
            >
              <div className="flex  ">
                <div className="flex flex-col justify-center p-4 w-2/3">
                  <h2 className="text-xl font-semibold text-white">
                    {movie.Title}
                  </h2>
                  <p className="text-sm text-gray-300">{movie.Year}</p>
                  <p className="text-sm text-gray-300">{movie.imdbID}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-yellow-500">
                      ⭐ {movie.Type}
                    </span>
                  </div>
                </div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-1/3 h-full object-cover"
                />
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
