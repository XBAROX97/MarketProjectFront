import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
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