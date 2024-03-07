type FormInputProps = {
  type: "text" | "radio" | "email";
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  autoFocus?: boolean;
};

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  checked,
  autoFocus,
}: FormInputProps) => {
  switch (type) {
    case "radio":
      return (
        <input
          id={name}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="form-radio text-indigo-600"
          required
        />
      );
    case "email":
      return (
        <input
          id={name}
          name={name}
          className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={value}
          onChange={onChange}
          required
        />
      );
    default:
      return (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          required
          autoFocus={autoFocus}
        />
      );
  }
};
