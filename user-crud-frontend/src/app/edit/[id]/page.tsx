'use client'; // Add this at the top

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

type User = {
  _id: string;
  name: string;
  address: string;
  gender: string;
  age: number;
  country: string;
};

export default function EditUser() {
  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Use useParams to get the dynamic route parameter 'id'
  const params = useParams();
  const id = params?.id; // Extract 'id' from params safely

  useEffect(() => {
    if (id) {
      // Fetch the user data when the component is mounted
      axios
        .get(`http://localhost:3001/users/${id}`)
        .then((response) => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData) {
      try {
        // Update the user data
        await axios.patch(`http://localhost:3001/users/${id}`, formData);
        router.push('/'); // Redirect to the user list page after successful update
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!formData) return <p>User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
  <label className="block text-gray-700 font-medium mb-2">Name:</label>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <label className="block text-gray-700 font-medium mb-2">Address:</label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <label className="block text-gray-700 font-medium mb-2">Gender:</label>
  <input
    type="text"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <label className="block text-gray-700 font-medium mb-2">Age:</label>
  <input
    type="number"
    name="age"
    value={formData.age}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <label className="block text-gray-700 font-medium mb-2">Country:</label>
  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
