import useUpdateEducationModal from "@/app/hooks/useUpdateEducationModal";
import { Education } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EducationForm from "./education-form";
import Modal from "./modal";

interface Props {
  educationData?: Education;
}

const UpdateEducationModal = ({ educationData }: Props) => {
  const updateEducationModal = useUpdateEducationModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialData = {
    start_date: educationData?.start_date,
    end_date: educationData?.end_date,
    major: educationData?.major,
    university: educationData?.university,
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
        major: formData.major,
        university: formData.university,
      };

      if (!educationData?.id) {
        throw new Error("Education ID is missing");
      }

      const response = await axios.put(
        `/api/profile/educations/${educationData.id}`,
        updateData,
      );

      if (response.status === 200) {
        toast.success("Education updated successfully");
        updateEducationModal.onClose();
        router.refresh();
      } else {
        toast.error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    updateEducationModal.onClose();
  };

  const bodyContent = <EducationForm register={register} errors={errors} />;
  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={
          updateEducationModal.currentEducation?.id === educationData?.id &&
          updateEducationModal.isOpen
        }
        onClose={updateEducationModal.onClose}
        title="Update Education"
        actionLabel={isLoading ? "Updating" : "Update"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default UpdateEducationModal;
