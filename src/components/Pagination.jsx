import React from 'react';
import { GoArrowSmallLeft, GoArrowSmallRight } from 'react-icons/go';

const Paginate = ({ postsPerPage, totalPosts, currentPage, paginate, previousPage, nextPage }) => {
  const pageNumbers = [];
  
  const lastPage = totalPosts / postsPerPage;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center max-w-[600px] mx-auto my-2">
      <button
        onClick={currentPage === 1 ? null : previousPage}
        className={`inline-flex select-none items-center justify-center px-4 py-2 text-sm font-medium rounded-l shadow-sm hover:bg-primary duration-200 focus:ring-2 ${currentPage === 1 ? 'bg-gray-800 text-gray-600 pointer-events-none' : 'text-white bg-gray-800 hover:bg-gray-900 border-transparent focus:ring-blue-600'}`}
        disabled={currentPage === 1}
      >
        <GoArrowSmallLeft size={20} />
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`inline-flex select-none items-center cursor-pointer justify-center text-sm font-medium shadow-sm py-2 px-4 duration-200 text-white focus:ring-2 ${currentPage === number ? 'bg-blue-800 hover:bg-blue-900' : 'bg-gray-800 hover:bg-gray-900'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={nextPage === lastPage ? null : nextPage}
        className={`inline-flex select-none items-center justify-center px-4 py-2 text-sm font-medium rounded-r shadow-sm hover:bg-primary duration-200 text-white focus:ring-2 ${currentPage === lastPage ? 'bg-gray-800 text-gray-600 pointer-events-none' : 'bg-gray-800 hover:bg-gray-900 border-transparent focus:ring-blue-600'}`}
        disabled={nextPage === lastPage}
      >
        Next
        <GoArrowSmallRight size={20} />
      </button>
    </div>
  );
};

export default Paginate;
