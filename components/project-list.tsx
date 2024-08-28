import getProjects from "@/app/actions/get-projects";
import NoResults from "@/components/ui/no-results";
import ProjectCard from "@/components/ui/project-card";
import Link from "next/link";
import { HiFolderPlus } from "react-icons/hi2";
import LinkButton from "./ui/link-button";

const ProjectList = async () => {
  const projects = await getProjects();
  

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-[##1F1F2C] lg:text-4xl">
          Explore Projects
        </h3>
        <LinkButton
          href="/create"
          label="Create"
          icon={HiFolderPlus}
          size="lg"
        />
      </div>

      {projects?.length === 0 && <NoResults />}
      <div className="grid max-w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {projects?.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id}>
            <ProjectCard data={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
