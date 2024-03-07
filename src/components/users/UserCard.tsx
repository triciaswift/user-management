import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

interface UserCardProp {
  user: User;
}

export const UserCard = ({ user }: UserCardProp) => {
  const navigate = useNavigate();

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
      </article>
    </li>
  );
};
