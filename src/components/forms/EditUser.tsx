import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import { editUser, getUserById } from "../../services/userService";
import { UserForm } from "./UserForm";

export const EditUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setLoading(true);
        try {
          const numericUserId = parseInt(userId);
          // take out the if/else statement later
          if (!isNaN(numericUserId)) {
            const userData = await getUserById(numericUserId);
            setUser(userData);
          } else {
            throw new Error("User ID must be a number");
          }
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setError("Failed to fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleUserSave = async (updatedUser: User) => {
    if (updatedUser && updatedUser.id !== undefined) {
      setLoading(true);
      try {
        await editUser(updatedUser);
        alert("User's information was updated successfully!");
        navigate(`/`);
      } catch (error) {
        console.error("Failed to save user:", error);
        setError("Failed to save user. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("No user data to save.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="loading-message text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="error-message text-red-500 text-lg font-semibold">
          {error}
        </p>
        <Link
          to={`/`}
          className="mt-4 text-blue-500 hover:text-blue-700 underline"
        >
          Return to list of users
        </Link>
      </div>
    );

  return (
    <UserForm
      initialValues={user}
      onSave={handleUserSave}
      setLoading={setLoading}
    />
  );
};
