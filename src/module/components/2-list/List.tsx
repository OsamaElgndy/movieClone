// import { useState } from "react";
import { useDispatch } from 'react-redux';
import { sortData } from '../../../app/moviesSlice';

export default function List() {
// const [sortBy, setSortBy] = useState<number>(0);
const dispatch = useDispatch();

const handleSort = () => {
  dispatch(sortData("years"));
};

 return (
    <div className="ml-7 mt-12 flex  gap-2">
  
  <h1 className="text-2xl text-white capitalize">sort by:</h1>
  <div className="flex gap-2">
  <button onClick={handleSort} className=" capitalize p-[5px] bg-[#FAEFD9]  font-medium text-black rounded-md hover:bg-[#f7dcbf]">
  years
</button>
    <button className=" capitalize p-[5px] bg-[#FAEFD9]  font-medium text-black rounded-md hover:bg-[#f7dcbf]">rating</button>
    <button  className=" capitalize  p-[5px] bg-[#FAEFD9]  font-medium text-black rounded-md hover:bg-[#f7dcbf]">length</button>
  </div>

    </div>
  )
}
