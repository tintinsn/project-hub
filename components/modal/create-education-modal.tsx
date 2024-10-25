"use client";
import useCreateEducationModal from "@/app/hooks/useCreateEducationModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EducationForm from "./education-form";
import Modal from "./modal";

const initialData = {
  start_date: "",
  end_date: "",
  major: "",
  university: "",
};

const CreateEducationModal = () => {
  const createEducationModal = useCreateEducationModal();
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
      const response = await axios.post("/api/profile/educations", formData);
      toast.success("Education added successfully");
      createEducationModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    createEducationModal.onClose();
  };

  const bodyContent = <EducationForm register={register} errors={errors} />;

  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={createEducationModal.isOpen}
        onClose={createEducationModal.onClose}
        title="Create Education"
        actionLabel={isLoading ? "Creating" : "Create"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default CreateEducationModal;
