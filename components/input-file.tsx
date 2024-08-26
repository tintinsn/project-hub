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
      <input
        id={id}
        type={type}
        {...register(id)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 file:me-4 file:border-0 file:bg-gray-900 file:px-4 file:py-3 file:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
      />
      {/* <div className="relative flex items-center justify-between rounded-lg border border-gray-300 p-2.5">
        <span className="text-sm font-light text-gray-900">{label}</span>
        <label className="absolute right-3 cursor-pointer">
          <span className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-light text-white">
            <MdCloudUpload className="fill-white" />
            <span className="lg:hidden xl:block">Upload file</span>
          </span>
          <input
            id={id}
            type={type}
            className="sr-only"
            {...register(id)}
            disabled={disabled}
          />
        </label>
      </div> */}
    </>
  );
};

export default InputFile;
