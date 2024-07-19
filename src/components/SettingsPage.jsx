import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to update the user settings
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Profile Image:', profileImage);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Profile Image</label>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded cursor-pointer">
                <input {...getInputProps()} />
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full" />
                ) : (
                  <p>Drag & drop an image here, or click to select one</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
