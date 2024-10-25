"use client";
import Modal from "./modal";
import { useState } from "react";
import ExperienceForm from "./experience-form";
import useCreateExperienceModal from "@/app/hooks/useCreateExperienceModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

const initialData = {
  start_date: "",
  end_date: "",
  job_title: "",
  company_name: "",
  company_location: "",
  description: "",
};

const CreateExperienceModal = () => {
  const createExperienceModal = useCreateExperienceModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues,
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/profile/experiences", formData);

      toast.success("Experience added successfully");
      createExperienceModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    createExperienceModal.onClose();
  };

  const bodyContent = <ExperienceForm register={register} errors={errors} />;

  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={createExperienceModal.isOpen}
        onClose={createExperienceModal.onClose}
        title="Create Experience"
        actionLabel={isLoading ? "Creating" : "Create"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default CreateExperienceModal;
