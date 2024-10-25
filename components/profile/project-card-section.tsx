import { Project } from "@/types";
import Image from "next/image";
import StackIcon from "tech-stack-icons";

import useUpdateModal from "@/app/hooks/useUpdateModal";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { RiExternalLinkFill } from "react-icons/ri";
import DeleteButton from "../delete-button";
import UpdateModal from "../modal/update-modal";
import Button from "../ui/button";
import LinkButton from "../ui/link-button";

interface ProjectCardProps {
  data: Project;
  isUserProfile: boolean;
}

const ProjectCardSection = ({ data, isUserProfile }: ProjectCardProps) => {
  const updateModal = useUpdateModal();

  return (
    <>
      <div className="duration-250 group visible row-span-4 grid grid-rows-subgrid overflow-hidden rounded-md border bg-white pb-0 shadow-md transition-transform-opacity will-change-transform hover:border-gray-300">
        {/* image */}
        <div className="relative aspect-video border-b transition-all duration-500 group-hover:scale-110">
          <Image
            src={data.imageUrl || ""}
            alt={`Image for ${data.title}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL={data.blurDataURL}
            fill
          />
        </div>
        {/* Overlay   */}
        <div className="absolute h-full w-full bg-gray-900 bg-opacity-40 opacity-0 backdrop-blur-sm group-hover:opacity-100">
          <div className="absolute left-4 right-0 top-1/2 flex -translate-y-1/2 transform flex-wrap items-center justify-center gap-3 text-center opacity-0 transition-all duration-500 group-hover:opacity-100 lg:flex-col">
            {isUserProfile ? (
              <>
                <LinkButton
                  href={`/project/${data.id}`}
                  // label="Link"
                  icon={RiExternalLinkFill}
                  variant="default"
                  rounded="full"
                  size="sm"
                />
                <Button
                  onClick={() => updateModal.onOpen(data)}
                  // label="Edit"
                  icon={MdEdit}
                  bg="white"
                  textColor="black"
                  iconSize="md"
                  rounded="full"
                  size="sm"
                />

                <DeleteButton
                  itemType="projects"
                  itemId={data.id}
                  textColor="white"
                  bg="red"
                  rounded="full"
                  height="height"
                  iconSize="md"
                  icon={MdDeleteForever}
                  size="sm"
                  // label="Delete"
                />
              </>
            ) : (
              <>
                <LinkButton
                  href={`/project/${data.id}`}
                  label="Link"
                  icon={RiExternalLinkFill}
                  variant="default"
                  rounded="full"
                  size="lg"
                />
              </>
            )}
          </div>
        </div>

        {/* Project Name */}
        <h3 className="px-2.5 text-base font-bold tracking-[-.01em]">
          {data.title}
        </h3>

        {/* Desc */}
        <div className="truncate px-2.5 text-sm tracking-[-.01em] text-[#888]">
          {data.description}
        </div>

        {/* Content Bottom */}

        <div className="flex flex-wrap gap-2 px-2.5 pb-2.5">
          {data.technologies.map((tech) => (
            <StackIcon key={tech} name={tech} className="h-4 w-4" />
          ))}
        </div>
      </div>

      {updateModal.currentProject?.id === data.id && (
        <UpdateModal data={updateModal.currentProject} />
      )}
    </>
  );
};

export default ProjectCardSection;

