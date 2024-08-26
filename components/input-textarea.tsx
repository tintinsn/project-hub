import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const InputTextarea = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="mb-3 block text-start text-xl font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative w-full">
        <textarea
          rows={4}
          cols={50}
          disabled={disabled}
          id={id}
          {...register(id, { required: true })}
          className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-start text-sm font-light text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder="Provide a brief overview of your project"
        />
      </div>
    </>
  );
};

export default InputTextarea;
