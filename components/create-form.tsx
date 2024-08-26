"use client";
import { uploadImage } from "@/app/libs/cloudinary";
import Input from "@/components/input";
import InputFile from "@/components/input-file";
import InputTextarea from "@/components/input-textarea";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

import MultiSelectTech from "@/components/ui/multi-select";
import ProjectCard from "@/components/ui/project-card";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCloudArrowUpFill } from "react-icons/bs";

interface CreateFormProps {
  user: User | null;
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

const CreateForm = ({ user }: CreateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<SelectedOption[]>(
    [],
  );
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    let imageUrl = data.imageUrl;

    if (imageUrl && imageUrl[0]) {
      const file = imageUrl[0] as File;
      imageUrl = await uploadImage(file);
    }

    const inputData = {
      ...data,
      imageUrl,
      technologies: [...selectedTechStack.map((tech) => tech.value)],
      userId: user?.id,
    };

    setIsLoading(true);
    try {
      const res = axios.post("/api/projects", inputData).then(() => {
        toast.success("Create new project successfully!");
        reset();
        router.push("/");
      });
    } catch (error) {
      toast.error("Someting Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex h-full flex-wrap py-5">
          {/************ Left content - START *************/}
          {/* <div className="bg w-full px-4 md:w-1/2 lg:w-1/2 xl:w-1/4">
            <div className="flex flex-col">
              <div className="">
                <ProjectCard data={mockupData[0]} />
              </div>
            </div>
          </div> */}

          {/************ Right content - START *************/}
          <div className="h-full w-full px-4 pt-10 md:w-full lg:w-1/2 lg:pl-12 lg:pt-0 xl:w-3/4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <h1 className="text-4xl font-extrabold uppercase">
                    Create Project
                  </h1>
                </div>
                <div className="sm:col-span-3">
                  <Input
                    label="Project Name"
                    id="title"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    placeholder="Project name"
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputFile
                    id="imageUrl"
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
              <div className="mt-6 flex justify-end">
                <Button
                  label="Submit"
                  disabled={isLoading}
                  size="lg"
                  icon={BsCloudArrowUpFill}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateForm;
