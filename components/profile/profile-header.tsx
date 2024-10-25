"use client";
import useUpdateUserInfoModal from "@/app/hooks/useUpdateUserInfoModal";
import Image from "next/image";
import Link from "next/link";
import {
  BsFillTelephoneOutboundFill,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { HiMiniHome } from "react-icons/hi2";
import { MdAttachEmail, MdEdit } from "react-icons/md";
import Button from "../ui/button";

interface ProfileHeaderProps {
  name: string | null;
  jobTitle: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  image: string | null;
  isUserProfile: boolean;
}

const ProfileHeader = ({
  name,
  jobTitle,
  githubLink,
  linkedinLink,
  phoneNumber,
  email,
  address,
  image,
  isUserProfile,
}: ProfileHeaderProps) => {
  const updateUserInfoModal = useUpdateUserInfoModal();


  return (
    <div className="relative mb-4 flex flex-col items-center gap-10 rounded-3xl bg-black py-[2.5rem] text-center text-white lg:col-span-2 lg:flex lg:flex-row lg:gap-5 lg:space-x-20 lg:px-[4rem] lg:text-start">
      {/* Image */}
      <div className="relative flex aspect-square h-48 w-48 items-center justify-center overflow-hidden rounded-xl bg-white lg:mx-auto">
        <Image
          src={image || ""}
          alt="user avatar"
          fill
          className="absolute object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Job title, Name, Address */}
      <div className="flex-1 space-y-4 lg:space-y-3">
        {/* Job title  */}
        <h3 className="text-lg text-gray-200 lg:text-xl">{jobTitle}</h3>
        {/* Name */}
        <h1 className="text-3xl font-extrabold uppercase tracking-wide lg:text-6xl">
          {name}
        </h1>
        {/* Address */}
        {address && (
          <div className="flex items-center justify-center space-x-2 lg:justify-start">
            <HiMiniHome />
            <p>{address}</p>
          </div>
        )}
        <div className="flex justify-center space-x-8 pt-2 lg:justify-start">
          <ul className="flex items-center space-x-6 text-3xl">
            <li>
              {githubLink && (
                <Link href={githubLink} target="_blank">
                  <BsGithub className="h-6 w-6 lg:h-5 lg:w-5" />
                </Link>
              )}
            </li>
            {linkedinLink && (
              <li>
                <Link href={linkedinLink} target="_blank">
                  <BsLinkedin className="h-6 w-6 lg:h-5 lg:w-5" />
                </Link>
              </li>
            )}
            {phoneNumber && (
              <li>
                <a href={`tel:${phoneNumber}`}>
                  <BsFillTelephoneOutboundFill className="h-6 w-6 lg:h-5 lg:w-5" />
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`}>
                  <MdAttachEmail className="h-6 w-6 lg:h-6 lg:w-6" />
                </a>
              </li>
            )}
            {isUserProfile && (
              <li className="lg:absolute lg:right-16 lg:top-11">
                <Button
                  onClick={updateUserInfoModal.onOpen}
                  label="Edit Profile"
                  icon={MdEdit}
                  rounded="full"
                  bg="white"
                  border="none"
                  textColor="black"
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
