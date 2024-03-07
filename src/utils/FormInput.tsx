type FormInputProps = {
  type: "text" | "radio" | "email";
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  autoFocus?: boolean;
  error?: string;
};

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  checked,
  autoFocus,
  error,
}: FormInputProps) => {
  let inputElement;

  switch (type) {
    case "radio":
      inputElement = (
        <input
          id={name}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="form-radio text-indigo-600"
          // required
        />
      );
      break;
    case "email":
      inputElement = (
        <input
          id={name}
          name={name}
          className="form-control"
          type="email"
          value={value}
          onChange={onChange}
          // required
        />
      );
      break;
    default:
      inputElement = (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          // required
          autoFocus={autoFocus}
        />
      );
      break;
  }

  return (
    <div>
      {inputElement}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};
