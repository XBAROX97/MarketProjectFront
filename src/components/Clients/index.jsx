import axios from 'axios';
import TableRow from './TableRow'
import { toast } from 'react-toastify';
import Pagination from "../Pagination";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from 'react';

const UserList = ({ }) => {
  const [modal, setModal] = useState(false);
  const [_id, set_id] = useState(null);
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
  const [comments2, setComments2] = useState('');
  const [position2, setPosition2] = useState('');
  //modale delete -------------------------------------------------------------------------------------------
  const [users, setUsers] = useState([]);

  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error loading data!');
    }
  }
  useEffect(() => {
    loadUser();
  }, []);

  const handleConfirm = () => {
    handleDelete(dataDelete);
    setModalDelete(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: name2.toLowerCase(),
      budget: 0,
      debt: 0,
      comments: comments2 ? comments2 : '',
      position: position2
    };

    try {
      await axios.post('http://localhost:4040/api/users', newUser);
      await loadUser();
      toast.success('New client has been added!');
      setName2('');
      setComments2('');
      setPosition2('');
      setNav(false);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/api/users/${id}`);
      toast.success('Client removed successfully!');
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };
  const handleClose = () => {
    setModal(false);
    setNav(false);
    setName2('');
    setComments2('');
    setPosition2('');
    set_id(null);
    setName('')
    setBudget('')
    setDebt('')
    setComments('')
    setPosition('')
  };
  const handleCloseNav = () => {
    setNav(false);
    setName2('');
    setPosition2('');
    setComments2('');
  };
  const handleClosemodalDelete = () => {
    setModalDelete(false)
  };
  const handleUpdate = (_id) => {
    const updatedUser = users.filter(user => user._id === _id)[0];

    set_id(updatedUser._id);
    setName(updatedUser.name);
    setBudget(updatedUser.budget);
    setDebt(updatedUser.debt);
    setComments(updatedUser.comments);
    setPosition(updatedUser.position);

    setModal(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    let remainingBudget;
    let remainingDebt;
    try {
      const newBudget = budget ?? 0;
      const newDebt = debt ?? 0;

      if (newBudget > 0 && newDebt > 0) {
        if (newDebt > newBudget) {
          remainingDebt = newDebt - newBudget;
          remainingBudget = 0;
        } else {
          remainingBudget = newBudget - newDebt;
          remainingDebt = 0;
        }
      } else {
        remainingBudget = newBudget;
        remainingDebt = newDebt;
      }

      await axios.patch(`http://localhost:4040/api/users/${_id}`, { name, budget: remainingBudget, debt: remainingDebt, position, comments });
      const updatedUsers = users.map(user => {
        if (user._id === _id) {
          return { ...user, name, budget: remainingBudget, debt: remainingDebt, position, comments };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
      toast.success('User has been updated!');
      if (modal !== undefined) {
        setModal(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error, Contact Salim!")
    }
  };

  const filtredUsers = users.filter(user => user.name && user.name.toLowerCase().includes(searchTerm?.toLowerCase()));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtredUsers.slice(indexOfFirstPost, indexOfLastPost);

  const closeAll = () => {
    setNav(false);
    setName2('');
    setComments2('');
    setPosition2('');
    setName('')
    setBudget('')
    setDebt('')
    setComments('')
    setPosition('')
    setModal(false);
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    const lastPage = Math.ceil(users.length / postsPerPage);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className="w-full my-4">
        <h1 className="text-4xl font-bold text-center text-slate-100 font-mono uppercase">Clients</h1>

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
            <button onClick={setNav} className="bg-blue-700 rounded hover:bg-blue-800 text-white font-bold py-2 px-4">Add Client</button>
          </div>
        </div>


        {/* Table */}
        <div className="relative rounded-lg overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg flex justify-center">
          <table className="w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="tableCol">Name</th>
                <th scope="col" className="tableCol">Budget</th>
                <th scope="col" className="tableCol">Debt</th>
                <th scope="col" className="tableCol">Position</th>
                <th scope="col" className="tableCol">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-center bg-gray-900 divide-gray-700" key="users">
              {
                currentPosts.map(({ _id, name, budget, debt, comments, position }) => (
                  <TableRow
                    key={_id}
                    _id={_id}
                    name={name}
                    budget={budget}
                    debt={debt}
                    comments={comments}
                    position={position}
                    handleUpdate={handleUpdate}
                    setModalDelete={setModalDelete}
                    setDataDelete={setDataDelete}
                  />
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className=' flex justify-center items-center'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filtredUsers.length}
            currentPage={currentPage}
            paginate={handlePageChange}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </div>

      {nav || modal ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' onClick={closeAll} /> : ''}

      {/* Edit Modal */}
      <div className={"fixed bg-gray-800 z-10 h-screen py-5 w-[35rem] duration-300 " + (modal ? 'right-0 top-0' : '-right-[100%] bottom-0')}>
        <div className='flex justify-between px-4 py-2'>
          <h2 className='text-2xl text-center font-bold pb-12 container capitalize text-white'>Update</h2>
          <AiOutlineClose onClick={handleClose} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
        </div>
        <div className="mx-5 grid grid-cols-1 gap-6">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 text-white">Name</label>
              <input
                type="text"
                name="name"
                autoComplete='off'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="addLabel bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="budget" className="block text-lg font-medium mb-2 text-white">
                Budget
              </label>
              <input
                required
                type="number"
                id="budget"
                autoComplete='off'
                name="budget"
                value={Math.round(budget * 100) / 100}
                onChange={(e) => setBudget(e.target.value)}
                className="addLabel"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-lg font-medium mb-2 text-white">
                Position
              </label>
              <input
                type="text"
                id="position"
                autoComplete='off'
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="addLabel bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="comments" className="block text-lg font-medium mb-2 text-white">
                Comments
              </label>
              <textarea
                type="text"
                id="comments"
                autoComplete='off'
                name="comments"
                rows={3}
                placeholder='Comments'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="addLabel bg-gray-700"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex rounded items-center bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4"
              >
                Update Client
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Modal */}
      <div className={"fixed bg-gray-800 z-10 h-screen py-5 w-[35rem] duration-300 " + (nav ? 'left-0 top-0' : '-left-[100%] bottom-0')}>
        <div className={nav ? "block" : "hidden"}>
          <div className='flex justify-between px-4 py-2'>
            <h2 className='text-2xl text-center font-bold pb-12 container capitalize text-white'>Add Client</h2>
            <AiOutlineClose onClick={handleCloseNav} size={30} className='cursor-pointer text-red-500 hover:bg-red-300 rounded-full p-1' />
          </div>
          <form onSubmit={handleSubmit} className="mx-5 grid grid-cols-1 gap-6">
            <div className='flex flex-col gap-4'>
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2 text-white">Name</label>
                <input type="text" autoComplete='off' id="name" placeholder='Client name' className="addLabel" value={name2} onChange={(event) => setName2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="position" className="block text-lg font-medium mb-2 text-white">Job</label>
                <input type="text" autoComplete='off' id="position" placeholder='Job' className="addLabel" value={position2} onChange={(event) => setPosition2(event.target.value)} />
              </div>
              <div>
                <label htmlFor="comments" className="block text-lg font-medium mb-2 text-white">Comments</label>
                <textarea type="text" autoComplete='off' rows={3} id="comments" placeholder='Comments' className="addLabel" value={comments2} onChange={(event) => setComments2(event.target.value)} />
              </div>
            </div>
            <div>
              <button type="submit" className="inline-flex rounded items-center bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4">
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
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
                  <h3 className="text-lg leading-6 font-medium text-white">Delete item?</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Are you sure you want to delete this item? This action cannot be undone.</p>
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
    </div>
  );
};

export default UserList;
