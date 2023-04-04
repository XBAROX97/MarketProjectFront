import React, {useState, useEffect} from 'react'
import AddUse from './User.jsx/AddUse'
import UserList from './User.jsx/UserList'
import axios from 'axios'

const AddClient = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }}
  return (
    <div className=' w-screen h-screen flex       '>
    <AddUse users={users} setUsers={setUsers}/>
    <UserList users={users} setUsers={setUsers}/>
    </div>
  )
}

export default AddClient