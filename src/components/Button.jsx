import React from 'react';

const Button = ({ label, onClick, color }) => {
  return (
    <button className={`${color} text-white px-4 py-2 rounded`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;


// "bg-blue-500 text-white px-4 py-2 rounded" 