import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductList = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selectedProduct, setSelectedProduct] = useState({});

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantityInPieces, setQuantityInPieces] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:4040/api/products/${id}`)
      .then(response => {
        console.log(response)
        setProducts(products.filter(product => product._id !== id));
        alert("data deleted")

      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }


  const loadProduct = async () => {
    axios.get('http://localhost:4040/api/products').
      then(function (response) {
        console.log(response)
        setProducts(response.data);
      }).catch(function (error) {
        console.error(error);
      })
  }

  const handleClose = () => {
    setModal(false);
  };
  const handleUpdate = (product) => {
    setName(product.name)
    setPrice(product.price)
    setRetailPrice(product.retailPrice)
    setCategory(product.category)
    setQuantityInPieces(product.quantityInPieces)
    setImage(product.image)
    setSerialNumber(product.serialNumber)


    setSelectedProduct(product);
    setModalData(product);
    setModal(true);
  };
  const handleSave = async () => {
    try {

      await axios.patch(`http://localhost:4040/api/products/${modalData._id}`,
        {
          name,
          Image: image,
          price,
          retailPrice,
          category,
          quantityInPieces,
          serialNumber,
        }
      ).then(
        (res) => console.log(res.data.message)
      );
      console.log(selectedProduct)
      loadProduct().then(() => alert('Data saved.'));
      setModal(false);
      setModalData({});
    } catch (error) {
      ``
      console.error('Error saving data:', error);


    }
  };
  return (
    <>
      <div className="flex-[2] h-screen bg-gray-500 overflow-y-scroll ">
        <h1 className="text-2xl font-bold mb-4 text-white">Product List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">

              <thead>
                <tr className='text-white text-lg'>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">retailPrice</th>
                  <th className="px-4 py-2">category</th>
                  <th className="px-4 py-2">quantityInPieces</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, i) => (

                  <tr className='text-white ' key={i}>
                    <td className="border text-lg px-4 py-2">{product.name}</td>
                    <td className="border text-lg px-4 py-2">{product.price}</td>
                    <td className="border text-lg px-4 py-2">{product.retailPrice}</td>
                    <td className="border text-lg px-4 py-2">{product.category}</td>
                    <td className="border text-lg px-4 py-2">{product.quantityInPieces}</td>
                    <td className=" flex  justify-between px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <button
                        onClick={() => handleUpdate(product)}
                        className="bg-yellow-400 text-black hover:text-white px-2 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-400 text-black hover:text-white px-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>

          </div>
        )}
      </div>
      {modal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-28 px-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h4 className='text-2xl capitalize font-extrabold tracking-tight text-gray-900 mb-4'><input type="text" className='border' defaultValue={modalData.name} onChange={(e) => setName(e.target.value)} /></h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-bold">Price:</p>
                    <input className='border ' type='text' defaultValue={modalData.price} onChange={(e) => setPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold">Retail Price:</p>
                    <input className='border' type='text' defaultValue={modalData.retailPrice} onChange={(e) => setRetailPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold">Category:</p>
                    <input className='border' type='text' defaultValue={modalData.category} onChange={(e) => setCategory(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold">Quantity in Pieces:</p>
                    <input className='border' type='text' defaultValue={modalData.quantityInPieces} onChange={(e) => setQuantityInPieces(e.target.value)}></input>
                  </div>
             
                  <div>
                    <p className="font-bold ">image:</p>
                    <input className='border' type='text' defaultValue={modalData.Image} onChange={(e) => setImage(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold ">serialNumber:</p>
                    <input className='border' type='text' defaultValue={modalData.serialNumber} onChange={(e) => setSerialNumber(e.target.value)}></input>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSave(selectedProduct._id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleClose(modalData)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default ProductList;
