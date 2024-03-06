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

  return res;
};
