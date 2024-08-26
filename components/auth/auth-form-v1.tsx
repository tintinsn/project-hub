"use client";

import React from "react";
import Input from "../ui/input-auth";
import { FieldValues, useForm } from "react-hook-form";

interface AuthFormProps {
  isSignUpForm: boolean;
}

const AuthForm = ({ isSignUpForm }: AuthFormProps) => {
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

  const toggleSignInForm = () => {
    console.log("sign in");
  };
  const onSubmit = () => {
    return;
  };

  return (
    <div className="relative flex h-[calc(100vh-6rem)] items-center justify-center">
      <div className="flex h-full w-full items-center">
        <div className="mx-auto max-w-md">
          <div className="min-h-[600px] w-full rounded-md border border-gray-200 bg-white px-16 py-12">
            <header className="text-left">
              <h1 className="mb-7 text-[2rem] font-bold text-black">
                {isSignUpForm ? "Create an account" : "Sign in"}
              </h1>
            </header>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {!isSignUpForm && (
                <Input
                  id="name"
                  label="name"
                  //   disabled={isLoading}
                  register={register}
                  errors={errors}
                />
              )}
              <Input
                id="email"
                label="Email"
                // disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                // disabled={isLoading}
                register={register}
                errors={errors}
              />

              <button className="w-full rounded bg-[#E50815] px-4 py-[6px] font-medium leading-7 text-white hover:bg-red-700">
                {isSignUpForm ? "Sign in" : " Sign up"}
              </button>
              {isSignUpForm && (
                <>
                  <p className="text-center text-base font-normal text-white text-opacity-70">
                    OR
                  </p>
                  <button className="w-full rounded bg-[#333333] bg-opacity-70 px-4 py-[6px] font-medium leading-7 text-white hover:bg-opacity-60">
                    Use a Sign-In Code
                  </button>
                </>
              )}
              <p className="mb-4 text-base font-normal text-white text-opacity-70">
                {isSignUpForm ? "New to Netflix?" : "Already registered?"}
                <a
                  onClick={toggleSignInForm}
                  className="ml-1 cursor-pointer text-base font-medium text-white"
                >
                  {isSignUpForm ? "Sign up now" : "Sign in now"}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
