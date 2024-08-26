"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "../heading";
import Input from "../ui/input-auth";

import toast from "react-hot-toast";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputTextarea from "../input-textarea";
import InputFile from "../input-file";
import MultiSelectTech from "../ui/multi-select";
import { SelectedOption } from "../create-form";
import useUpdateModal from "@/app/hooks/useUpdateModal";

const UpdateModal = () => {
  const [selectedTechStack, setSelectedTechStack] = useState<SelectedOption[]>(
    [],
  );
  const router = useRouter();
  const updateModal = useUpdateModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Update Modal" />
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

        <MultiSelectTech setSelectedTechStack={setSelectedTechStack} />
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
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
        secondaryAction={() => console.log("cancel")}
      ></Modal>
    </>
  );
};

export default UpdateModal;
