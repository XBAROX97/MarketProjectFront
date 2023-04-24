import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Boxlist = ({ boxs, setBoxs }) => {
  const [modal, setModal] = useState(false)

  const [modalData, setModalData] = useState({})
  const [selectedBox, setSelectedBox] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState('');

  const loadBox = async () => {
    await axios.get('http://localhost:4040/api/boxes')
      .then(response => {
        console.log(response);
        setBoxs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

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
      alert('Data deleted');
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
      ).finally(() => { alert('Data saved.'); loadBox(); }).catch((err) => console.log(err));
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <div className="flex-[2] h-screen bg-gray-500 overflow-y-scroll border">
        <h1 className="text-2xl font-bold mb-4 text-white text-center font-mono pt-2">Boxes List</h1>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-700 sticky top-0">
              <tr className='text-white'>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 text-yellow-300">Box Quantity</th>
                <th className="px-4 py-2 text-green-400">Piece Quantity</th>
                <th className="px-4 py-2">Box Price</th>
                <th className="text-center px-4 py-2 border-r">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {boxs.map((box, i) => (
                <tr className='hover:bg-gray-700 focus-within:bg-gray-700 text-md ' key={i}>
                  <td className="px-4 py-2 whitespace-nowrap">{box.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-yellow-300">{box.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-green-300">{box.productQuantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">{box.price}  $</td>
                  <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 font-medium border-r text-center">
                    <div className=' flex gap-2  justify-center'>

                      <button
                        onClick={() => handleUpdate(box)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 shadow rounded"
                      >
                        EditBox
                      </button>
                      <button onClick={() => {
                        setModalDelete(true);
                        setDataDelete(box._id)
                      }} className="bg-red-600 hover:bg-green-700 text-white font-bold py-2 px-4  shadow rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                        className="border border-gray-400 p-2 rounded-md w-10 text-center "
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
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSave(selectedBox._id)}
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
