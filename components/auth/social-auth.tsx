import { FcGoogle } from "react-icons/fc";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

const SocialAuth = () => {
  return (
    <div className="flex w-full space-x-2">
      <Button
        icon={FcGoogle}
        label="Google"
        onClick={() => signIn("google")}
        variant="outline"
        size="lg"
        position="center"
        width="full"
      />
      <Button
        icon={AiFillGithub}
        label="Github"
        onClick={() => signIn("github")}
        variant="outline"
        size="lg"
        position="center"
        width="full"
      />
    </div>
  );
};

export default SocialAuth;
