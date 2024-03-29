import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAllUsers } from "../../services/userService";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";

// The UserList component displays a list of users
export const UserList = () => {
  // State to hold the list of users.
  const [users, setUsers] = useState<User[]>([]);
  // State to track the loading status for asynchronous operations.
  const [loading, setLoading] = useState<boolean>(false);
  // State to store any errors that occur during data fetching.
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Effect hook to fetch user data on component mount.
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsers();
        // Set the first 20 users to state.
        setUsers(usersData.users.slice(0, 20));
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render a loading state UI when fetching data.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-xl text-blue-600 font-semibold">Loading...</p>
      </div>
    );
  }

  // Render an error message if data fetching fails.
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="error-message text-red-500 text-lg font-semibold">
          {error}
        </p>
      </div>
    );
  }

  // Renders the list of users
  return (
    <section className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Welcome to User Management!
      </h1>
      <div className="flex justify-center mb-8">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-16 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
          onClick={() => {
            navigate(`/newUser`);
          }}
        >
          Add User
        </button>
      </div>
      <ul className="user--list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
