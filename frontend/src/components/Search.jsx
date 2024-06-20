import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useSearchContext } from '../SearchContext';


const Search = () => {

    const { searchQuery, setSearch } = useSearchContext();
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
      };

  return (
    <div className="relative flex-1 m-4 pr-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className=" pl-10 pr-4 py-2 border border-black  rounded-md  bg-white dark:bg-gray-100 focus:outline-none "
            placeholder="Search..."
          />
        </div>
  )
}

export default Search