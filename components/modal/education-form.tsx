"use client";
import React, { useState } from "react";
import Input from "../input";
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";

import InputTextarea from "../input-textarea";

interface EducationFormProps {
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const EducationForm = ({ register, errors }: EducationFormProps) => {
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
      {/* Major */}
      <div className="sm:col-span-3">
        <Input
          label="Major"
          id="major"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      {/* University */}
      <div className="sm:col-span-3">
        <Input
          label="University"
          id="university"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    </div>
  );
};

export default EducationForm;
