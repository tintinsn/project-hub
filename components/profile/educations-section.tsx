import useCreateEducationModal from "@/app/hooks/useCreateEducationModal";
import { Education } from "@/types";
import Button from "../ui/button";
import { MdAddCircle } from "react-icons/md";
import NoResults from "../ui/no-results";
import EducationsItem from "./educations-item";
import CreateEducationModal from "../modal/create-education-modal";
import UpdateEducationModal from "../modal/update-education-modal";

interface EducationSectionProps {
  educations: Education[];
  isUserProfile: boolean;
}
const EducationsSection = ({
  educations,
  isUserProfile,
}: EducationSectionProps) => {
  const createEducationModal = useCreateEducationModal();

  return (
    <>
      <div className="flex flex-col">
        <div className="h-full w-full">
          <div className="flex justify-end">
            {isUserProfile && (
              <Button
                label="New Education"
                onClick={createEducationModal.onOpen}
                icon={MdAddCircle}
                bg="black"
              />
            )}
          </div>
          {educations?.length === 0 ? (
            <NoResults />
          ) : (
            educations.map((education, i) => (
              <div key={education.id}>
                <EducationsItem
                  education={education}
                  isUserProfile={isUserProfile}
                  index={i}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <CreateEducationModal />
    </>
  );
};

export default EducationsSection;
