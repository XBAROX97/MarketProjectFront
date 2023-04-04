import axios from 'axios';
import React, { useState } from 'react';

const AddPro = ({ products, setProducts }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [quantityInPieces, setQuantityInPieces] = useState('');
  const [quantityInBoxes, setQuantityInBoxes] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:4040/api/products/  ', ({
      name,
      Image:mage,
      price,
      retailPrice,
      category,
      quantityInPieces,
      serialNumber,
    }))
      .then((response) => {
        console.log(response);
        setProducts([...products, response.data])
        alert("successfulyy added")

        console.log(`Name: ${name}, Image: ${image}, Price: ${price}, category: ${category}, : ${retailPrice}, Quantity in Pieces: ${quantityInPieces}, Serial Number: ${serialNumber}`);

      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`Name: ${name}, Image: ${image}, Price: ${price}, category: ${category}, : ${retailPrice}, Quantity in Pieces: ${quantityInPieces}, Serial Number: ${serialNumber}`);
  };
  function validateNumberInput(value) {
    const regex = /^\d*$/; // regular expression that matches only digits
    if (!regex.test(value)) {
      return false;
    }
    return true;
  }


  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 flex-1 h-full px-5 py-10">
    <div className="mb-4">
      <label htmlFor="name" className="block text-white font-bold mb-2 mt-2">Product Name</label>
      <input type="text" id="name" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(event) => setName(event.target.value)} />
    </div>
    <div className="mb-4">
      <label htmlFor="image" className="block text-white font-bold mb-2 mt-2">Picture address</label>
      <input type="text" id="image" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={image} onChange={(event) => setImage(event.target.value)} />
    </div>
    <div className="mb-4">
      <label htmlFor="price" className="block text-white font-bold mb-2 mt-2">Price</label>
      <input type="text" id="price" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} onChange={(event) => setPrice(event.target.value)} />
    </div>
    <div>
      <label htmlFor="retailPrice" className="block text-white font-bold mb-2 mt-2">RetailPrice</label>
      <input type="number" id="retailPrice" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={retailPrice} onChange={(event) => setRetailPrice(event.target.value)} />
    </div>
    <div>
      <label htmlFor="category" className="block text-white font-bold mb-2 mt-2">Category</label>
      <input type="text" id="category" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={category} onChange={(event) => setCategory(event.target.value)} />
    </div>
    <div className="mb-6">
      <label htmlFor="quantityInPieces" className="block text-white font-bold mb-2 mt-2">Quantity in Pieces</label>
      <input type="number" id="quantityInPieces" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={quantityInPieces} onChange={(event) => setQuantityInPieces(event.target.value)} />
    </div>
    <div className="mb-6">
      <label htmlFor="serialNumber" className="block text-white font-bold mb-2 mt-2">Serial Number</label>
      <input type="number" id="serialNumber" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} />
    </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
        focus:shadow-outline">Add Product</button>
      </div>
    </form>
  );
};

export default AddPro;
