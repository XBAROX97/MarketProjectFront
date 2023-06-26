import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'
import { FaSearch } from "react-icons/fa";
import Pagination from "../Pagination";
import Select from "react-select";

function ProductSelector({ products, setSelectedProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const options = products.map((product) => ({
    label: product.name,
    value: product,
  }));
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption?.value || null);
    setSelectedProducts(selectedOption?.value || null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg text-white font-bold">Select a product</label>
      <Select
        value={selectedProduct ? { label: selectedProduct.name, value: selectedProduct } : null}
        options={options}
        onChange={handleProductChange}
        placeholder="Search for a product"
        isClearable={true}
        className="text-white bg-gray-900 rounded focus:ring-0"
        styles={{
          control: (provided, state) => ({
            ...provided,
            paddingTop: '5px',
            paddingBottom: '5px',
            color: "white",
            backgroundColor: state.isFocused ? "rgb(17,24,39)" : "transparent",
            borderColor: state.isFocused ? "transparent" : "transparent",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#2563eb",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "rgb(17,24,39)" : "transparent",
            color: state.isSelected ? "#F9FAFB" : "#D1D5DB",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: "rgb(17,24,39)",
            borderRadius: "0.25rem",
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: "#F9FAFB",
            textTransform: "capitalize",
          }),
        }}
      />
    </div>
  );
}
const Boxlist = () => {
  const [boxs, setBoxs] = useState([]);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selectedBox, setSelectedBox] = useState({});
  const [name, setName] = useState('');
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
        setBoxs(response.data);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error loading data!');
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
      setProducts(productData);
    } catch (error) {
      console.error(error);
      toast.error('Error loading data!');
    }
  };
  const handleClosemodalDelete = () => {
    setModalDelete(false)
  };
  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);

  };
  const closeAll = () => {
    setNav(false);
    setModal(false);
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4040/api/boxes/${id}`
      );
      toast.success('Box deleted successfully!');
      setBoxs(boxs.filter(box => box._id !== id));

      loadBox();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error loading data!');
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
    setProductQuantity(box.productQuantity)
    setQuantity(box.quantity)
    setSelectedBox(box);
    setModalData(box);
    setModal(true);
  };
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:4040/api/boxes/${modalData._id}`,
        {
          name,
          productQuantity: productQuantity,
          quantity,
          productId: modalData.productId,
        }
      ).finally(() => {
        toast.success('Box added successfully!');
        loadBox();
      }).catch((err) => {
        console.error(err);
        toast.error('Error loading data!');
      });
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Something went wrong!');
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
  }, []);

  const handleDecreasePiece = () => {
    if (quantityPiece > 0) {
      setQuantityPiece(+quantityPiece - 1);
    }
  };
  const handleIncreasePiece = () => {
    setQuantityPiece(+quantityPiece + 1);
  };
  const handleDecreaseBox2 = () => {
    if (quantityBox > 1) {
      setQuantityBox(+quantityBox - 1);
    }
  };
  const handleIncreaseBox2 = () => {
    setQuantityBox(+quantityBox + 1);
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
    axios.post('http://localhost:4040/api/boxes', data)
      .then((response) => {
        toast.success('box has been added successfully!');
        setSubmitStatus(true);
        setBoxs([...boxs, response.data]);
        setNav(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong!');
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
          {/* Search */}
          <div className="my-4 grid grid-cols-12 gap-4">
            <div className="col-span-6 lg:col-span-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-800 transition duration-200 ease-in-out rounded-lg focus:border-blue-500 focus:outline-none bg-gray-800 text-gray-100"
                />
                <span className="absolute right-3">
                  <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-100" />
                </span>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-9 flex justify-end">
              <button onClick={setNav} className="bg-blue-700 rounded hover:bg-blue-800 text-white font-bold py-2 px-4">Add Box</button>
            </div>
          </div>

          {/* Table */}
          <div className="relative rounded-lg overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg flex justify-center">
            <table className="w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr className='text-white'>
                  <th scope="col" className="tableCol">Product Name</th>
                  <th scope="col" className="tableCol">Box Quantity</th>
                  <th scope="col" className="tableCol">Piece Quantity</th>
                  <th scope="col" className="tableCol">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center bg-gray-900 divide-gray-700">
                {currentPosts.map((box, i) => (
                  <tr className='hover:bg-gray-800' key={i}>
                    <td className="tableRow capitalize text-white">{box.name}</td>
                    <td className="tableRow text-white">{box.quantity}</td>
                    <td className="tableRow text-white">{box.productQuantity}</td>
                    <td className="px-6 py-4 whitespace-no-wraptext-sm leading-5 font-medium text-center">
                      <div className='flex gap-2 justify-center'>
                        <button onClick={() => handleUpdate(box)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded">
                          <BsPencilFill />
                        </button>
                        <button onClick={() => {
                          setModalDelete(true);
                          setDataDelete(box._id)
                        }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded">
                          <BsFillTrash3Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination  */}
          <div className=' flex justify-center items-center'>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filtredBox.length}
              currentPage={currentPage}
              paginate={handlePageChange}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </div>
        </div>
      </div>


      {nav || modal ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' onClick={closeAll} /> : ''}

      {/* Edit */}
      <div className={"fixed bg-gray-800 z-10 h-screen py-5 w-[35rem] duration-300 " + (modal ? 'right-0 top-0' : '-right-[100%] bottom-0')}>
        <div className='flex justify-between px-4 py-2'>
          <h2 className='text-2xl text-center font-bold pb-12 container capitalize text-white'>Update</h2>
          <AiOutlineClose onClick={handleClose} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
        </div>

        <div className="mx-5 grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-white">Name</label>
            <input
              type="text"
              name="name"
              autoComplete='off'
              value={name}
              disabled
              onChange={(e) => setName(e.target.value)}
              className="addLabel cursor-not-allowed bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-lg text-white font-medium mb-2">Box Quantity</label>
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="flex justify-center px-4 py-2 items-center bg-green-500 hover:bg-green-600 rounded-l font-bold"
                onClick={handleDecreaseBox}
              >
                -
              </button>
              <input
                className="items-center w-full align-middle text-center py-2 bg-gray-900 focus:outline-blue-600  text-white"
                type="number"
                onChange={Number}
                value={quantity}
              />
              <button
                type="button"
                className="flex justify-center px-4 py-2 items-center bg-green-500 hover:bg-green-600 rounded-r font-bold"
                onClick={handleIncreaseBox}
              >+
              </button>
            </div>
          </div>
          <div>
            <label className="block text-lg text-white font-medium mb-2">Piece Quantity</label>
            <input
              className="addLabel"
              type="text"
              defaultValue={modalData.productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex rounded items-center bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4"
              onClick={() => handleSave(selectedBox._id)}
            >Update Box
            </button>
          </div>
        </div>
      </div>
      {/* Add */}
      <div className={"fixed bg-gray-800 z-10 h-screen py-5 w-[35rem] duration-300 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
        <div className={nav ? "block" : "hidden"}>
          <div className='flex justify-between px-4 py-2'>
            <h2 className='text-2xl text-center font-bold pb-12 text-white container capitalize'>Add Boxes</h2>
            <AiOutlineClose onClick={handleCloseNav} size={30} className='cursor-pointer text-red-600 hover:bg-red-400 rounded-full p-1' />
          </div>
          <form onSubmit={handleSubmit} className="h-full px-5 py-10">
            <ProductSelector products={products} setSelectedProducts={setSelectedProduct} />
            {selectedProduct &&
              <div className='flex flex-col gap-6 pt-4'>
                <div className="flex flex-col justify-between gap-4">
                  <div className='flex flex-col gap-2'>
                    <label className="block text-white font-semibold">Box Quantity</label>
                    <div className='flex flex-row items-center'>
                      <button type="button" className='flex justify-center px-4 py-2 items-center bg-yellow-500 hover:bg-yellow-600 rounded-l font-bold' onClick={handleDecreaseBox2}>-</button>
                      <input className='items-center w-full align-middle text-center py-2 bg-gray-900 focus:outline-blue-600  text-white' name='quantityBox' min={1} type='number' onChange={(e) => setQuantityBox(e.target.value)} value={quantityBox} />
                      <button type="button" className='flex px-4 py-2 justify-center items-center rounded-r bg-yellow-500 hover:bg-yellow-600 font-bold' onClick={handleIncreaseBox2}>+</button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className="block text-white font-semibold">Piece Quantity</label>
                    <div className='flex flex-row items-center'>
                      <button type="button" className='flex justify-center px-4 py-2 items-center bg-green-500 hover:bg-green-600 rounded-l font-bold' onClick={handleDecreasePiece}>-</button>
                      <input className='items-center w-full align-middle text-center py-2 bg-gray-900 focus:outline-blue-600  text-white' min={1} name='quantityPiece' type='number' onChange={(e) => setQuantityPiece(e.target.value)} value={quantityPiece} />
                      <button type="button" className='flex justify-center px-4 py-2 items-center bg-green-500 hover:bg-green-600 rounded-r font-bold' onClick={handleIncreasePiece}>+</button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Product
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
      {/* Delete */}
      {modalDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center  sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-400 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-white">Delete Box?</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Are you sure you want to delete this Box? This action cannot be undone.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button onClick={handleConfirm} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={handleClosemodalDelete} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
