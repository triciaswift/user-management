type FormInputProps = {
  type: "text" | "radio";
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
};

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  checked,
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
          required
        />
      );
    case "text":
    default:
      return (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          required
        />
      );
  }
};
