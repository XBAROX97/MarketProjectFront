import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

  const [isHovering, setIsHovering] = useState(true);

  const menu = [

    {
      name: "Home",
      link: '/',
    },
    {
      name: "Clients",
      link: '/addclient',
    },
    {
      name: "Product",
      link: '/addproduct',
    },
    {
      name: "Boxes",
      link: '/addbox',
    },
    {
      name: "History",
      link: '/purchasehistory',
    }, {
      name: "Profit",
      link: '/profit',
    }, {
      name: "Leaderboard",
      link: '/leaderboard',
    }

  ]

  const handleMouseOver = () => {
    // setIsHovering(false);
    setTimeout(() => {
      setIsHovering(false);

    }, 1000);

    setTimeout(() => {
      handleMouseOut();

    }, 2000);

  };

  const handleMouseOut = () => {
    setIsHovering(true);
  };

  const linkText = isHovering ? 'Ali NotExpress' : 'ALIMama';

  return (
    <header className="bg-gray-900 px-4 py-6 md:px-8 md:py-8">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="lg:w-0 lg:flex-1">
        <Link to="/" className="text-white text-3xl font-bold">
          {linkText}
          <span className="text-red-500 text-base ml-2 font-semibold">
            Habibi Come to Ali
          </span>
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        {menu.map((item, i) => {
          return (
            <Link
              to={item.link}
              key={i}
              className="text-white font-medium hover:text-red-500 transition-colors duration-300"
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
      <button className="md:hidden text-white focus:outline-none">
        <svg viewBox="0 0 20 20" fill="currentColor" className="menu w-6 h-6">
          <path
            fillRule="evenodd"
            d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
    {/* mobile menu */}
    <nav className="md:hidden pt-4">
      {menu.map((item, i) => {
        return (
          <Link
            to={item.link}
            key={i}
            className="block py-2 text-white font-medium hover:text-red-500 transition-colors duration-300"
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  </header>

  );
};

export default Header;
