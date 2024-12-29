import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiClient from '../../axiosInstance';
import Navbar from '../../Pages/Shared/Navbar';
import Loader from '../../utils/Loader';
import ASidebar from '../Shared/Asidebar';
import SectionTitle from './SectionTitle/SectionTitle';
const UserDisplay = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetching users from the backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/api/user`,  {
                    params: {
                      search: searchTerm, // Search term
                    },
                  });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching Users');
                setLoading(false);
            }
        };
        fetchUser();
    }, [searchTerm]);

    if (loading) {
        return <Loader/>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    // ............

      // Delete data from table based on Id
//   const handleDelete = async (_id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await apiClient.delete(`/api/user/${_id}`);
//         Swal.fire(
//           'Deleted!',
//           'Your user has been deleted.',
//           'success'
//         );
//         navigate('/adminboard/user-display');
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         Swal.fire(
//           'Error!',
//           'Failed to delete the user. Please try again.',
//           'error'
//         );
//       }
//     }
//   };
// Delete data from table based on Id
const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/api/user/${_id}`);
        Swal.fire('Deleted!', 'Your user has been deleted.', 'success');

        // Update the users state to remove the deleted user
        setUsers(users.filter(user => user._id !== _id));

      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire('Error!', 'Failed to delete the user. Please try again.', 'error');
      }
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
};


return (
    <div>
        <Navbar />
        <div className="flex ">
            <ASidebar />
            <div className="bg-gray-100 p-10 w-screen">
                <div className="mb-8 text-start font-semibold text-xl">
                    <SectionTitle heading="All Users" searchTerm={searchTerm} handleSearch={handleSearch} />
                </div>
                <div className="p-8 bg-white shadow-sm">
                    {/* Add a scrollable container */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-0.5 px-2 text-center border-b">Serial</th>
                                    <th className="py-0.5 px-2 text-center border-b">UserId</th>
                                    <th className="py-0.5 px-2 text-center border-b">Name</th>
                                    <th className="py-0.5 px-2 text-center border-b">Email</th>
                                    <th className="py-0.5 px-2 text-center border-b">Phone</th>
                                    <th className="py-0.5 px-2 text-center border-b">Role</th>
                                    <th className="py-0.5 px-2 text-center border-b">Action</th>
                                    <th className="py-0.5 px-2 text-center border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className="py-0.5 px-2 text-center border-b">{index + 1}</td>
                                        <td className="py-0.5 px-2 text-center border-b">{user._id}</td>
                                        <td className="py-0.5 px-2 text-center border-b">{user.name}</td>
                                        <td className="py-0.5 px-2 text-center border-b">{user.email}</td>
                                        <td className="py-0.5 px-2 text-center border-b">{user.number}</td>
                                        <td className="py-0.5 px-2 text-center border-b">{user.role}</td>
                                        <td className="py-0.5 px-2 text-center border-b">
                                            <Link to={`/adminboard/update-user/${user._id}`}>
                                                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Edit</button>
                                            </Link>
                                        </td>
                                        <td className="py-0.5 px-2 text-center border-b">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default UserDisplay;
