import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../Pagination";


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
  const [modalDelete, setModalDelete] = useState(false)
  const [dataDelete, setDataDelete] = useState('');
  const [name2, setName2] = useState('');
  const [image2, setImage2] = useState('');
  const [category2, setCategory2] = useState('');
  const [price2, setPrice2] = useState('');
  const [retailPrice2, setRetailPrice2] = useState('');
  const [quantityInPieces2, setQuantityInPieces2] = useState('');
  const [serialNumber2, setSerialNumber2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);




  const handleClosemodalDelete = () => {
    setModalDelete(false)
  };
  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);
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
      toast.success('Product has been updated successfully!');
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
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
        // console.log(`Name: ${name2}, Image: ${image2}, Price: ${price2}, category: ${category2}, : ${retailPrice2}, Quantity in Pieces: ${quantityInPieces2}, Serial Number: ${serialNumber2}`);
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
    // console.log(`Name: ${name2}, Image: ${image2}, Price: ${price2}, category: ${category2}, : ${retailPrice2}, Quantity in Pieces: ${quantityInPieces2}, Serial Number: ${serialNumber2}`);
  };
  const filtredProduct = products.filter((products) =>
    products.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtredProduct.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredLeaderBoardData.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className="w-full my-4">
        <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Products</h1>
        <div className="my-4 grid grid-cols-12 gap-4">
          <div className="col-span-6 lg:col-span-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 transition duration-500 ease-in-out border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <span className="absolute right-3">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </span>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-9 flex justify-end">
            <button onClick={setNav} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 ">Add Product</button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (

          <div className="relative rounded-lg overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >logo</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Name</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Price</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Retail Price</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Category</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Quantity in Pieces</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y text-center divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {currentPosts
                  // .filter((product) =>
                  //   product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product, i) => (
                    <tr
                      className="hover:bg-gray-800"
                      key={i}
                    >
                      <td className="px-2 py-2 whitespace-nowrap item-center">
                        <img src={product.Image == undefined || product.Image === "" ? "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" : product.Image} alt="Logo" className="h-14 object-cover w-14 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.retailPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.quantityInPieces}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="flex justify-center  gap-2">
                          <button
                            onClick={() => handleUpdate(product)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsPencilFill />
                          </button>
                          <button
                            onClick={() => {
                              setModalDelete(true);
                              setDataDelete(product._id)
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsFillTrash3Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>
            <div>

            </div>
          </div>


        )}
        <div className=' flex justify-center items-center'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filtredProduct.length}
            paginate={handlePageChange}
            previousPage={previousPage}
            nextPage={nextPage}
          />



        </div>
      </div>
      {modal && (
        <div className="bg-black/90 r-300 fixed w-full h-screen  top-0 right-0">
          <div className={"fixed bg-gray-400 h-screen py-5 w-[35rem] duration-300 " + (modal ? 'right-0 top-0' : '-right-[100%] bottom-0')}>

            <div className='flex justify-between px-4 py-2'>
              <h2 className='text-2xl text-center font-bold pb-12 container capitalize'>Update Product</h2>
              <AiOutlineClose onClick={handleClose} size={50} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
            </div>
            <div className="mx-5 grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Product Name</label>
                  <input type="text" placeholder='product Name' id="name" className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image" className="text-lg font-medium mb-2">Image address</label>
                  <input type="text" id="image" placeholder='Enter image address' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-lg font-medium mb-2">Price</label>
                  <input type="number" id="price" placeholder='eneter price' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="retailPrice" className="text-lg font-medium mb-2">Retail Price</label>
                  <input type="number" id="retailPrice " placeholder='Enter retail price' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={retailPrice} onChange={(event) => setRetailPrice(event.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-lg font-medium mb-2">Category</label>
                  <input type="text" id="category " placeholder='Enter category' className=" border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={category} onChange={(event) => setCategory(event.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="serialNumber" className="text-lg font-medium mb-2">Serial Number</label>
                  <input type="number" id="serialNumber" placeholder='Enter serial nb' className=" border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Update Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' /> : ''}
      <div className={"fixed bg-gray-100 z-10 h-screen py-5 w-[35rem] duration-500 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
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
