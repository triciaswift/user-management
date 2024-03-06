import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAllUsers } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
    return <p>Loading...</p>;
  }

  if (error) return <p className="error-message text-red-500">{error}</p>;

  return (
    <section>
      <h1>Welcome to User Management!</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-info">
            <article
              className="user-card cursor-pointer"
              onClick={() => {
                navigate(`/${user.id}/edit`);
              }}
            >
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="user-image"
              />
              <div>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p className="user-email">{user.email}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
