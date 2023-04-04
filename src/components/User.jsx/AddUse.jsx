import axios from 'axios';
import React, { useState } from 'react';

const AddUse = ({users,setUsers}) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [debt, setDebt] = useState('');
  const [comments, setComments] = useState('');

  const [position, setPosition] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:4040/api/users  ', ({
      name, 
      budget,
      debt,
      comments,
      position,

    }))


      .then((response) => {
        console.log(response);
        setUsers([...users, response.data])

        alert("successfulyy added")
        console.log(`Name: ${name}, budget: ${budget}, debt: ${debt}, comments: ${comments},  position: ${position}`);

      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`Name: ${name}, budget: ${budget}, debt: ${debt}, comments: ${comments},  position: ${position}`);
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-gray-700 flex-[1] h-100% px-5 py-10   ">
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-white font-bold mb-2  ">client Name</label>
        <input type="text" id="name" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
         focus:shadow-outline
         \" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="budget" className="block text-white font-bold mb-2">budget</label>
        <input type="text" id="budget" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
        focus:shadow-outline" value={budget} onChange={(event) => setBudget(event.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="debt" className="block text-white font-bold mb-2">debt</label>
        <input type="text" id="debt" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
        focus:shadow-outline" value={debt} onChange={(event) => setDebt(event.target.value)} />
      </div>
      <div>
        <label htmlFor="comments" className="block text-white font-bold mb-2">comments</label>
        <input type="text" id="comments" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
      focus:shadow-outline" value={comments} onChange={(event) => setComments(event.target.value)} />


      </div>
      <div>
        <label htmlFor="position" className="block text-white font-bold mb-2 my-2 ">position</label>
        <input type="text" id="position" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
      focus:shadow-outline" value={position} onChange={(event) => setPosition(event.target.value)} />

      </div>
      <div className="flex items-center justify-center my-4">
        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
        focus:shadow-outline">Add Client</button>
      </div>
    </form>
  );
};

export default AddUse;
