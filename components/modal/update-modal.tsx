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
  const [imageSource, setImageSource] = useState<
    "current" | "upload" | "project" | "github"
  >("current");

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

  console.log(imageSource);

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues,
  ) => {
    setIsLoading(true);

    let imageUrl = data.imageUrl;
    console.log(imageUrl);

    try {
      switch (imageSource) {
        case "upload":
          if (formData.imageFile && formData.imageFile[0]) {
            imageUrl = await uploadImage(formData.imageFile[0]);
          } else {
            throw new Error(
              'Please upload image when you select "Upload New Image" from image source',
            );
          }
          break;
        case "project":
          if (formData.projectUrl) {
            const response = await axios.post("/api/screenshot", {
              url: formData.projectUrl,
            });
            const responseUrl = /'(.+)'/.exec(response.data.imageUrl);
            if (responseUrl && responseUrl[1]) {
              imageUrl = responseUrl[1];
            } else {
              throw Error("Invalid screenshot URL");
            }
          } else {
            throw new Error(
              'Project URL is required when you select "Generate from Project URL" from image source ',
            );
          }
          break;
        case "github":
          if (formData.githubRepoUrl) {
            const repoName = formData.githubRepoUrl.split("github.com/")[1];
            imageUrl = `https://opengraph.githubassets.com/1/${repoName}`;
          } else {
            throw new Error(
              'GitHub repo is required when you select "Use GitHub Repository Image" from image source ',
            );
          }
          break;
      }

      console.log(imageUrl);

      const updateData = {
        title: formData.title,
        imageUrl,
        description: formData.description,
        technologies: formData.technologies,
        projectUrl: formData.projectUrl,
        githubRepoUrl: formData.githubRepoUrl,
      };

      const response = await axios.put(`/api/projects/${data.id}`, updateData);
      if (response.status === 200) {
        // const updatedProject = response.data;
        toast.success("Update project successfully!");

        updateModal.onClose();
        router.refresh();
      } else {
        toast.error("Failed to update project");
        setIsLoading(false);
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
    updateModal.onClose();
  };

  const bodyContent = (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label className="mb-1 block text-sm font-medium text-gray-900">
          Image Source
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-start text-sm font-light text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          value={imageSource}
          onChange={(e) =>
            setImageSource(
              e.target.value as "current" | "upload" | "project" | "github",
            )
          }
        >
          <option value="current">Use Current Image</option>
          <option value="upload">Upload New Image</option>
          <option value="project">Generate from Project URL</option>
          <option value="github">Use GitHub Repository Image</option>
        </select>
      </div>
      <div
        className={imageSource === "upload" ? "sm:col-span-3" : "sm:col-span-6"}
      >
        <Input
          label="Project Name"
          id="title"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      {imageSource === "upload" && (
        <div className="sm:col-span-3">
          <InputFile
            id="imageFile"
            label="Project Image"
            register={register}
            disabled={isLoading}
            errors={errors}
          />
        </div>
      )}

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
          className="mb-1 block text-start text-sm font-medium leading-6 text-gray-900"
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
          label="Gitbub Repository"
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
        actionLabel={isLoading? "Updating" : "Update"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default UpdateModal;
