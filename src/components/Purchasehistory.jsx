import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import Pagination from './Pagination';
const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [totalCost, setTotalCost] = useState(0);

  const loadPurchase = async () => {
    await axios.get('http://localhost:4040/api/purchase')
      .then(response => {
        setPurchaseHistory(response.data[1]);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const filteredPurchaseHistory = purchaseHistory.filter(purchase => {
    const clientName = purchase.user.name.toLowerCase();
    const search = searchTerm.toLowerCase();
    return clientName.includes(search);
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPurchaseHistory.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredPurchaseHistory.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    loadPurchase();
    let cost = 0;
    filteredPurchaseHistory.forEach(purchase => {
      cost += purchase.totalCost;
    });
    setTotalCost(cost);
  }, [filteredPurchaseHistory]);
  return (<>
    <div className='container mx-auto py-4'>
      <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">History</h1>
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
              <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-100" />
            </span>
          </div>
        </div>
      </div>
      <div className="relative rounded-lg overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg flex justify-center ">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
  <thead className="bg-gray-100 dark:bg-gray-800">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
      > Client Name
      </th>
      <th scope="col"
        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
      >
        Product Name </th>
      <th
        scope="col"
        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
      >  Quantity </th>
      <th
        scope="col"
        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
      >Cost </th>
      <th
        scope="col"
        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
      >Date </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y text-center divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
    {currentPosts.reverse().map((purchase, i) => (
      <tr key={i} className='hover:bg-gray-800'>
        <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-900 dark:text-white">
          {purchase.user.name} </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
          {purchase.product.name} </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
          {purchase.quantity} </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
          ${purchase.totalCost.toFixed(2)} </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(purchase.purchaseDate).getDate() + " " +
              new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(purchase.purchaseDate)) + " " +
              new Date(purchase.purchaseDate).getFullYear() + " " +
              new Date(purchase.purchaseDate).toLocaleTimeString('en-US', { hour12: true })

            }
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <div>
  <p className="text-xl  font-medium rounded-lg bg-gray-800 text-white px-2 py-1 flex justify-center">
    Total cost: 
    <span className='text-green-500 ml-1'>$ {totalCost.toFixed(2)}</span>
  </p>
</div>

    </div>

    <div className=' flex justify-center items-center'>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPurchaseHistory.length}
        currentPage={currentPage}
        paginate={handlePageChange}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>


  </>
  );
};
export default PurchaseHistory;