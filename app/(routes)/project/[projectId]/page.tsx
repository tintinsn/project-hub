import getProject from "@/app/actions/get-project";
import getUser from "@/app/actions/get-user";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";
import UpdateModal from "@/components/modal/update-modal";
import Avatar from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import { RiExternalLinkLine } from "react-icons/ri";
import { RxGithubLogo } from "react-icons/rx";
import StackIcon from "tech-stack-icons";

interface ParamsProps {
  params: { projectId: string };
}

const ProjectPage = async ({ params }: ParamsProps) => {
  const project = await getProject(params.projectId);
  const user = await getUser();
  console.log(user);

  const owner = project?.createdBy.id === user?.id;

  if (!project) {
    return <div>Project not found</div>;
  }
  const repoName = project.githubRepoUrl?.split("github.com/")[1];
  return (
    <Container>
      <div className="mx-auto max-w-full">
        <div className="flex flex-wrap px-4 py-16 sm:px-6 lg:px-8">
          {/* *********** Left content - START ************ */}
          <div className="iframe-container-parent relative h-[400px] w-full px-6 lg:w-1/2">
            <div className="iframe-container h-[800px] w-[200%] origin-top-left scale-50 transform overflow-hidden rounded-lg">
              <iframe
                src={project?.projectUrl ?? ""}
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
                  {owner && (
                    <>
                      <EditButton />
                      <DeleteButton projectId={params.projectId} />
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-medium">
                  <span>by</span>
                  <span className="ml-2 cursor-pointer hover:underline">
                    {project?.createdBy.name}
                  </span>
                </div>
                {project.createdBy.image && (
                  <Avatar size="lg" imageUrl={project.createdBy.image} />
                )}
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
                  href={project?.projectUrl ?? ""}
                  target="_blank"
                  className="flex h-[32px] gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20"
                >
                  <span className="flex items-center justify-start gap-[6px] px-[6px]">
                    <RiExternalLinkLine className="h-4 w-4 fill-black" />
                    <span
                      className={`${GeistSans.className} text-sm font-medium`}
                    >
                      {project?.title}
                    </span>
                  </span>
                </a>
                <a
                  href={project?.githubRepoUrl ?? ""}
                  className="flex h-[32px] gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20"
                >
                  <span className="flex items-center justify-start gap-[6px] px-[6px]">
                    <RxGithubLogo className="h-4 w-4 fill-black" />

                    <span
                      className={`${GeistSans.className} text-sm font-medium`}
                    >
                      {repoName}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateModal data={project} />
    </Container>
  );
};

export default ProjectPage;
