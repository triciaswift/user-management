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
        <form
          className="user-form border w-full max-w-lg mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSave}
        >
          <h2 className="user-form-title text-2xl font-bold text-center mb-4 text-gray-800">
            Edit User
          </h2>

          {/* first name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="text-gray-700">
              First Name:{" "}
            </label>
            <FormInput
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              autoFocus={true}
            />
          </div>

          {/* last name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="text-gray-700">
              Last Name:{" "}
            </label>
            <FormInput
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">
              Email:{" "}
            </label>
            <FormInput
              name="email"
              value={user.email}
              type="text"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>

          {/* date of birth */}
          <div className="mb-4">
            <label htmlFor="birthDate" className="text-gray-700">
              Date of birth:{" "}
            </label>
            <FormInput
              name="birthDate"
              value={user.birthDate}
              type="text"
              placeholder="Date of birth"
              onChange={handleInputChange}
            />
          </div>

          {/* gender */}
          <fieldset className="mb-4">
            <legend className="text-gray-700 text-sm font-bold mb-2">
              Gender:
            </legend>
            <div className="flex items-center gap-4">
              <label htmlFor="male" className="inline-flex items-center">
                <FormInput
                  name="gender"
                  type="radio"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Male</span>
              </label>
              <label htmlFor="female" className="inline-flex items-center">
                <FormInput
                  name="gender"
                  type="radio"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </fieldset>

          {/* Address */}
          <div className="mb-6">
            <legend className="block text-gray-700 font-bold mb-2">
              Address:
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="text-gray-700">
                  Street:{" "}
                </label>
                <FormInput
                  name="address"
                  type="text"
                  value={user.address?.address || ""}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                />
              </div>

              <div>
                <label htmlFor="city" className="text-gray-700">
                  City:{" "}
                </label>
                <FormInput
                  name="city"
                  type="text"
                  value={user.address?.city || ""}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="text-gray-700">
                  Postal Code:{" "}
                </label>
                <FormInput
                  name="postalCode"
                  type="text"
                  value={user.address?.postalCode || ""}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                />
              </div>

              <div>
                <label htmlFor="state" className="text-gray-700">
                  State:{" "}
                </label>
                <FormInput
                  name="state"
                  type="text"
                  value={user.address?.state || ""}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </div>
            </div>
          </div>
          <button
            className="btn w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      );
    }
  };

  return <section className="mt-10">{form()}</section>;
};
