import getProject from "@/app/actions/get-project";
import useUpdateModal from "@/app/hooks/useUpdateModal";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";
import UpdateModal from "@/components/modal/update-modal";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { GeistSans } from "geist/font/sans";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { RxGithubLogo } from "react-icons/rx";
import StackIcon from "tech-stack-icons";

interface ParamsProps {
  params: { projectId: string };
}

const ProjectPage = async ({ params }: ParamsProps) => {
  const project = await getProject(params.projectId);

  return (
    <Container>
      <div className="mx-auto max-w-full">
        <div className="flex flex-wrap px-4 py-16 sm:px-6 lg:px-8">
          {/* *********** Left content - START ************ */}
          <div className="iframe-container-parent relative h-[400px] w-full px-6 lg:w-1/2">
            <div className="iframe-container h-[800px] w-[200%] origin-top-left scale-50 transform overflow-hidden rounded-lg">
              <iframe
                src={project?.projectUrl}
                className="h-full w-full overflow-scroll"
              ></iframe>
            </div>
          </div>
          {/* *********** Right content - START ************ */}
          <div className="w-full bg-white p-4 md:w-full lg:w-1/2">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold text-black">
                  {project?.title}
                </h1>
                <div className="flex gap-2">
                  {/* <Button
                    onClick={() => updateModal.onOpen}
                    label="Edit"
                    icon={MdEdit}
                    variant="outline"
                    rounded="full"
                  /> */}
                  {/* <Button
                    // onClick={() => handleDelete(params.projectId)}
                    label="Delete"
                    icon={MdDeleteForever}
                    variant="danger"
                    rounded="full"
                  /> */}
                  <EditButton />
                  <DeleteButton projectId={params.projectId} />
                </div>
              </div>
              <div className="flex">
                <h3>by {project?.createdBy.name}</h3>
              </div>
              <p className="block max-w-full text-base leading-6 text-[#888]">
                {project?.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-lg leading-6">Technologies</h3>
                {project?.technologies.map((tech) => (
                  <StackIcon key={tech} name={tech} className="mr-3 h-6 w-6" />
                ))}
              </div>
              <div className="flex w-fit gap-4">
                <a
                  href={project?.projectUrl}
                  target="_blank"
                  className="flex h-[32px] gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20"
                >
                  <span className="flex items-center justify-start gap-[6px] px-[6px]">
                    <RiExternalLinkLine className="h-4 w-4 fill-black" />
                    <span
                      className={`${GeistSans.className} text-sm font-medium`}
                    >
                      GameHub
                    </span>
                  </span>
                </a>
                <a
                  href={project?.githubRepoUrl}
                  className="flex h-[32px] gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20"
                >
                  <span className="flex items-center justify-start gap-[6px] px-[6px]">
                    <RxGithubLogo className="h-4 w-4 fill-black" />

                    <span
                      className={`${GeistSans.className} text-sm font-medium`}
                    >
                      tintinsn/Game-hub
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateModal />
    </Container>
  );
};

export default ProjectPage;
