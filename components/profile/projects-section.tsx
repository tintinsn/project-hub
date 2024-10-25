import { Project } from "@/types";

import ProjectCardSection from "./project-card-section";
import LinkButton from "../ui/link-button";
import NoResults from "../ui/no-results";
import { MdAddCircle } from "react-icons/md";
import Button from "../ui/button";
import useCreateProjectModal from "@/app/hooks/useCreateProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
  isUserProfile: boolean;
}

const ProjectsSection = ({ projects, isUserProfile }: ProjectsSectionProps) => {
  const createProjectModal = useCreateProjectModal();

  return (
    <>
      <div className="flex justify-end">
        <div className="flex items-end">
          {isUserProfile && (
            <Button
              label="New Project"
              onClick={createProjectModal.onOpen}
              icon={MdAddCircle}
              bg="black"
            />
          )}
        </div>
      </div>
      <div className="main relative grid max-w-full gap-5 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.length === 0 ? (
          <NoResults />
        ) : (
          projects.map((project) => (
            <ProjectCardSection
              key={project.id}
              isUserProfile={isUserProfile}
              data={project}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ProjectsSection;
