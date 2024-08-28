"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../heading";
import Modal from "./modal";

import useUpdateModal from "@/app/hooks/useUpdateModal";
import { Project } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SelectedOption } from "../create-form";
import Input from "../input";
import InputFile from "../input-file";
import InputTextarea from "../input-textarea";
import MultiSelectTech from "../ui/multi-select";
import toast from "react-hot-toast";
import { uploadImage } from "@/app/libs/cloudinary";

interface UpdateModalProps {
  data: Project;
}

const UpdateModal = ({ data }: UpdateModalProps) => {
  const [selectedTechStack, setSelectedTechStack] = useState<SelectedOption[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const updateModal = useUpdateModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: data.title,
      imageUrl: data.imageUrl,
      description: data.description,
      technologies: data.technologies,
      projectUrl: data.projectUrl,
      githubRepoUrl: data.githubRepoUrl,
    },
  });

  useEffect(() => {
    setValue(
      "technologies",
      selectedTechStack.map((tech) => tech.value),
    );
  }, [selectedTechStack, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues,
  ) => {
    console.log(formData);
    setIsLoading(true);

    let imageUrl = formData.imageUrl;

    if (formData.imageFile && formData.imageFile[0]) {
      const file = formData.imageFile[0] as File;
      imageUrl = await uploadImage(file);
      console.log(imageUrl);
    } else if (!imageUrl) {
      if (formData.projectUrl) {
        try {
          const response = await axios.post("/api/screenshot", {
            url: formData.projectUrl,
          });
          const responseUrl = /'(.+)'/.exec(response.data.imageUrl);
          if (responseUrl && responseUrl[1]) {
            imageUrl = responseUrl[1];
          } else {
            throw new Error("Invalid screenshot URL");
          }
        } catch (error) {
          console.error("Error generating screenshot:", error);
          toast.error("Failed to generate project screenshot");
          return;
        }
      } else if (formData.githubRepoUrl) {
        const repoName = formData.githubRepoUrl?.split("github.com/")[1];
        imageUrl = `https://opengraph.githubassets.com/1/${repoName}`;
      }
    }

    const updateData = {
      title: formData.title,
      imageUrl,
      description: formData.description,
      technologies: formData.technologies,
      projectUrl: formData.projectUrl,
      githubRepoUrl: formData.githubRepoUrl,
    };
    console.log(updateData);

    try {
      const response = await axios.put(`/api/projects/${data.id}`, updateData);
      if (response.status === 200) {
        const updatedProject = response.data;
        console.log("Updated Project:", updatedProject);

        updateModal.onClose();
        router.refresh();
      } else {
        console.error("Failed to update project");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while updating the project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    updateModal.onClose();
  };

  const bodyContent = (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <Heading title="Update your project" />
      </div>
      
      <div className="sm:col-span-3">
        <Input
          label="Project Name"
          id="title"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <div className="sm:col-span-3">
        <InputFile
          id="imageFile"
          label="Project Image"
          register={register}
          disabled={isLoading}
          errors={errors}
        />
      </div>

      <div className="sm:col-span-6">
        <InputTextarea
          id="description"
          label="Project Description"
          register={register}
          disabled={isLoading}
          errors={errors}
        />
      </div>
      <div className="sm:col-span-6">
        <label
          htmlFor="technologies"
          className="mb-3 block text-start text-xl font-medium leading-6 text-gray-900"
        >
          Technology Stack
        </label>

        <MultiSelectTech
          setSelectedTechStack={setSelectedTechStack}
          updateTechStack={data.technologies}
        />
      </div>
      <div className="sm:col-span-3">
        <Input
          label="Project Link"
          id="projectUrl"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <div className="sm:col-span-3">
        <Input
          label="GitHub Repository"
          id="githubRepoUrl"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={updateModal.isOpen}
        onClose={updateModal.onClose}
        title="Update"
        actionLabel="Update"
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default UpdateModal;
