import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({users,setUsers}) => {
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [debt, setDebt] = useState('');
  const [comments, setComments] = useState('');
  const [position, setPosition] = useState('');

 

  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/users/${id}`
      );
      console.log(response);
      alert('Data deleted');
      setUsers(users.filter(user => user._id !== id));

      loadUser();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleUpdate = (user) => {
    setName(user.name)
    setBudget(user.budget)
    setDebt(user.debt)
    setComments(user.comments)
    setPosition(user.position)
    setSelectedUser(user);
    setModalData(user);
    setModal(true);
  };
  
  const handleSave = async () => {
    console.log("modal", name)
    try {
      await axios.patch(`http://localhost:4040/api/users/${modalData._id}`, 
      {
        name,
        budget,
        position,
        comments,
        debt
      }
      ).then(
        (res) => console.log(res)
      );
      console.log(selectedUser)
      loadUser().then(() => alert('Data saved.'));
      setModal(false);
      setModalData({});
    } catch (error) {
      ``
      console.error('Error saving data:', error);
    }
  };
  return (
    <>
      <div className=" flex-[2] h-screen bg-gray-500 overflow-y-scroll " >
        <h1 className="text-2xl font-bold mb-4 text-white">User List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr className='text-white'>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">budget</th>
              <th className="px-4 py-2">debt</th>
              <th className="px-4 py-2">comments</th>
              <th className="px-4 py-2">position</th>
              <th className="px-4 py-2">action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, i) => (
              <tr className='text-white ' key={i}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.budget}</td>
                <td className="border px-4 py-2">{user.debt}</td>
                <td className="border px-4 py-2">{user.comments}</td>
                <td className="border px-4 py-2">{user.position}</td>
                <td className="flex flex-col sm:flex-row justify-between px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="bg-yellow-400 text-black hover:text-white px-2 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
            <h4 className='text-2xl capitalize font-extrabold tracking-tight text-gray-900 mb-4'>
              <input type="text" className='border' name='name' defaultValue={modalData.name} onChange={(e)=> setName(e.target.value)} /></h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold">budget:</p>
                <input className='border' name='bugdet' type='text' defaultValue={modalData.budget} onChange={(e)=> setBudget(e.target.value)}></input>
              </div>
              <div>
                <p className="font-bold">debt:</p>
                <input className='border ' name='debt' type='text' defaultValue={modalData.debt} onChange={(e)=> setDebt(e.target.value)}></input>
              </div>
              <div>
                <p className="font-bold">comments:</p>
                <input className='border' name='comments' type='text' defaultValue={modalData.comments}  onChange={(e)=> setComments(e.target.value)}></input>
              </div>
              <div>
                <p className="font-bold">position</p>
                <input className='border' name='position' type='text' defaultValue={modalData.position} onChange={(e)=> setPosition(e.target.value)}></input>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleSave(selectedUser._id)}
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

export default UserList;
