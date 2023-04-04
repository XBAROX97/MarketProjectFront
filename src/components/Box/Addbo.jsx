import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addbo = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityBox, setQuantityBox] = useState(0);
  const [quantityPiece, setQuantityPiece] = useState(0);

  const [boxprice, setBoxprice] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/products');
      const productData = response.data;
      console.log(response.data);
      setProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDecreasePiece = () => {
    if (quantityPiece > 0) {
      setQuantityPiece(quantityPiece - 1);
    }
  };
  const handleIncreasePiece = () => {
    setQuantityPiece(quantityPiece + 1);
  };
  const handleDecreaseBox = () => {
    if (quantityBox > 0) {
      setQuantityBox(quantityBox - 1);
    }
  };
  const handleIncreaseBox = () => {
    setQuantityBox(quantityBox + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productId = selectedProduct._id;

    const data = {
      name: selectedProduct.name,
      productId,
      quantity: quantityBox,
      productQuantity: quantityPiece,
      price: parseInt(boxprice)
    }

    console.log(data);

    axios.post('http://localhost:4040/api/boxes', data)
      .then((response) => {
        alert("successfully sold")
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 flex-[1] h-100% px-5 py-10">
      <div className='flex flex-col gap-2'>
        <label className='text-lg text-white font-bold'>Select a product</label>
        <select
          className="text-black bg-green-300 py-2 rounded-full"
          value={selectedProduct ? selectedProduct.name : ""}
          onChange={(e) => {
            const selectedProduct = products.find((product) => product.name === e.target.value);
            setSelectedProduct(selectedProduct);
          }}
        >
          <option disabled value="">
            Choose a product
          </option>
          {products.map((product, index) => (
            <option key={index} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProduct ?
        <div>
          <div className=" flex justify-between py-4">
            <div>
              <label className="block text-green-300">Piece Quantity:</label>
              <div className=' flex flex-row items-center'>
                <button type="button" className='border h-10 w-10 bg-green-500 rounded-lg font-bold text-2xl hover:text-green-200 mx-2 py-1 item-center text-center container' onClick={handleDecreasePiece}>-</button>
                <input className='border items-center align-middle text-center w-30 h-8' name='quantityPiece' type='number' onChange={Number} value={quantityPiece} />
                <button type="button" className='border w-10 h-10 bg-green-500 rounded-lg font-bold text-2xl hover:text-green-200 mx-2 py-1 item-center text-center container' onClick={handleIncreasePiece}>+</button>
              </div>
            </div>

            <div >
              <label className="block text-yellow-300">Box Quantity:</label>
              <div className=' flex flex-row items-center'>
                <button type="button" className='border w-10 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mx-2 py-1 item-center text-center container ' onClick={handleDecreaseBox}>-</button>
                <input className='border items-center align-middle text-center w-30 h-8   ' name='quantityBox' type='number' onChange={Number} value={quantityBox} />
                <button type="button" className='border w-10 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mx-2 py-1 item-center text-center container ' onClick={handleIncreaseBox}>+</button>
              </div>

            </div>

          </div>
          <div className="mb-6">
            <label htmlFor="boxprice" className="block text-white font-bold mb-2">boxprice</label>
            <input type="number" id="boxprice" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
        focus:shadow-outline" value={boxprice} onChange={(event) => setBoxprice(event.target.value)} />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
        focus:shadow-outline">Add Product</button>
          </div>
        </div>
        : ""}
    </form>
  );
}

export default Addbo