// Interface representing a user.
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  email: string;
  birthDate: string;
  image?: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
}
