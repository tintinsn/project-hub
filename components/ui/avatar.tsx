import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { FaRegUser, FaUser } from "react-icons/fa6";

interface AvatarProps {
  imageUrl?: string | null;
}

const Avatar = ({ imageUrl }: AvatarProps) => {
  return (
    <div className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white">
      {imageUrl ? (
        <Image
          src={imageUrl || ""}
          alt="avatar"
          className="w-full rounded-full"
          fill
        />
      ) : (
        <FaRegUser className="absolute fill-black" />
      )}
    </div>
  );
};

export default Avatar;
