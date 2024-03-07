import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { addUser } from "../../services/userService";
import { UserForm } from "./UserForm";

// The CreateUser component handles the creation of a new user.
export const CreateUser = () => {
  // State for the new user being created, initialized with default values.
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

  // State to control the loading spinner when the user creation is in progress.
  const [loading, setLoading] = useState(false);

  // State to store any error messages that may occur during user creation.
  const [error, setError] = useState<string | null>(null);

  // Hook to navigate programmatically after user creation.
  const navigate = useNavigate();

  // Handler function to create a new user when the form is submitted.
  const handleCreateUser = async (newUser: User) => {
    // Exclude the id property from the new user object, as it's not needed for creation.
    const { id, ...newUserInfo } = newUser;
    setLoading(true);
    try {
      // Call the addUser service function to persist the new user data.
      await addUser(newUserInfo);
      alert("New user was successfully created!");
      // Navigate back to the user list upon successful creation.
      navigate(`/`);
    } catch (error) {
      console.error("Failed to create user:", error);
      setError("Failed to create user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Display a loading message while the user creation is in progress.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="loading-message text-lg font-semibold">
          Creating User...
        </p>
      </div>
    );
  }

  // If an error occurs during user creation, display the error and provide a link to return to the user list.
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

  // Render the UserForm component passing the new user state and the creation handler function.
  return (
    <section className="flex flex-col items-center">
      <UserForm initialValues={user} onSave={handleCreateUser} />
      <Link
        to={`/`}
        className="mt-4 mb-10 text-blue-500 hover:text-blue-700 underline"
      >
        Return to list of users
      </Link>
    </section>
  );
};
