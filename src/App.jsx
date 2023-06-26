import React from 'react'
import Header from './components/Navbar'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Header />
      <Outlet />
    </div>
  )
}
export default App