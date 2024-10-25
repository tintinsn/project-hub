import { MdDeleteForever, MdEdit } from "react-icons/md";
import Button from "../ui/button";

import useUpdateExperienceModal from "@/app/hooks/useUpdateExperienceModal";

import { Experience } from "@/types";
import React from "react";
import DeleteButton from "../delete-button";
import UpdateExperienceModal from "../modal/update-experience-modal";
import { convertDate } from "@/helper/convert-date";

interface Props {
  experience: Experience;
  index: number;
  isUserProfile: boolean;
}

const ExperienceItem = ({ experience, index, isUserProfile }: Props) => {
  const updateExperienceModal = useUpdateExperienceModal();

  return (
    <>
      <div className="relative mr-2 border-b bg-white">
        <div className="absolute right-0 flex gap-3 pt-5">
          {isUserProfile && (
            <>
              <Button
                onClick={() => updateExperienceModal.onOpen(experience)}
                icon={MdEdit}
                bg="none"
                textColor="black"
                height="none"
                iconSize="md"
                rounded="full"
                size="sm"
              />
              <DeleteButton
                itemType="profile"
                path="experiences"
                itemId={experience.id}
                textColor="red"
                bg="none"
                rounded="default"
                height="none"
                iconSize="lg"
                icon={MdDeleteForever}
              />
            </>
          )}
        </div>
        {/* Education 2 */}
        <div className="border-gray-100 py-5 transition-all duration-300 first:rounded-t-xl first:border-t-0 last:rounded-b-xl">
          <button className="group flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-[#10151E] transition-colors duration-300 group-hover:bg-[#10151E] group-hover:text-[#ffff]">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-1 pl-4 text-left">
                <span className="text-xs text-gray-400">
                  {convertDate(experience.start_date)} <span> - </span>
                  {convertDate(experience.end_date)}
                </span>
                <span
                  className={`text-base font-bold tracking-wide text-[#10151E] md:text-xl`}
                >
                  {experience.job_title}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-black">
                    {experience.company_name}
                  </span>
                  <span className="text-xs text-black">
                    {experience.company_location}
                  </span>
                </div>
              </div>
            </div>
          </button>
          <div className="grid grid-rows-[1fr] overflow-hidden px-14 opacity-100 transition-all duration-300 ease-in-out">
            <div className="flex flex-col overflow-hidden">
              <div className="py-3 text-sm font-normal">
                <p>{experience.description}</p>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      {updateExperienceModal.currentExperience?.id === experience.id && (
        <UpdateExperienceModal
          experienceData={updateExperienceModal.currentExperience}
        />
      )}
    </>
  );
};

export default ExperienceItem;
