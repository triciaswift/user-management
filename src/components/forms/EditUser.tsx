import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import { editUser, getUserById } from "../../services/userService";
import { UserForm } from "./UserForm";

// The EditUser component is responsible for fetching and displaying a form pre-populated with a user's data for editing.
export const EditUser = () => {
  // Extracts userId from the URL parameters.
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // State for storing the user details.
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch the user details when the component mounts or when the userId changes.
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setLoading(true);
        try {
          const numericUserId = parseInt(userId);
          // Check if the userId parsed to a valid number.
          if (!isNaN(numericUserId)) {
            // Fetch user data using the numericUserId.
            const userData = await getUserById(numericUserId);
            setUser(userData);
          } else {
            // Throw an error if userId is not a number.
            throw new Error("User ID must be a number");
          }
        } catch (error) {
          setError("Failed to fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId]);

  // Function to handle save action on user form submission.
  const handleUserSave = async (updatedUser: User) => {
    // Ensure that updatedUser is provided and contains an id.
    if (updatedUser && updatedUser.id !== undefined) {
      setLoading(true);
      try {
        await editUser(updatedUser);
        alert("User's information was updated successfully!");
        navigate(`/`);
      } catch (error) {
        setError("Failed to save user. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("No user data to save.");
    }
  };

  // Display a loading message while the user update is in progress.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="loading-message text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // If an error occurs during user update, display the error and provide a link to return to the user list.
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

  // Render the UserForm for editing, passing in the user state and the save handler.
  return (
    <section className="flex flex-col items-center">
      <UserForm initialValues={user} onSave={handleUserSave} />
      <Link
        to={`/`}
        className="mt-4 mb-10 text-blue-500 hover:text-blue-700 underline"
      >
        Return to list of users
      </Link>
    </section>
  );
};
