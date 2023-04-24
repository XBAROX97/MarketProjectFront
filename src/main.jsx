import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, } from "react-router-dom";
import { router } from './Router';
import { ToastContainer } from 'react-toastify';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-gray-600 min-h-screen'>
      <RouterProvider router={router} />
    </div>
    <ToastContainer />
  </React.StrictMode>
)
