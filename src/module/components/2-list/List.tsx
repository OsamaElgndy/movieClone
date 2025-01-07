import { useDispatch } from 'react-redux';
import { sortData } from '../../../app/moviesSlice';

export default function List() {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(sortData()); // Dispatch sort action
  };

  return (
    <div className="ml-7 mt-12 flex gap-2">
      <h1 className="text-2xl text-white capitalize">Sort by:</h1>
      <div className="flex gap-2">
        <button 
          onClick={handleSort} 
          className="capitalize p-[5px] bg-[#FAEFD9] font-medium text-black rounded-md hover:bg-[#f7dcbf]"
        >
          Years
        </button>
        <button className="capitalize p-[5px] bg-[#FAEFD9] font-medium text-black rounded-md hover:bg-[#f7dcbf]">
          Rating
        </button>
        <button className="capitalize p-[5px] bg-[#FAEFD9] font-medium text-black rounded-md hover:bg-[#f7dcbf]">
          Length
        </button>
      </div>
    </div>
  );
}
