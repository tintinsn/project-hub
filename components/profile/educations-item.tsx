import useUpdateEducationModal from "@/app/hooks/useUpdateEducationModal";
import { Education } from "@/types";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import DeleteButton from "../delete-button";
import Button from "../ui/button";
import UpdateEducationModal from "../modal/update-education-modal";
import { convertDate } from "@/helper/convert-date";

interface Props {
  education: Education;
  index: number;
  isUserProfile: boolean;
}

const EducationItem = ({ education, index, isUserProfile }: Props) => {
  const updateEducationModal = useUpdateEducationModal();

  return (
    <>
      <div className="relative mr-2 border-b bg-white">
        <div className="absolute right-0 flex gap-3 pt-5">
          {isUserProfile && (
            <>
              <Button
                onClick={() => updateEducationModal.onOpen(education)}
                height="none"
                iconSize="md"
                icon={MdEdit}
                textColor="black"
                rounded="full"
              />
              <DeleteButton
                itemType="profile"
                path="educations"
                itemId={education.id}
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
                  {convertDate(education.start_date)} -{" "}
                  {convertDate(education.end_date)}
                </span>
                <span
                  className={`text-base font-bold tracking-wide text-[#10151E] transition-colors duration-300 md:text-xl`}
                >
                  {education.major}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-black">
                    {education.university}
                  </span>
                  {/* <span className="text-xs  text-gray-600">Mahasarakham, Thailand</span> */}
                </div>
              </div>
            </div>
          </button>
        </div>
        {updateEducationModal.currentEducation?.id === education.id && (
          <UpdateEducationModal
            educationData={updateEducationModal.currentEducation}
          />
        )}
      </div>
    </>
  );
};

export default EducationItem;
