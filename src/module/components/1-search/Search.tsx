import { useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  return (
    <div className="flex justify-center items-center mt-7  flex-col gap-3">
      <h1 className="text-3xl text-[#FAEFD9]"> Search movies</h1>

      <div className=" w-[300px]  sm:w-[360px] overflow-hidden rounded-md  bg-[#E4FFFF]">
        <div className="relative">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Movie Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute top-1 right-1 flex items-center   py-1 px-2.5  text-center text-sm pointer-events-none "
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2 text-[#1D1D1D]"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          
          </button>
        </div>
      </div>
    </div>
  );
}
