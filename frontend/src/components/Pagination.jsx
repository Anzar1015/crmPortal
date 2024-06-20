import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className=" bottom-0  right-0  flex justify-center items-center">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="px-4 p-1 mr-2 m-2 bg-gray-200 border border-black text-black dark:text-gray-700  rounded hover:bg-gray-300"
      >
        Previous
      </button>
      <span className="text-gray mr-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-4 p-1 m-2 bg-gray-200 border border-black text-black dark:text-gray-700  rounded hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
