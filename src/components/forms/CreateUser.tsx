import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { addUser } from "../../services/userService";
import { UserForm } from "./UserForm";

export const CreateUser = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    address: {
      address: "",
      city: "",
      postalCode: "",
      state: "",
    },
  } as User);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCreateUser = async (newUser: User) => {
    if (newUser) {
      const { id, ...newUserInfo } = newUser;
      setLoading(true);
      try {
        await addUser(newUserInfo);
        alert("New user was successfully created!");
        navigate(`/`);
      } catch (error) {
        console.error("Failed to create user:", error);
        setError("Failed to create user. Please try again later.");
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
        <p className="loading-message text-lg font-semibold">
          Creating User...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="error-message text-red-500 text-lg font-semibold">
          {error}
        </p>
        <Link
          to="/"
          className="mt-4 text-blue-500 hover:text-blue-700 underline"
        >
          Return to list of users
        </Link>
      </div>
    );
  }

  return <UserForm initialValues={user} onSave={handleCreateUser} />;
};
