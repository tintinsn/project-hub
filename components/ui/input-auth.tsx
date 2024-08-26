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

const InputAuth = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors = {},
}: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required: true })}
        className={`peer w-full rounded-md border-2 border-opacity-100 bg-white px-4 pb-2 pt-6 text-gray-950 outline-none transition disabled:cursor-not-allowed disabled:bg-opacity-70 ${errors[id] ? "border-red-500" : "border-gray-200"} ${errors[id] ? "focus:border-red-500" : "focus:border-black"}`}
      />
      <label
        // peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 ---> กรณีที่ไม่ได้คลิกที่ input field
        //  peer-focus:-translate-y-3 peer-focus:scale-75 ----> กรณีที่คลิก input field
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3 transform text-base duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 ${errors[id] ? "text-red-500" : "text-gray-500"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputAuth;
