import React, { useState, useEffect } from 'react';
import Button from './Button';
import Modal from './Modal';

const UserTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' }];
  });
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', status: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAdd = () => {
    setModalContent('add');
    setCurrentUser({ id: null, name: '', email: '', status: '' });
    setShowModal(true);
  };

  const handleDelete = () => {
    setModalContent('delete');
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalContent('edit');
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentUser.name) newErrors.name = 'Name is required';
    if (!currentUser.email) newErrors.email = 'Email is required';
    if (!currentUser.status) newErrors.status = 'Status is required';
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (modalContent === 'add') {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    } else if (modalContent === 'edit') {
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    }
    setShowModal(false);
    setErrors({});
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter(user => !user.selected));
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="flex space-x-2 my-4">
        <Button label="Add" color={"bg-blue-500"} onClick={handleAdd} />
        <Button label="Delete"  color={"bg-red-500"} onClick={handleDelete} />
        <Button label="Edit"  color={"bg-green-500"} onClick={() => {
          const selectedUser = users.find(user => user.selected);
          if (selectedUser) handleEdit(selectedUser);
        }} />
      </div>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Select</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">
                <input type="checkbox" checked={user.selected || false} onChange={() => {
                  setUsers(users.map(u => u.id === user.id ? { ...u, selected: !u.selected } : u));
                }} />
              </td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} handleClose={handleClose}>
        {modalContent === 'add' && (
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl mb-4">Add User</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={currentUser.name} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={currentUser.email} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input 
                type="text" 
                name="status" 
                value={currentUser.status} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.status && <p className="text-red-500">{errors.status}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
          </form>
        )}
        {modalContent === 'delete' && (
          <div>
            <h2 className="text-xl mb-4">Delete User</h2>
            <p>Are you sure you want to delete the selected user(s)?</p>
            <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
          </div>
        )}
        {modalContent === 'edit' && (
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={currentUser.name} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={currentUser.email} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input 
                type="text" 
                name="status" 
                value={currentUser.status} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.status && <p className="text-red-500">{errors.status}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default UserTable;
