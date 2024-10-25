import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "./input";
import InputTextarea from "./input-textarea";
import { Dispatch, SetStateAction, useState } from "react";
import InputFile from "./input-file";
import MultiSelectTech from "./ui/multi-select";
import { SelectedOption } from "./create-form";

interface UserInfoFormProps {
  imageSource: string;
  setImageSource: Dispatch<SetStateAction<"current" | "upload" | "random">>;
  setSelectedTechStack: (selected: SelectedOption[]) => void;
  technicalSkills: string[] | [];
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const UserInfoForm = ({
  imageSource,
  setImageSource,
  setSelectedTechStack,
  technicalSkills,
  register,
  errors,
}: UserInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 overflow-auto sm:grid-cols-6">
      {/* First Name */}
      <div className="sm:col-span-6">
        <Input
          label="Name"
          id="name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* Image source */}
      <div
        className={imageSource === "upload" ? "sm:col-span-3" : "sm:col-span-6"}
      >
        <label className="mb-1 block text-start text-sm font-medium leading-6 text-gray-900">
          Image Source
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-start text-sm font-light text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          value={imageSource}
          onChange={(e) =>
            setImageSource(e.target.value as "current" | "upload" | "random")
          }
        >
          <option value="current">Use Current Image</option>
          <option value="upload">Upload New Image</option>
          <option value="random">Random From Robohash</option>
        </select>
      </div>
      {/* Image  */}
      {imageSource === "upload" && (
        <div className="sm:col-span-3">
          <InputFile
            id="imageFile"
            label="Avatar"
            register={register}
            disabled={isLoading}
            errors={errors}
          />
        </div>
      )}
      {/* Job Title */}
      <div className="sm:col-span-6">
        <Input
          label="Job Title"
          id="jobTitle"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* Bio */}
      <div className="sm:col-span-6">
        <InputTextarea
          id="bio"
          label="bio"
          register={register}
          disabled={isLoading}
          errors={errors}
        />
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="technologies"
          className="mb-1 block text-start text-sm font-medium leading-6 text-gray-900"
        >
          Technology Stack
        </label>

        <MultiSelectTech
          setSelectedTechStack={setSelectedTechStack}
          updateTechStack={technicalSkills}
        />
      </div>

      {/* github link */}
      <div className="sm:col-span-3">
        <Input
          label="Github Link"
          id="githubLink"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>

      {/* linkedin link */}
      <div className="sm:col-span-3">
        <Input
          label="Linkedin Link"
          id="linkedinLink"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>

      {/* Email */}
      <div className="sm:col-span-3">
        <Input
          label="Email"
          id="email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>

      {/* Phone Number */}
      <div className="sm:col-span-3">
        <Input
          label="Phone Number"
          id="phoneNumber"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>

      {/* Address  */}
      <div className="sm:col-span-6">
        <Input
          label="Address"
          id="address"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default UserInfoForm;
