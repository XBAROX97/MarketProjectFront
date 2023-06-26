import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Header = () => {
  const menu = [
    {
      name: "Home",
      link: '/',
    },
    {
      name: "Clients",
      link: '/clients',
    },
    {
      name: "Products",
      link: '/products',
    },
    {
      name: "Boxes",
      link: '/boxes',
    },
    {
      name: "History",
      link: '/history',
    }, {
      name: "Profit",
      link: '/profit',
    }, {
      name: "Leaderboard",
      link: '/leaderboard',
    }

  ]
  const location = useLocation();

  return (
    <header className="bg-gray-900 px-4 py-6 md:px-8 md:py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="lg:w-0 lg:flex-1">
          <Link to="/" className="text-white text-3xl font-bold">
            Ali<span className="text-red-500">Not</span>Express
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          {menu.map((item, i) => {
            return (
              <Link
                to={item.link}
                key={i}
                className={`font-medium  transition-colors duration-300 ${item.name.toLowerCase() === location.pathname.split('/')[1] ? 'text-red-500' : 'text-white hover:text-red-500'}`}
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
