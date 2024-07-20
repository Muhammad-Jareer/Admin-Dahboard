import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ setSelectedMenu }) => {
  const [menu, setMenu] = useState(false);

  const navigation = [
    { name: 'Users', id: 1, href: '#', icon: 'HomeIcon' },
    { name: 'Branches', id: 2, href: '#', icon: 'BriefcaseIcon' },
    { name: 'Reports', id: 3, href: '#', icon: 'FolderIcon' },
    { name: 'Settings', id: 4, href: '#', icon: 'CogIcon' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="md:p-4 p-2 flex justify-between items-center border-b border-gray-700">
        <h1 className="hidden md:block md:text-2xl md:font-bold text-sm font-normal text-left">Admin Dashboard</h1>
        <div
          onClick={() => setMenu(!menu)}
          className='md:hidden cursor-pointer text-white hover:text-gray-400 transition duration-300'
        >
          {menu ? <FaTimes size={30} /> : <FaBars size={20} />}
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${menu ? 'block' : 'hidden'}`}
        onClick={() => setMenu(false)}
      ></div>

      {/* Sidebar for Larger Devices or when Menu is Toggled */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-20 transform ${menu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:static lg:translate-x-0`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Menu</h2>
          <div
            onClick={() => setMenu(false)}
            className='lg:hidden cursor-pointer text-white hover:text-gray-400 transition duration-300'
          >
            <FaTimes size={20} />
          </div>
        </div>
        <ul className="mt-4 flex flex-col items-center lg:items-start lg:pl-4 w-full">
          {navigation.map(({ id, name }) => (
            <li key={id} className="w-full">
              <button
                onClick={() => {
                  setSelectedMenu(id);
                  setMenu(false);
                }}
                className="w-full text-left p-4 hover:bg-gray-700 transition duration-300 rounded-lg"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
