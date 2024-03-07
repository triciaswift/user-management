import { useState } from "react";
import { User } from "../../types/User";
import { FormInput } from "../../utils/FormInput";
import ReactDatePicker from "react-datepicker";
import { states } from "../../utils/states";

interface UserFormProps {
  initialValues: User;
  onSave: (user: User) => void;
}

export const UserForm = ({ initialValues, onSave }: UserFormProps) => {
  // form state
  const [user, setUser] = useState<User>(initialValues);
  const [startDate, setStartDate] = useState<Date | null>(
    initialValues.birthDate ? new Date(initialValues.birthDate) : null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validates the form fields aren't empty...could also use the required property
  const validate = (): boolean => {
    let isValid = true;
    let errors: Record<string, string> = {};

    // Check for empty fields
    if (!user.firstName) {
      isValid = false;
      errors.firstName = "First name is required";
    }
    if (!user.lastName) {
      isValid = false;
      errors.lastName = "Last name is required";
    }
    if (!user.email) {
      isValid = false;
      errors.email = "Email is required";
    }
    if (!user.birthDate) {
      isValid = false;
      errors.birthDate = "Date of birth is required";
    }
    if (!user.address?.address) {
      isValid = false;
      errors.address = "Street address is required";
    }
    if (!user.address?.city) {
      isValid = false;
      errors.city = "City is required";
    }
    if (!user.address?.postalCode.match(/^[0-9]{5}(-[0-9]{4})?$/)) {
      isValid = false;
      errors.postalCode = "Postal code is invalid";
    }
    if (!user.address?.state) {
      isValid = false;
      errors.state = "State is required";
    } else {
      // Update this to check the birthDate state
      const minDate = new Date("1900-01-01");
      const maxDate = new Date("2100-12-31");
      const birthDate = new Date(user.birthDate);
      if (birthDate < minDate || birthDate > maxDate) {
        isValid = false;
        errors.birthDate =
          "Date of birth must be between 01-01-1900 and 12-31-2100";
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name in user.address) {
      setUser((currentUser) => ({
        ...currentUser,
        address: {
          ...currentUser.address,
          [name]: value,
        },
      }));
    } else {
      setUser((currentUser) => ({
        ...currentUser,
        [name]: value,
      }));
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      await onSave(user);
    }
  };

  const form = () => {
    if (user && user.address) {
      return (
        <form
          className="user-form border w-full max-w-lg mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSave}
        >
          <h2 className="user-form-title text-2xl font-bold text-center mb-4 text-gray-800">
            {initialValues.id ? "Edit User" : "New User"}
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
              error={errors.firstName}
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
              error={errors.lastName}
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
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>

          {/* date of birth */}
          <div className="mb-4">
            <label htmlFor="birthDate" className="text-gray-700">
              Date of birth:{" "}
            </label>
            <ReactDatePicker
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
                const localDate = new Date(date.setHours(0, 0, 0, 0));
                setUser({
                  ...user,
                  birthDate: localDate.toISOString().split("T")[0],
                });
              }}
              dateFormat={"yyyy-MM-dd"}
              maxDate={new Date("2100-12-31")}
              minDate={new Date("1900-01-01")}
              wrapperClassName="w-full"
              className="form-control"
              placeholderText="Date of birth"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-xs italic">{errors.birthDate}</p>
            )}
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
                  value={user.address.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  error={errors.address}
                />
              </div>

              <div>
                <label htmlFor="city" className="text-gray-700">
                  City:{" "}
                </label>
                <FormInput
                  name="city"
                  type="text"
                  value={user.address.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  error={errors.city}
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="text-gray-700">
                  Postal Code:{" "}
                </label>
                <FormInput
                  name="postalCode"
                  type="text"
                  value={user.address.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  error={errors.postalCode}
                />
              </div>

              <div>
                <label htmlFor="state" className="text-gray-700">
                  State:{" "}
                </label>
                <select
                  id="state"
                  name="state"
                  value={user.address.state}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs italic">{errors.state}</p>
                )}
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
