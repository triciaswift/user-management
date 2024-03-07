import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAllUsers } from "../../services/userService";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsers();
        setUsers(usersData.users.slice(0, 20));
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-xl text-blue-600 font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="error-message text-red-500 text-lg font-semibold">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Welcome to User Management!
      </h1>
      <ul className="user--list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
