import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const InputFile = ({
  id,
  label,
  type = "file",
  disabled,
  required = false,
  register,
  errors,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="mb-1 block text-start text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          disabled={disabled}
          // className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 file:me-4 file:border-0 file:bg-gray-900 file:p-2.5 file:px-4 file:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          className="relative w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-start text-sm font-light text-gray-900 file:not-sr-only file:hidden focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:pointer-events-none disabled:opacity-50"
        />
        <label
          htmlFor={id}
          className="absolute right-2 top-2 w-fit cursor-pointer rounded-full bg-gray-900 px-3 py-1 text-xs font-light text-white"
        >
          Upload Image
        </label>
      </div>

    </>
  );
};

export default InputFile;
