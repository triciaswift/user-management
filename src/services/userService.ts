import { User } from "../types/User";

// Base URL for the users API
const BASE_URL = "https://dummyjson.com/users";

// Fetches all users from the API.
export const getAllUsers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// Fetches a single user by their ID.
export const getUserById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

// Updates a user's information.
export const editUser = async (user: User) => {
  const res = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log("Updating user:", user);
  return res;
};

// Adds a new user. (This is a mock function that simulates adding a user.)
export const addUser = async (user: User) => {
  console.log("Adding user:", user);
  return Promise.resolve({ ...user, id: 31 });
};

// Deletes a user by their ID. (This is a mock function that simulates deletion.)
export const deleteUser = async (id: number) => {
  console.log("Deleting user with id:", id);
  return Promise.resolve({ id });
};

/* -----What the actual requests would have looked like----- */

//* add user

// export const addUser = async (user: User) => {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   }).then(checkResponseStatus);

//   return res;
// };

//* delete user

// export const deleteItem = (id: number) => {
//   return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
// };
