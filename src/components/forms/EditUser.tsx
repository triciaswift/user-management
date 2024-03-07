import { Link, useParams } from "react-router-dom";
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import { editUser, getUserById } from "../../services/userService";
import { UserForm } from "./UserForm";

export const EditUser = () => {
  const { userId } = useParams<{ userId: string }>();

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleUserSave = async () => {
    if (user) {
      try {
        setLoading(true);
        await editUser(user);
        setSuccessMessage("User's information was updated successfully!"); // Set the success message
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

  if (successMessage) {
    // If there is a success message, render it instead of the form
    return (
      <section className="flex flex-col justify-center items-center h-screen">
        <div
          className="success-message flex flex-col items-center bg-green-100 border-green-700 border-2 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{successMessage}</span>
        </div>
        <Link
          to={`/`}
          className="mt-4 text-blue-500 hover:text-blue-700 underline"
        >
          Return to list of users
        </Link>
      </section>
    );
  }

  return (
    <UserForm
      initialValues={user}
      onSave={handleUserSave}
      setLoading={setLoading}
    />
  );
};
