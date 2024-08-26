"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "../heading";
import Input from "../ui/input-auth";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";

// export interface RegisterForm {
//   username: string;
//   email: string;
//   password: string;
// }

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 text-center font-light text-gray-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="cursor-pointer text-gray-950 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/signup", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Someting Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title="Register"
        actionLabel="Register"
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      ></Modal>
    </>
  );
};

export default RegisterModal;
