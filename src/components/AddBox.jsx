import React, { useState, useEffect } from 'react';
import Addbo from './Box/Addbo';
import Boxlist from './Box/Boxlist';
import axios from 'axios';

const AddBox = () => {
 


  
  


  

  return (
    <div className='w-screen h-screen flex'>
      {/* <Addbo boxs={boxs} setBoxs={setBoxs} products={products} setProducts={setProducts} /> */}
      <Boxlist />
    </div>
  );
};

export default AddBox;