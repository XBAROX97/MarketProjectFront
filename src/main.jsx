import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, } from "react-router-dom";
import { router } from './Router';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-gray-600 h-screen'>
    <RouterProvider  router={router} />
    </div>
  </React.StrictMode>
)
