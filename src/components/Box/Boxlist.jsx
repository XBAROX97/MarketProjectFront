import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'
import { FaSearch } from "react-icons/fa";
import Pagination from "../Pagination";



const Boxlist = () => {
  const [boxs, setBoxs] = useState([]);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selectedBox, setSelectedBox] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityBox, setQuantityBox] = useState(0);
  const [quantityPiece, setQuantityPiece] = useState(0);
  const [boxprice, setBoxprice] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [nav, setNav] = useState(false);

  const loadBox = async () => {
    await axios.get('http://localhost:4040/api/boxes')
      .then(response => {
        console.log(response);
        setBoxs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleCloseNav = () => {
    setNav(false);
    setSelectedProduct(null);
    setQuantityBox(0);
    setQuantityPiece(0);
    setBoxprice('');
    setSubmitStatus(false);
  };
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
  const handleClosemodalDelete = () => {
    setModalDelete(false)
  };
  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);

  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/boxes/${id}`
      );
      console.log(response);
      toast.success('box deleted successfully!');
      setBoxs(boxs.filter(box => box._id !== id));

      loadBox();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleDecreaseBox = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncreaseBox = () => {
    setQuantity(quantity + 1);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleUpdate = (box) => {
    setName(box.name)
    setPrice(box.price)
    setProductQuantity(box.productQuantity)
    setQuantity(box.quantity)
    setSelectedBox(box);
    setModalData(box);
    setModal(true);
  };
  const handleSave = async () => {
    try {
      console.log(modalData._id, name, productQuantity, quantity, price);
      await axios.patch(
        `http://localhost:4040/api/boxes/${modalData._id}`,
        {
          name,
          productQuantity: productQuantity,
          quantity,
          price,
          productId: modalData._id,
        }
      ).finally(() => { 
        toast.success('box has been updated successfully!');
        loadBox(); }).catch((err) => console.log(err));
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    loadBox();
    loadProduct();
    if (submitStatus) {
      setSelectedProduct(null);
      setQuantityBox(0);
      setQuantityPiece(0);
      setBoxprice('');
      setSubmitStatus(false);

    }
  }, [submitStatus]);

  const handleDecreasePiece = () => {
    if (quantityPiece > 0) {
      setQuantityPiece(quantityPiece - 1);
    }
  };
  const handleIncreasePiece = () => {
    setQuantityPiece(quantityPiece + 1);
  };
  const handleDecreaseBox2 = () => {
    if (quantityBox > 0) {
      setQuantityBox(quantityBox - 1);
    }
  };
  const handleIncreaseBox2 = () => {
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
        toast.success('box has been added successfully!');
        console.log(response);
        setSubmitStatus(true);
        setBoxs([...boxs, response.data]);
        setNav(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtredBox = boxs.filter((box) =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtredBox.slice(indexOfFirstPost, indexOfLastPost);

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
    <>
      <div className='container mx-auto'>
        <div className="w-full my-4">
          <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Boxes</h1>
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
            <button onClick={setNav} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 ">Add Box</button>
          </div>
        </div>
          <div className="relative rounded-lg overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr className='text-white'>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Name</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Box Quantity</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Piece Quantity</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Box Price</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y text-center divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {searchTerm ? currentPosts.map((box, i) => (
                  <tr className='hover:bg-gray-800 ' key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {box.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {box.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {box.productQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {box.price}  $</td>
                    <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 font-medium border-r text-center">
                      <div className=' flex gap-2  justify-center'>
                        <button
                          onClick={() => handleUpdate(box)}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                        >
                          <BsPencilFill />

                        </button>
                        <button onClick={() => {
                          setModalDelete(true);
                          setDataDelete(box._id)
                        }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4  shadow rounded">
                          <BsFillTrash3Fill />

                        </button>
                      </div>
                    </td>
                  </tr>
                )) :
                  boxs.map((box, i) => (
                    <tr className='hover:bg-gray-800 ' key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {box.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {box.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {box.productQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {box.price}  $</td>
                      <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 font-medium border-r text-center">
                        <div className=' flex gap-2  justify-center'>
                          <button
                            onClick={() => handleUpdate(box)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsPencilFill />
                          </button>
                          <button onClick={() => {
                            setModalDelete(true);
                            setDataDelete(box._id)
                          }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4  shadow rounded">
                            <BsFillTrash3Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className=' flex justify-center items-center'>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filtredBox.length}
              paginate={handlePageChange}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </div>
        </div>
      </div>
      {modal && (
        <div className="bg-black/90 r-300 fixed w-full h-screen  top-0 right-0">
          <div className={"fixed bg-gray-400 h-screen py-5 w-[40rem] duration-300 " + (modal ? 'right-0 top-0' : '-right-[100%] bottom-0')}>
            <div className='flex justify-between px-4 py-2'>
              <h2 className='text-2xl text-center font-bold pb-12 container capitalize'>Update Box</h2>
              <AiOutlineClose onClick={handleClose} size={50} className='cursor-pointer text-red-500 hover:bg-red-400 rounded-full p-1' />
            </div>

            <div className="mx-5 grid grid-cols-1 gap-6">
              <div className="bg-gray-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                    <label className="font-bold">Box Quantity:</label>
                    <div className="flex flex-row items-center">
                      <button
                        type="button"
                        className="border w-8 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mx-2 py-1 item-center text-center container"
                        onClick={handleDecreaseBox}
                      >
                        -
                      </button>
                      <input
                        disabled
                        className="border bg-white  border-gray-400 p-2 rounded-md w-10 text-center "
                        name="quantityBox"
                        type="number"
                        onChange={Number}
                        value={quantity}
                      />
                      <button
                        type="button"
                        className="border w-8 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mt- mx-2 py-1 item-center text-center container"
                        onClick={handleIncreaseBox}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold">Piece Quantity:</label>
                    <input
                      className="border border-gray-400 p-2 rounded-md w-full"
                      type="text"
                      defaultValue={modalData.productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold">Box Price:</label>
                  <input
                    className="border border-gray-400 p-2 rounded-md w-full"
                    type="text"
                    defaultValue={modalData.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className=" px-4 flex justify-center py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSave(selectedBox._id)}
                >
                  Update Box
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' /> : ''}

      <div className={"fixed bg-gray-600 z-10 h-screen py-5 w-[40rem] duration-300 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
        <div className={nav ? "block" : "hidden"}>
          <div className='flex justify-between px-4 py-2'>
            <h2 className='text-2xl text-center font-bold pb-12 text-white container capitalize'>Add Boxes</h2>
            <AiOutlineClose onClick={handleCloseNav} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-500  h-100% px-5 py-10">
            <div className='flex flex-col gap-2'>
              <label className='text-lg text-red-400 font-bold'>Select a product</label>
              <select
                className="text-black text-lg bg-gray-400 py-2 rounded-full"
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
                  <div >
                    <label className="block text-yellow-300">Box Quantity:</label>
                    <div className=' flex flex-row items-center'>
                      <button type="button" className='border w-10 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mx-2 py-1 item-center text-center container ' onClick={handleDecreaseBox2}>-</button>
                      <input className='border items-center align-middle text-center w-30 h-8   ' name='quantityBox' type='number' onChange={Number} value={quantityBox} />
                      <button type="button" className='border w-10 h-10 bg-yellow-500 rounded-lg font-bold text-2xl hover:text-yellow-200 mx-2 py-1 item-center text-center container ' onClick={handleIncreaseBox2}>+</button>
                    </div>
                  </div>
                  <div>

                    <label className="block text-green-300">Piece Quantity:</label>
                    <div className=' flex flex-row items-center'>
                      <button type="button" className='border h-10 w-10 bg-green-500 rounded-lg font-bold text-2xl hover:text-green-200 mx-2 py-1 item-center text-center container' onClick={handleDecreasePiece}>-</button>
                      <input className='border items-center align-middle text-center w-30 h-8' name='quantityPiece' type='number' onChange={Number} value={quantityPiece} />
                      <button type="button" className='border w-10 h-10 bg-green-500 rounded-lg font-bold text-2xl hover:text-green-200 mx-2 py-1 item-center text-center container' onClick={handleIncreasePiece}>+</button>
                    </div>
                  </div>

                </div>
                <div className="mb-6">
                  <label htmlFor="boxprice" className="block text-white font-bold mb-2">boxprice</label>
                  <input type="number" id="boxprice" min={0} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
        focus:shadow-outline" value={boxprice} onChange={(event) => setBoxprice(event.target.value)} />
                </div>

                <div className="flex items-center justify-center">
                  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
        focus:shadow-outline">Add Product</button>
                </div>
              </div>
              : ""}
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
                  <h3 class="text-lg leading-6 font-medium text-white">Delete Box?</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-400">Are you sure you want to delete this Box? This action cannot be undone.</p>
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

    </>
  );
};

export default Boxlist;
