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
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white p-4 shadow-light-lg-border transition-shadow duration-200 ease-in-out group-hover:shadow-light-md-border">
        {/* Image */}
        <div className="relative flex aspect-video overflow-hidden rounded-[3px]">
          {data?.imageUrl && (
            <Image
              src={data?.imageUrl}
              alt="Image"
              fill
              className="object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* content */}
        <div className="flex flex-1 flex-col justify-between pt-4">
          {/* Content Top */}
          <div className="">
            <h3 className="text-base font-bold leading-5 tracking-[-.01em]">
              {data.title}
            </h3>
            <div className="mt-2 truncate text-sm leading-5 tracking-[-.01em] text-[#888]">
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
              <div className="mx-0 my-4 flex items-end gap-2.5 text-sm leading-5 tracking-[-.01em] text-[#888]">
                <span className="font-semibold text-[#111]">by</span>
                <span> {data.createdBy?.name}</span>
                <Avatar size="lg" imageUrl={data.createdBy?.image} />
              </div>
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
