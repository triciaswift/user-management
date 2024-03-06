import { ChangeEvent, useState } from "react";
import { User } from "../../types/User";
import { FormInput } from "../../utils/FormInput";

interface UserFormProps {
  initialValues: User; // This will either be an empty User object or a populated one
  onSave: (user: User) => void; // A callback to handle saving the user
  setLoading: (loading: boolean) => void;
}

export const UserForm = ({
  initialValues,
  onSave,
  setLoading,
}: UserFormProps) => {
  // form state
  const [user, setUser] = useState<User>(initialValues);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((currentUser) => {
      if (
        name === "address" ||
        name === "city" ||
        name === "postalCode" ||
        name === "state"
      ) {
        return {
          ...currentUser,
          address: {
            ...currentUser.address,
            [name]: value,
          },
        };
      }

      return {
        ...currentUser,
        [name]: value,
      };
    });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await onSave(user);
    setLoading(false);
  };

  const form = () => {
    if (user) {
      return (
        <form className="user-form" onSubmit={handleSave}>
          <h2 className="user-form-title">Edit User</h2>
          <fieldset>
            <label htmlFor="firstName">First Name: </label>
            <input
              id="firstName"
              name="firstName"
              value={user.firstName}
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={handleInputChange}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <label htmlFor="lastName">Last Name: </label>
            <FormInput
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email: </label>
            <FormInput
              name="email"
              value={user.email}
              type="text"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="birthDate">Date of birth: </label>
            <FormInput
              name="birthDate"
              value={user.birthDate}
              type="text"
              placeholder="Date of birth"
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>Gender</legend>
            <label htmlFor="male">Male </label>
            <FormInput
              name="gender"
              type="radio"
              value="male"
              checked={user.gender === "male"}
              onChange={handleInputChange}
            />
            <input />
            <label htmlFor="female">Female </label>
            <FormInput
              name="gender"
              type="radio"
              value="female"
              checked={user.gender === "female"}
              onChange={handleInputChange}
            />
            <input />
          </fieldset>
          <fieldset>
            <legend>Address</legend>

            <label htmlFor="address">Address: </label>
            <FormInput
              name="address"
              type="text"
              value={user.address?.address || ""}
              onChange={handleInputChange}
              placeholder="Street Address"
            />

            <label htmlFor="city">City: </label>
            <FormInput
              name="city"
              type="text"
              value={user.address?.city || ""}
              onChange={handleInputChange}
              placeholder="City"
            />

            <label htmlFor="postalCode">Postal Code: </label>
            <FormInput
              name="postalCode"
              type="text"
              value={user.address?.postalCode || ""}
              onChange={handleInputChange}
              placeholder="Postal Code"
            />

            <label htmlFor="state">State: </label>
            <FormInput
              name="state"
              type="text"
              value={user.address?.state || ""}
              onChange={handleInputChange}
              placeholder="State"
            />
          </fieldset>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      );
    }
  };

  return <>{form()}</>;
};
