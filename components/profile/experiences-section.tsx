import { Experience } from "@/types";

import useCreateExperienceModal from "@/app/hooks/useCreateExperienceModal";
import { MdAddCircle } from "react-icons/md";
import CreateExperienceModal from "../modal/create-experience-modal";
import Button from "../ui/button";
import NoResults from "../ui/no-results";
import ExperienceItem from "./experience-item";
import React from "react";

interface ExperienceSectionProps {
  experiences: Experience[];
  isUserProfile: boolean;
}

const ExperiencesSection = ({
  experiences,
  isUserProfile,
}: ExperienceSectionProps) => {
  const createExperienceModal = useCreateExperienceModal();


  return (
    <>
      <div className="flex flex-col">
        <div className="h-full w-full">
          <div className="flex justify-end">
            {isUserProfile && (
              <Button
                label="New Experience"
                onClick={createExperienceModal.onOpen}
                icon={MdAddCircle}
                bg="black"
              />
            )}
          </div>
          {experiences?.length === 0 && <NoResults />}

          {experiences.map((experience, i) => (
            <div key={experience.company_name}>
              <ExperienceItem
                isUserProfile={isUserProfile}
                experience={experience}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
      <CreateExperienceModal />
    </>
  );
};

export default ExperiencesSection;
