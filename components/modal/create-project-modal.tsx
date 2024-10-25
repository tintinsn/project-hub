"use client";
import Modal from "./modal";
import { useEffect, useState } from "react";
import ExperienceForm from "./experience-form";
import useCreateExperienceModal from "@/app/hooks/useCreateExperienceModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { User } from "@prisma/client";
import useCreateProjectModal from "@/app/hooks/useCreateProjectModal";
import { uploadImage } from "@/app/libs/cloudinary";
import Input from "../input";
import InputFile from "../input-file";
import MultiSelectTech from "../ui/multi-select";
import InputTextarea from "../input-textarea";

interface CreateFormProps {
  user?: User | null;
}

export interface SelectedOption {
  value: string;
  label: string;
}

const initialData = {
  title: "",
  imageUrl: "",
  description: "",
  technologies: [],
  projectUrl: "",
  githubRepoUrl: "",
};

const CreateProjectModal = ({ user }: CreateFormProps) => {
  const creatProjectModal = useCreateProjectModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<SelectedOption[]>(
    [],
  );
  const [imageSource, setImageSource] = useState<
    "upload" | "project" | "github"
  >("project");

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    let imageUrl = data.imageUrl;

    try {
      switch (imageSource) {
        case "upload":
          if (data.imageFile && data.imageFile[0]) {
            imageUrl = await uploadImage(data.imageFile[0]);
          } else {
            throw new Error(
              'Please upload image when you select "Upload New Image" from image source',
            );
          }
          break;
        case "project":
          if (data.projectUrl) {
            const response = await axios.post("/api/screenshot", {
              url: data.projectUrl,
            });
            const responseUrl = /'(.+)'/.exec(response.data.imageUrl);
            if (responseUrl && responseUrl[1]) {
              imageUrl = responseUrl[1];
            } else {
              throw new Error("Invalid screenshot URL");
            }
          } else {
            throw new Error(
              'Project URL is required when you select "Generate from Project URL" from image source ',
            );
          }
          break;
        case "github":
          if (data.githubRepoUrl) {
            const repoName = data.githubRepoUrl.split("github.com/")[1];
            imageUrl = `https://opengraph.githubassets.com/1/${repoName}`;
          } else {
            throw new Error(
              'GitHub repo is required when you select "Use GitHub Repository Image" from image source ',
            );
          }
          break;
      }

      const inputData = {
        ...data,
        imageUrl,
        technologies: [...selectedTechStack.map((tech) => tech.value)],
        userId: user?.id,
      };

      const response = await axios.post("/api/projects", inputData).then(() => {
        toast.success("Create new project successfully!");
        creatProjectModal.onClose();
        router.refresh();
        reset();
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    creatProjectModal.onClose();
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
            setImageSource(e.target.value as "upload" | "project" | "github")
          }
        >
  
          <option value="project">Generate from Project URL</option>
          <option value="upload">Upload New Image</option>
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
          placeholder="Project name"
          required
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
          required
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
          selectedTechStack={selectedTechStack}
        />
      </div>
      <div className="sm:col-span-3">
        <Input
          label="Project Link"
          id="projectUrl"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="Paste the URL of your live project"
        />
      </div>
      <div className="sm:col-span-3">
        <Input
          label="GitHub Repository"
          id="githubRepoUrl"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="Paste the GitHub repository URL"
        />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={creatProjectModal.isOpen}
        onClose={creatProjectModal.onClose}
        title="Create Project"
        actionLabel={isLoading ? "Creating" : "Create"}
        disabled={isLoading}
        body={bodyContent}
        secondaryActionLabel="Cancel"
        secondaryAction={handleClose}
      ></Modal>
    </>
  );
};

export default CreateProjectModal;
