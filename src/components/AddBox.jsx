import React, { useState, useEffect } from 'react';
import Addbo from './Box/Addbo';
import Boxlist from './Box/Boxlist';
import axios from 'axios';

const AddBox = () => {
  const [boxs, setBoxs] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadBox();
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
  
  const loadBox = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/boxes');
      setBoxs(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <div className='w-screen h-screen flex'>
      <Addbo boxs={boxs} setBoxs={setBoxs} products={products} setProducts={setProducts} />
      <Boxlist boxs={boxs} setBoxs={setBoxs} products={products} setProducts={setProducts} />
    </div>
  );
};

export default AddBox;