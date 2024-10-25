import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  placeholder?: string;
}

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  required = false,
  register,
  errors,
  placeholder,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="mb-1 block text-start text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        <span className="ml-1 text-lg text-red-500">*</span>
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-start text-sm font-light text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder={placeholder || " "}
        />
      </div>
    </>
  );
};

export default Input;
