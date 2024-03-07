import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { deleteUser } from "../../services/userService";

// Define the props expected by the UserCard component.
interface UserCardProp {
  user: User;
}

// The UserCard component displays a single user's information in a card format.
export const UserCard = ({ user }: UserCardProp) => {
  const navigate = useNavigate();

  // Render a list item for each user
  return (
    <li
      key={user.id}
      className="user--info bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <article
        className="user-card cursor-pointer flex flex-col items-center p-4 bg-gray-100 hover:bg-gray-200"
        onClick={() => {
          navigate(`/${user.id}/edit`);
        }}
      >
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-image mb-4 h-32 w-32 rounded-md object-cover"
        />
        <div className="text-center">
          <h2 className="user--name text-lg text-gray-900 font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="user--email text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          className="btn mt-8 bg-red-500 hover:bg-red-700 text-sm text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={async (event) => {
            event.stopPropagation();

            if (user.id !== undefined) {
              await deleteUser(user.id);
              alert(
                `${user.firstName} ${user.lastName} was successfully deleted.`
              );
            }
          }}
        >
          Delete
        </button>
      </article>
    </li>
  );
};
