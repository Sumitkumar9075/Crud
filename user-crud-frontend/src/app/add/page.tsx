'use client';

import axios from 'axios';
import { useState } from 'react';

type FormData = {
  name: string;
  address: string;
  gender: string;
  age: string;
  country: string;
};

export default function AddUser() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    gender: '',
    age: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('User added successfully!');
      setFormData({ name: '', address: '', gender: '', age: '', country: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error adding user:', error);
      alert('There was an error adding the user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add User</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-6"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
