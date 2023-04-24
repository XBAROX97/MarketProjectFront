import React, { useState, useEffect } from 'react'
import ProductList from './Product/ProductList'
import axios from 'axios'

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    axios.get('http://localhost:4040/api/products').
      then(function (response) {
        setProducts(response.data);
      }).catch(function (error) {
        console.error(error);
      })
  }

  return (
    <div>
      <ProductList products={products} setProducts={setProducts} />
    </div>
  )
}

export default AddProduct