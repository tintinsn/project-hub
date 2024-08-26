import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";

type ButtonSize = "sm" | "md" | "lg";

interface AvatarProps {
  imageUrl?: string | null;
  size: ButtonSize;
}

const Avatar = ({ imageUrl, size = "lg" }: AvatarProps) => {
  const sizeStyles = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <div
      className={`relative flex ${sizeStyles[size]} cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white`}
    >
      {imageUrl ? (
        <Image src={imageUrl || ""} alt="user" fill className="" />
      ) : (
        <FaRegUser className="absolute fill-black" />
      )}
    </div>
  );
};

export default Avatar;
