const BASE_URL = "https://dummyjson.com/users";

export const getAllUsers = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
