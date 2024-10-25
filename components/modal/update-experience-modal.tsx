import useUpdateExperienceModal from "@/app/hooks/useUpdateExperienceModal";
import Modal from "./modal";
import { useState } from "react";
import ExperienceForm from "./experience-form";
import { Experience } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  experienceData?: Experience;
}

const UpdateExperienceModal = ({ experienceData }: Props) => {
  const updateExperienceModal = useUpdateExperienceModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialData = {
    start_date: experienceData?.start_date,
    end_date: experienceData?.end_date,
    job_title: experienceData?.job_title,
    company_name: experienceData?.company_name,
    company_location: experienceData?.company_location,
    description: experienceData?.description,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData,
  });

  const onSubmit = async (formData: FieldValues) => {
    setIsLoading(true);
    try {
      const updateData = {
        start_date: formData.start_date,
        end_date: formData.end_date,
        job_title: formData.job_title,
        company_name: formData.company_name,
        company_location: formData.company_location,
        description: formData.description,
      };

      if (!experienceData?.id) {
        throw new Error("Experience ID is missing");
      }

     
      const response = await axios.put(
        `/api/profile/experiences/${experienceData.id}`,
        updateData,
      );

      if (response.status === 200) {
        toast.success("Experience updated successfully");
        updateExperienceModal.onClose();
        router.refresh();
      } else {
        toast.error("Failed to update experience");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    updateExperienceModal.onClose();
  };

  const bodyContent = <ExperienceForm register={register} errors={errors} />;
  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={
          updateExperienceModal.isOpen &&
          updateExperienceModal.currentExperience?.id === experienceData?.id
        }
        onClose={updateExperienceModal.onClose}
        title="Update Experience"
        actionLabel={isLoading ? "Updating" : "Update"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default UpdateExperienceModal;
