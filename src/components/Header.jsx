import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const [isHovering, setIsHovering] = useState(false);

  const menu = [
    {
      name: "Home",
      link: '/'
    },
    {
      name: "Boxes",
      link: '/addbox',
    },
    {
      name: "History",
      link: '/purchasehistory',
    },
    {
      name: "Products",
      link: '/addproduct',
    },
    {
      name: "Clients",
      link: '/addclient',
    }
  ]

  const handleMouseOver = () => {
    setIsHovering(false);
  };

  const handleMouseOut = () => {
    setIsHovering(true);
  };

  const linkText = isHovering ? 'ALI Market' : 'ALIMama wahahahaha';

  return (
    <header className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <Link to="/" className="text-white text-4xl font-extrabold"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {linkText}
              <span className="text-red-500 text-base ml-2 font-semibold">
                Habibi Come to Ali
              </span>
            </Link>
          </div>
          <nav className="md:flex space-x-10">
            {menu.map((item, i) => {
              return (
                <Link
                  to={item.link}
                  key={i}
                  className="text-white font-medium py-2 px-3 border-b-2 border-transparent hover:border-white hover:text-gray-300 transition duration-200 ease-in-out"
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
