import { User } from "../types/User";

const BASE_URL = "https://dummyjson.com/users";

const checkResponseStatus = (res: Response) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res;
};

export const getAllUsers = async () => {
  const res = await fetch(BASE_URL).then(checkResponseStatus);
  return res.json();
};

export const getUserById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`).then(checkResponseStatus);
  return res.json();
};

export const editUser = async (user: User) => {
  const res = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(checkResponseStatus);
  console.log("Updating user:", user);
  return res;
};

// mock functionality
export const addUser = async (user: User) => {
  console.log("Adding user:", user);
  return Promise.resolve({ ...user, id: 31 });
};

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
