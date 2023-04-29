import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import Pagination from './Pagination';

const LeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const loadLeaderBoardData = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/leaderBoard');
      const sortedData = response.data.sort((a, b) => b.points - a.points);
      setLeaderBoardData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadLeaderBoardData();
  }, []);
  const filteredLeaderBoardData = leaderBoardData.filter((leader) =>
    leader.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredLeaderBoardData.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredLeaderBoardData.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className='container mx-auto'>
      <div className='my-4'>
        <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Leaderboard</h1>
        <div className="my-4 grid grid-cols-12 gap-4">
          <div className="col-span-6 lg:col-span-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-800 transition duration-200 ease-in-out rounded-lg focus:border-blue-500 focus:outline-none bg-gray-800 text-gray-100"
              />
              <span className="absolute right-3">
                <FaSearch className="h-5 w-5 text-gray-100" />
              </span>
            </div>
          </div>

        </div>
        <div className="relative rounded-lg overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg flex justify-center">
          <table className="w-full divide-y divide-gray-700 overflow-y-hidden mx-auto">
            <caption className="sr-only">Leaderboard</caption>
            <thead className="bg-gray-800">
              <tr className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
                  Client Name
                </th>
                <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-center bg-gray-900 divide-gray-700">
              {currentPosts.map((leader, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center"> {/* Added text-center class */}
                    <div className="flex items-center">
                      <div className="ml-4 ">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {leader.gender === 'male' ? ( // Check if leader is male
                            <span className="text-center">{leader.userName}</span> // Center male username
                          ) : (
                            <span>{leader.userName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${leader.points > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {leader.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(leader.date).getDate() + " " +
                        new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(leader.date)) + " " +
                        new Date(leader.date).getFullYear() + " " +
                        new Date(leader.date).toLocaleTimeString('en-US', { hour12: false })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=' flex justify-center items-center'>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredLeaderBoardData.length}
          currentPage={currentPage}
          paginate={handlePageChange}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>

  );
};

export default LeaderBoard;