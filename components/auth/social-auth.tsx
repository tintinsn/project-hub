import { FcGoogle } from "react-icons/fc";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

const SocialAuth = () => {
  const handleSigninGithub = () => {
    signIn("github", { callbackUrl: "/" });
  };
  const handleSigninGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex w-full space-x-2">
      <Button
        icon={FcGoogle}
        label="Google"
        onClick={handleSigninGoogle}
        variant="outline"
        size="lg"
        position="center"
        width="full"
      />
      <Button
        icon={AiFillGithub}
        label="Github"
        onClick={handleSigninGithub}
        variant="outline"
        size="lg"
        position="center"
        width="full"
      />
    </div>
  );
};

export default SocialAuth;
