import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductList = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantityInPieces, setQuantityInPieces] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [nav, setNav] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState('');
  const [name2, setName2] = useState('');
  const [image2, setImage2] = useState('');
  const [category2, setCategory2] = useState('');
  const [price2, setPrice2] = useState('');
  const [retailPrice2, setRetailPrice2] = useState('');
  const [quantityInPieces2, setQuantityInPieces2] = useState('');
  const [serialNumber2, setSerialNumber2] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4040/api/products/  ', ({
      name: name2,
      Image: image2,
      price: price2,
      retailPrice: retailPrice2,
      category: category2,
      quantityInPieces: quantityInPieces2,
      serialNumber: serialNumber2,
    }))
      .then((response) => {
        console.log(response);
        setProducts([...products, response.data])
        toast.success('Product has been added successfully!');
        console.log(`Name: ${name2}, Image: ${image2}, Price: ${price2}, category: ${category2}, : ${retailPrice2}, Quantity in Pieces: ${quantityInPieces2}, Serial Number: ${serialNumber2}`);
        setName2('');
        setImage2('');
        setPrice2('');
        setRetailPrice2('');
        setCategory2('');
        setQuantityInPieces2('');
        setSerialNumber2('');
        setNav(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('error check image ');

      });
    console.log(`Name: ${name2}, Image: ${image2}, Price: ${price2}, category: ${category2}, : ${retailPrice2}, Quantity in Pieces: ${quantityInPieces2}, Serial Number: ${serialNumber2}`);
  };
  const handleClosemodalDelete = () => {
    setModalDelete(false)
  };
  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);
  };
  // ________________________________________________________________________________

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:4040/api/products/${id}`)
      .then((response) => {
        console.log(response);
        toast.success('Item deleted successfully!');
        setProducts(products.filter((product) => product._id !== id));
        loadProduct();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  const loadProduct = async () => {
    axios
      .get('http://localhost:4040/api/products')

      .then(function (response) {
        setProducts(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleCloseNav = () => {
    setNav(false);
    setName2('');
    setImage2('');
    setPrice2('');
    setRetailPrice2('');
    setCategory2('');
    setQuantityInPieces2('');
    setSerialNumber2('');
  };
  const handleUpdate = (product) => {
    setName(product.name);
    setPrice(product.price);
    setRetailPrice(product.retailPrice);
    setCategory(product.category);
    setQuantityInPieces(product.quantityInPieces);
    setImage(product.image);
    setSerialNumber(product.serialNumber);
    setSelectedProduct(product);
    setModalData(product);
    setModal(true);
  };
  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:4040/api/products/${modalData._id}`, {
        name,
        Image: image,
        price,
        retailPrice,
        category,
        quantityInPieces,
        serialNumber,
      }).then((res) => console.log(res.data.message));
      console.log(selectedProduct);
      loadProduct().then(() =>
        console.log()
      );
      toast.success('Product has been deleted successfully!');
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className="w-full my-4">
        <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Products</h1>
        <div className='flex justify-between my-5'>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by client name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }} className="w-full px-4 py-2 transition duration-500 ease-in-out border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <span className="absolute right-3">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </span>
          </div>

          <button onClick={() => setNav(!nav)} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">
            Add Product
          </button>

        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative flex justify-center overflow-x-auto shadow-md rounded">
            <table className="w-full divide-y overflow-hidden rounded divide-gray-200">
              <thead className="bg-gray-700 sticky top-0">
                <tr className="text-white">
                  <th className="px-4 py-2 text-left">logo</th>

                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Retail Price</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Quantity in Pieces</th>
                  <th className="text-center px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200" key="products">
                {products
                  .filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product, i) => (
                    <tr
                      className="hover:bg-gray-700 text-center focus-within:bg-gray-700 text-md"
                      key={i}
                    >
                      <td className="px-2 py-2 whitespace-nowrap item-center">
                        <img src={product.Image == undefined || product.Image === "" ? "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" : product.Image} alt="Logo" className="h-14 object-cover w-14 rounded" />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{product.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{product.price}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{product.retailPrice}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{product.category}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{product.quantityInPieces}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border- border-gray-200 text-sm leading-5 font-medium">
                        <div className="flex justify-center  gap-5">
                          <button
                            onClick={() => handleUpdate(product)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setModalDelete(true);
                              setDataDelete(product._id)
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            Delete
                          </button>
                        </div>
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
                <h4 className="text-2xl capitalize font-extrabold tracking-tight text-gray-900 mb-4">
                  <input
                    type="text"
                    className="border border-gray-400 p-2 rounded-md w-full"
                    defaultValue={modalData.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-bold">Price:</p>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold">Retail Price:</p>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold">Category:</p>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold">Image:</p>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.Image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold">Serial Number:</p>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm"
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


      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' /> : ''}

      <div className={"fixed bg-gray-100 z-10 h-screen py-5 w-[35rem] duration-300 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
        <div className={nav ? "block" : "hidden"}>
          <div className='flex justify-between px-4 py-2'>
            <h2 className='text-2xl text-center font-bold pb-12 container capitalize'>Add Product</h2>
            <AiOutlineClose onClick={handleCloseNav} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
          </div>
          <form onSubmit={handleSubmit} className="mx-5 grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">Product Name</label>
                <input type="text" placeholder='product Name' id="name" className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name2} onChange={(event) => setName2(event.target.value)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="image" className="text-lg font-medium mb-2">Image address</label>
                <input type="text" id="image" placeholder='Enter image address' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={image2} onChange={(event) => setImage2(event.target.value)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-lg font-medium mb-2">Price</label>
                <input type="number" id="price" placeholder='eneter price' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price2} onChange={(event) => setPrice2(event.target.value)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="retailPrice" className="text-lg font-medium mb-2">Retail Price</label>
                <input type="number" id="retailPrice " placeholder='Enter retail price' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={retailPrice2} onChange={(event) => setRetailPrice2(event.target.value)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="text-lg font-medium mb-2">Category</label>
                <input type="text" id="category " placeholder='Enter category' className=" border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={category2} onChange={(event) => setCategory2(event.target.value)} />
              </div>
              {/* <div className="flex flex-col">
              <label htmlFor="quantityInPieces" className="text-lg font-medium mb-2">Quantity in Pieces</label>
              <input type="number" id="quantityInPieces" className="border border-gray-400 rounded-full  py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={quantityInPieces2} onChange={(event) => setQuantityInPieces2(event.target.value)} />
            </div> */}

              <div className="flex flex-col">
                <label htmlFor="serialNumber" className="text-lg font-medium mb-2">Serial Number</label>
                <input type="number" id="serialNumber" placeholder='Enter serial nb' className=" border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={serialNumber2} onChange={(event) => setSerialNumber2(event.target.value)} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Add Product</button>
            </div>
          </form>
        </div>
      </div>

      {modalDelete && (
        <div class="fixed z-10 inset-0 overflow-y-auto ">
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center  sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-700 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-400 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-white">Delete item?</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-400">Are you sure you want to delete this item? This action cannot be undone.</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button onClick={handleConfirm} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>

                <button onClick={handleClosemodalDelete} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};
export default ProductList;
