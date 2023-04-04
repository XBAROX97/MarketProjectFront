import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Boxlist = ({ boxs, setBoxs }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selectedBox, setSelectedBox] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [productQuantity, setProductQuantity] = useState('');
  const [quantity, setQuantity] = useState('');
  useEffect(() => {
    setLoading(true);
    loadBox();
  }, []);

  const loadBox = async () => {
    axios.get('http://localhost:4040/api/boxes')
      .then(response => {
        console.log(response);
        setBoxs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:4040/api/boxes/${id}`)
      .then(response => {
        console.log(response);
        setBoxs(boxs.filter(box => box._id !== id));
        alert("Data deleted");
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
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
  const handleClose = () => {
    setModal(false);
  };
  const handleSave = async () => {
    try {
     

      console.log(name,productQuantity,quantity,price)
      await axios.patch(`http://localhost:4040/api/boxes/${modalData._id}`,
        {
          name,
          quantity,
          productQuantity,
          price,

        }
      ).then(
        (res) => console.log(res.data.message)
      );
      console.log(selectedBox)
      loadBox().then(() => alert('Data saved.'));
      setModal(false);
      setModalData({});
    } catch (error) {
      ``
      console.error('Error saving data:', error);


    }
  };
  return (
    <>
      <div className="flex-[2] h-screen bg-gray-500 overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-4 text-white">Boxes List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr className='text-white text-lg'>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 text-green-400">piece Quantity</th>
                  <th className="px-4 py-2 text-yellow-300">Box Quantity</th>
                    <th className="px-4 py-2">Box Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {boxs.map((box, i) => (
                  <tr className='text-white ' key={i}>
                    <td className="border text-lg px-4 py-2">{box.name}</td>
                    <td className="border text-lg px-4 py-2 text-green-300">{box.productQuantity}</td>
                    <td className="border text-lg px-4 py-2 text-yellow-300">{box.quantity}</td>
                    <td className="border text-lg px-4 py-2">{box.price}  $</td>
                    <td className="flex flex-col sm:flex-row justify-between px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <button
                        onClick={() => handleUpdate(box)}
                        className="bg-yellow-400 text-black hover:text-white px-2 mr-2 mb-2 sm:mb-0"
                      >
                        Update
                      </button>
                      <button onClick={() => handleDelete(box._id)} className="bg-red-400 text-black hover:text-white px-2">
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
                    <p className="font-bold">box Price:</p>
                    <input className='border ' type='text' defaultValue={modalData.price} onChange={(e) => setPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold">pieceQuantity:</p>
                    <input className='border' type='text' defaultValue={modalData.productQuantity} onChange={(e) => setProductQuantity(e.target.value)}></input>
                  </div>
                  <div>
                    <p className="font-bold">boxQuantity:</p>
                    <input className='border' type='text' defaultValue={modalData.quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                  </div>

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

    </>
  );
};

export default Boxlist;
