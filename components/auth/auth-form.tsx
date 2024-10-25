"use client";

import React, { useEffect, useRef, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SocialAuth from "./social-auth";
import Button from "../ui/button";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputAuth from "../ui/input-auth";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "./error-input";

interface AuthFormProps {
  isSignIn: boolean;
  initialValues: { name?: string; email: string; password: string };
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .optional(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

const AuthForm = ({ isSignIn, initialValues }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (!isSignIn) {
      axios
        .post("/api/signup", data)
        .then(() => {
          toast.success("Create an account success");
          router.push("/signin");
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "An error occurred during sign up",
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success("Logged in");
          router.push("/");
          router.refresh();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-6rem)] items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full rounded-md bg-white px-16 lg:max-w-[500px]">
          <header className="mb-5 text-left">
            <h1 className="mb-10 text-4xl font-bold text-black">
              {isSignIn ? "Sign in" : "Create an account"}
            </h1>
            <div className="space-y-4">
              <p>{isSignIn ? "Sign in" : "Sign up"} with Open account</p>
              <SocialAuth />
            </div>
          </header>
          <hr className="" />
          <div className="mt-5 flex flex-col gap-4">
            <p>Or continue with email address</p>
            {!isSignIn && (
              <>
                <InputAuth
                  id="name"
                  label="name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {errors.name && <ErrorInput error={errors.name.message} />}
              </>
            )}
            <InputAuth
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
            {errors.email && <ErrorInput error={errors.email.message} />}
            <InputAuth
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
            {errors.password && <ErrorInput error={errors.password.message} />}

            {isSignIn ? (
              <Button
                label="Sign in"
                width="full"
                size="lg"
                position="center"
                bg="red"
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <Button
                label="Sign up"
                width="full"
                size="lg"
                position="center"
                bg="red"
                onClick={handleSubmit(onSubmit)}
              />
            )}
            <p className="mb-4 text-base font-normal text-black text-opacity-70">
              {isSignIn ? "New to ProjectHub?" : "Already registered?"}
              {isSignIn ? (
                <Link
                  href="/signup"
                  className="ml-1 cursor-pointer text-base font-medium text-black hover:underline"
                >
                  {isSignIn ? "Sign up now" : "Sign in now"}
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="ml-1 cursor-pointer text-base font-medium text-black hover:underline"
                >
                  {isSignIn ? "Sign in now" : "Sign up now"}
                </Link>
              )}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
