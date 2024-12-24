"use client";

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define the User type
type User = {
  _id: string;
  name: string;
  address: string;
  gender: string;
  age: string;
  country: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch the users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3001/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      alert('User deleted successfully!');
      // Update the state to reflect the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('There was an error deleting the user.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        {/* Add User Button */}
        <div className="flex justify-end mb-6">
          <Link href="/add">
            <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
              Add User
            </button>
          </Link>
        </div>

        {/* User List Section */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User List</h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/edit/${user._id}`}>
                <div className="cursor-pointer">
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.address}</p>
                  <div className="text-sm text-gray-500">
                    <p>{user.gender}</p>
                    <p>{user.age} years old</p>
                    <p>{user.country}</p>
                  </div>
                </div>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
