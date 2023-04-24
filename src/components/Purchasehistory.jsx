import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPurchase = async () => {
    await axios.get('http://localhost:4040/api/purchase')
      .then(response => {
        setPurchaseHistory(response.data[1]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadPurchase();
  }, []);

  // Filter the purchase history based on the search query
  const filteredPurchaseHistory = purchaseHistory.filter(purchase => {
    const clientName = purchase.user.name.toLowerCase();
    const search = searchQuery.toLowerCase();
    return clientName.includes(search);
  });

  return (<>
    <div className='container mx-auto py-4'>
      <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">History</h1>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by client name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 transition duration-500 ease-in-out border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <span className="absolute right-3">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
      </div>

      <div className="relative rounded-lg overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              >Client Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              > Product Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              >Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              >Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {filteredPurchaseHistory.map((purchase, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {purchase.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {purchase.product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {purchase.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                  ${purchase.totalCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  </>
  );


};

export default PurchaseHistory;