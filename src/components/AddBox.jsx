import React, {useState, useEffect} from 'react'
import Addbo from './Box/Addbo'
import Boxlist from './Box/Boxlist'
import axios from 'axios'


const AddBox = () => {
  const [boxs, setBoxs] = useState([]);

    useEffect(() => {
    }, []);
    const loadBox = async () => {
      axios.get('http://localhost:4040/api/boxes').
        then(function (response) {
          setBoxs(response.data);
        }).catch(function (error) {
          console.error(error);
        })
    }
  return (
    <div className='w-screen h-screen flex'>
    <Addbo boxs={boxs}setBoxs={setBoxs}/>
    <Boxlist boxs={boxs}setBoxs={setBoxs}/>
    </div>
  )
}

export default AddBox