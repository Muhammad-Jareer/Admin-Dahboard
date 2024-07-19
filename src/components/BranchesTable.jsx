import React, { useState, useEffect } from 'react';
import Button from './Button';
import Modal from './Modal';

const BranchesTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [branches, setBranches] = useState(() => {
    const savedBranches = localStorage.getItem('branches');
    return savedBranches ? JSON.parse(savedBranches) : [{ id: 1, name: 'Branch 1', location: 'Location 1', status: 'Active' }];
  });
  const [currentBranch, setCurrentBranch] = useState({ id: null, name: '', location: '', status: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  const handleAdd = () => {
    setModalContent('add');
    setCurrentBranch({ id: null, name: '', location: '', status: '' });
    setShowModal(true);
  };

  const handleDelete = () => {
    setModalContent('delete');
    setShowModal(true);
  };

  const handleEdit = (branch) => {
    setModalContent('edit');
    setCurrentBranch(branch);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentBranch({ ...currentBranch, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentBranch.name) newErrors.name = 'Name is required';
    if (!currentBranch.location) newErrors.location = 'Location is required';
    if (!currentBranch.status) newErrors.status = 'Status is required';
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
      setBranches([...branches, { ...currentBranch, id: Date.now() }]);
    } else if (modalContent === 'edit') {
      setBranches(branches.map(branch => branch.id === currentBranch.id ? currentBranch : branch));
    }
    setShowModal(false);
    setErrors({});
  };

  const handleDeleteConfirm = () => {
    setBranches(branches.filter(branch => !branch.selected));
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Branches</h2>
      <div className="flex space-x-2 my-4">
        <Button label="Add" color={"bg-blue-500"} onClick={handleAdd} />
        <Button label="Delete" color={"bg-red-500"} onClick={handleDelete} />
        <Button label="Edit" color={"bg-green-500"} onClick={() => {
          const selectedBranch = branches.find(branch => branch.selected);
          if (selectedBranch) handleEdit(selectedBranch);
        }} />
      </div>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Select</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch.id}>
              <td className="border border-gray-300 p-2">
                <input type="checkbox" checked={branch.selected || false} onChange={() => {
                  setBranches(branches.map(b => b.id === branch.id ? { ...b, selected: !b.selected } : b));
                }} />
              </td>
              <td className="border border-gray-300 p-2">{branch.name}</td>
              <td className="border border-gray-300 p-2">{branch.location}</td>
              <td className="border border-gray-300 p-2">{branch.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} handleClose={handleClose}>
        {modalContent === 'add' && (
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl mb-4">Add Branch</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={currentBranch.name} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input 
                type="text" 
                name="location" 
                value={currentBranch.location} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.location && <p className="text-red-500">{errors.location}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input 
                type="text" 
                name="status" 
                value={currentBranch.status} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.status && <p className="text-red-500">{errors.status}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Branch</button>
          </form>
        )}
        {modalContent === 'delete' && (
          <div>
            <h2 className="text-xl mb-4">Delete Branch</h2>
            <p>Are you sure you want to delete the selected branch(es)?</p>
            <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
          </div>
        )}
        {modalContent === 'edit' && (
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl mb-4">Edit Branch</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={currentBranch.name} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input 
                type="text" 
                name="location" 
                value={currentBranch.location} 
                onChange={handleFormChange} 
                className="border p-2 w-full" 
              />
              {errors.location && <p className="text-red-500">{errors.location}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input 
                type="text" 
                name="status" 
                value={currentBranch.status} 
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

export default BranchesTable;
