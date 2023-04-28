import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import Pagination from "../Pagination";


const UserList = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [debt, setDebt] = useState('');
  const [comments, setComments] = useState('');
  const [position, setPosition] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [nav, setNav] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  //  create ----------------------------------------------------------------------------------------------------------------------------------
  const [name2, setName2] = useState('');
  const [budget2, setBudget2] = useState('');
  const [debt2, setDebt2] = useState('');
  const [comments2, setComments2] = useState('');
  const [position2, setPosition2] = useState('');


  //modale delete -------------------------------------------------------------------------------------------
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name2}, budget: ${budget2}, debt: ${debt2}, comments: ${comments2},  position: ${position2}`);
    axios.post('http://localhost:4040/api/users', {
      name: name2,
      budget: budget2,
      debt: debt2,
      comments: comments2,
      position: position2,
    })
      .then((response) => {
        console.log(response);
        setUsers([...users, response.data])
        toast.success('new Client  has beem added!');
        console.log(`Name: ${name2}, budget: ${budget2}, debt: ${debt2}, comments: ${comments2},  position: ${position2}`);
        setName2('');
        setBudget2('');
        setDebt2('');
        setComments2('');
        setPosition2('');
        setNav(false);
        loadUser();

      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/users');
      console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/users/${id}`
      );
      console.log(response);
      toast.success('client has been deleted successfully!');
      setUsers(users.filter(user => user._id !== id));
      loadUser();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleCloseNav = () => {
    setNav(false);
    setName2('');
    setBudget2('');
    setDebt2('');
    setPosition2('');
    setComments2('');

  };
  const handleClosemodalDelete = () => {
    setModalDelete(false)
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
      loadUser().then(() => console.log('Data sarved.'));
      toast.success('Product has been updated successfully!');
      setModal(false);
      setModalData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const filtredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtredUsers.slice(indexOfFirstPost, indexOfLastPost);

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
        <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Clients</h1>
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
            <button onClick={setNav} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 ">Add Client</button>
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
                  >Name</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Budget</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Debt</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Comments</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Position</th>
                  <th scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y text-center divide-gray-200 dark:bg-gray-900 dark:divide-gray-700" key="users">
                {searchTerm
                  ? currentPosts.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-800 ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.budget}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.debt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.comments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.position}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-border-gray-200 text-sm leading-5 font-medium">
                        <div className="flex justify-center gap-5">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsPencilFill />

                          </button>
                          <button
                            onClick={() => {
                              setModalDelete(true);
                              setDataDelete(user._id);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsFillTrash3Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  :
                  users.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-800 ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.budget}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.debt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.comments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.position}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-border-gray-200 text-sm leading-5 font-medium">
                        <div className="flex justify-center gap-5">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsPencilFill />
                          </button>
                          <button
                            onClick={() => {
                              setModalDelete(true);
                              setDataDelete(user._id);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded"
                          >
                            <BsFillTrash3Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        )}
        <div>
          <div className=' flex justify-center items-center'>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filtredUsers.length}
              paginate={handlePageChange}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </div>
        </div>
      </div>

      {modal && (
        <div className="bg-black/90 r-300 fixed w-full h-screen  top-0 right-0">
          <div className={"fixed bg-gray-400 h-screen py-5 w-[35rem] duration-300 " + (modal ? 'right-0 top-0' : '-right-[100%] bottom-0')}>

            <div className='flex justify-between px-4 py-2'>
              <h2 className='text-2xl text-center font-bold pb-12 container capitalize'>Update Client</h2>
              <AiOutlineClose onClick={handleClose} size={50} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
            </div>
            <div className="mx-5 grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-4">
                <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">Client  Name</label>

                  <input
                    type="text"
                    name="name"
                    defaultValue={modalData.name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-lg font-medium mb-2">
                    Budget:
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    defaultValue={modalData.budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="debt" className="block text-lg font-medium mb-2">
                    Debt:
                  </label>
                  <input
                    type="text"
                    id="debt"
                    name="debt"
                    defaultValue={modalData.debt}
                    onChange={(e) => setDebt(e.target.value)}
                    className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="comments" className="block text-lg font-medium mb-2">
                    Comments:
                  </label>
                  <input
                    type="text"
                    id="comments"
                    name="comments"
                    defaultValue={modalData.comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-lg font-medium mb-2">
                    Position:
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    defaultValue={modalData.position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      )}

      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' /> : ''}

      <div className={"fixed bg-white z-10 h-screen py-5 w-[35rem] duration-300 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
        <div className={nav ? "block" : "hidden"}>
          <div className='flex justify-between px-4 py-2'>
            <h2 className='text-2xl text-center font-bold pb-12 container capitalize'>Add Client</h2>
            <AiOutlineClose onClick={handleCloseNav} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
          </div>
          <form onSubmit={handleSubmit} className="mx-5 grid grid-cols-1 gap-6">
            <div className='flex flex-col gap-4'>
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">Client Name</label>
                <input type="text" id="name" placeholder='Client name' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name2} onChange={(event) => setName2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="budget" className="block text-lg font-medium mb-2">Budget</label>
                <input type="number" min={0} id="budget" placeholder='Budget' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={budget2} onChange={(event) => setBudget2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="debt" className="block text-lg font-medium mb-2">Debt</label>
                <input type="number" min={0} id="debt" placeholder='Debt' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={debt2} onChange={(event) => setDebt2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="position" className="block text-lg font-medium mb-2">Job</label>
                <input type="text" id="position" placeholder='Job' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={position2} onChange={(event) => setPosition2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="comments" className="block text-lg font-medium mb-2">Comments</label>
                <textarea type="text" rows={3} id="comments" placeholder='Comments' className="border border-gray-300 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={comments2} onChange={(event) => setComments2(event.target.value)} />
              </div>
            </div>

            <div>
              <button type="submit" className="inline-flex items-center bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4">
                Add Client
              </button>
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

export default UserList;
