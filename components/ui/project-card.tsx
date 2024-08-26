"use client";
import { Project } from "@/types";
import Image from "next/image";

import { FiExternalLink } from "react-icons/fi";
import StackIcon from "tech-stack-icons";
import Avatar from "./avatar";

interface ProjectCardProps {
  data: Project;
}

const ProjectCard = ({ data }: ProjectCardProps) => {
  return (
    <div className="group relative m-auto h-full w-full">
      <div
        // 0px 3px 16px rgba(47, 83, 109, 0.12)
        className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white p-4 shadow-light-lg-border transition-shadow duration-200 ease-in-out group-hover:shadow-light-md-border"
      >
        {/* Ifram  */}
        {data?.imageUrl ? (
          <div className="relative flex h-52">
            <Image
              src={data?.imageUrl}
              alt="Image"
              fill
              priority
              className="absolute h-full w-full rounded-md bg-transparent bg-yellow-500 object-cover"
            />
          </div>
        ) : (
          <div className="iframe-container-parent relative h-[200px] w-full lg:w-full">
            <div className="iframe-container h-[400px] w-[200%] origin-top-left scale-50 transform overflow-hidden rounded-lg">
              <iframe
                src={data?.projectUrl ?? ""}
                className="h-full w-full overflow-scroll"
              ></iframe>
            </div>
          </div>
        )}
        {/* Image */}
        {/* <div className="relative flex h-52"> */}
        {/* {data?.imageUrl && (
            <Image
              src={data?.imageUrl}
              alt="Image"
              fill
              priority
              className="absolute h-full w-full rounded-md bg-transparent bg-yellow-500 object-cover"
            />
          )} */}
        {/* </div> */}

        {/* content */}
        <div className="flex flex-1 flex-col justify-between pt-4">
          {/* Content Top */}
          <div className="">
            <h3 className="tracking-[-.01em]= text-base font-bold leading-5">
              {data.title}
            </h3>
            <div className="mt-2 text-sm leading-5 tracking-[-.01em] text-[#888]">
              {data.description}
            </div>
          </div>

          {/* Content Bottom */}

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <StackIcon key={tech} name={tech} className="h-5 w-5" />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="mx-0 my-4 flex items-center gap-2 text-sm leading-5 tracking-[-.01em] text-[#888]">
                <span>by</span>
                <span> {data.createdBy.name}</span>
                <Avatar size="lg" imageUrl={data.createdBy.image} />
              </div>
              {/* dark:text-[#444] */}
              <button className="border-0 bg-none text-[#444]">
                <FiExternalLink className="h-5 w-5 text-current transition-all duration-100 ease-linear hover:text-[#111]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
