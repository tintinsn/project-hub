"use client";
import React, { useState } from "react";
import Input from "../input";
import { Control, FieldError, FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import InputFile from "../input-file";
import InputTextarea from "../input-textarea";

interface ExperienceFormProps {
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const ExperienceForm = ({register,errors}:ExperienceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      {/* Start Date */}
      <div className="sm:col-span-3">
        <Input
          type="date"
          label="Start Date"
          id="start_date"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
      {/* End Date */}
      <div className="sm:col-span-3">
        <Input
          type="date"
          label="End Date"
          id="end_date"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
      {/* Job Title */}
      <div className="sm:col-span-6">
        <Input
          label="Job Title"
          id="job_title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* Company Name */}
      <div className="sm:col-span-3">
        <Input
          label="Company Name"
          id="company_name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* Company Location */}
      <div className="sm:col-span-3">
        <Input
          label="Company Location"
          id="company_location"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* Description */}
      <div className="sm:col-span-6">
        <InputTextarea
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default ExperienceForm;
