import React from 'react';

const Header = () => {
  return (
    <div className="w-full bg-gray-300 p-4 flex justify-between items-center">
      <h2>Welcome Kamran</h2>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}

export default Header;
