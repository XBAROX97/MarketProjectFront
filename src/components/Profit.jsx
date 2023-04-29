import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profit = () => {
  const [year, setYear] = useState('2023');
  const [data, setData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/api/profits?year=${year}`);
        setData(response.data);
        setTotalProfit(response.data.reduce((total, item) => total + item.totalProfit, 0));
      } catch (error) {
        console.error(error);
        toast.error('Error loading data!');
      }
    };
    fetchData();
  }, [year]);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    if (selectedYear > 2023) {
      setYear('2023');
    } else {
      setYear(selectedYear);
    }
  };

  return (
    <div className="container my-10 mx-auto bg-gray-900 text-white p-4 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Profits for {year}</h1>
      <div className="flex mb-4">
        <label htmlFor="year" className="mr-2">
          Select year:
        </label>
        <select
          id="year"
          value={year}
          onChange={handleYearChange}
          className="border border-gray-400 rounded px-2 py-1 bg-gray-800"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={Number(year) + index}>{Number(year) + index}</option>
          ))}
        </select>
      </div>
      <p className="font-bold mb-4">Total profit: ${totalProfit.toFixed(2)}</p>
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Profit</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-800">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.month}</td>
              <td className="px-6 py-4 whitespace-nowrap">${item.totalProfit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Profit;
