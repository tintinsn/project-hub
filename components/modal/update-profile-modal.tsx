"use client";
import useUpdateUserInfoModal from "@/app/hooks/useUpdateUserInfoModal";
import { useEffect, useState } from "react";
import UserInfoForm from "../user-info-form";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "./modal";
import { SelectedOption } from "../create-form";
import { uploadImage } from "@/app/libs/cloudinary";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserInfoType {
  userId: string;
  name: string | null;
  jobTitle: string | null;
  bio: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  image: string | null;
  technicalSkills: string[] | [];
}

interface UpdateUserInfoModalProps {
  userInfo: UserInfoType;
}

const UpdateUserInfoModal = ({ userInfo }: UpdateUserInfoModalProps) => {
  const updateUserInfoModal = useUpdateUserInfoModal();

  const [selectedTechStack, setSelectedTechStack] = useState<SelectedOption[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageSource, setImageSource] = useState<
    "current" | "upload" | "random"
  >("current");

  const router = useRouter();

  const initialData = {
    name: userInfo?.name,
    jobTitle: userInfo?.jobTitle,
    bio: userInfo?.bio,
    githubLink: userInfo?.githubLink,
    linkedinLink: userInfo?.linkedinLink,
    phoneNumber: userInfo?.phoneNumber,
    email: userInfo?.email,
    address: userInfo?.address,
    technicalSkills: userInfo?.technicalSkills,
    image: userInfo?.image,
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData,
  });

  useEffect(() => {
    setValue(
      "technicalSkills",
      selectedTechStack.map((tech) => tech.value),
    );
  }, [selectedTechStack, setValue]);

  const onSubmit = async (formData: FieldValues) => {
    setIsLoading(true);
    let image = formData.imageFile;

    try {
      switch (imageSource) {
        case "upload":
          if (formData.imageFile && formData.imageFile[0]) {
            image = await uploadImage(formData.imageFile[0]);
          } else {
            throw new Error(
              'Please upload image when you select "Upload New Image" from image source',
            );
          }
          break;
        case "random":
          image = `https://robohash.org/${formData.name || "default"}.png`;
          break;
      }

      const updateData = {
        userId: userInfo.userId,
        name: formData.name,
        jobTitle: formData.jobTitle,
        bio: formData.bio,
        githubLink: formData.githubLink,
        linkedinLink: formData.linkedinLink,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        technicalSkills: formData.technicalSkills,
        image,
      };
      const response = await axios.put(`/api/profile/user`, updateData);
      if (response.status === 200) {
        // const updatedProject = response.data;
        toast.success("Update project successfully!");
        updateUserInfoModal.onClose();
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    updateUserInfoModal.onClose();
  };

  const bodyContent = (
    <UserInfoForm
      imageSource={imageSource}
      setImageSource={setImageSource}
      setSelectedTechStack={setSelectedTechStack}
      technicalSkills={userInfo.technicalSkills}
      register={register}
      errors={errors}
    />
  );
  return (
    <div>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={updateUserInfoModal.isOpen}
        onClose={updateUserInfoModal.onClose}
        title="Update User Infomation"
        actionLabel={isLoading ? "Updating" : "Update"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </div>
  );
};

export default UpdateUserInfoModal;
