import React from 'react';

const Sidebar = ({ setSelectedMenu }) => {
  const navigation = [
    { name: 'Users', id: 1, href: '#', icon: 'HomeIcon' },
    { name: 'Branches', id: 2, href: '#', icon: 'BriefcaseIcon' },
    { name: 'Reports', id: 3, href: '#', icon: 'FolderIcon' },
    { name: 'Settings', id: 4, href: '#', icon: 'CogIcon' },
  ];

  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl p-4">Admin Dashboard</h1>
      <ul>
        {navigation.map(({ id, name }) => (
          <li key={id}>
            <button
              onClick={() => setSelectedMenu(id)}
              className="p-4 flex flex-col text-left w-full"
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
