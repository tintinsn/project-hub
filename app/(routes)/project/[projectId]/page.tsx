import getProject from "@/app/actions/get-project";
import getUser from "@/app/actions/get-user";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";
import UpdateModal from "@/components/modal/update-modal";
import Avatar from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { RxGithubLogo } from "react-icons/rx";
import StackIcon from "tech-stack-icons";

interface ParamsProps {
  params: { projectId: string };
}

const ProjectPage = async ({ params }: ParamsProps) => {
  const project = await getProject(params.projectId);
  const user = await getUser();
  const slug = project?.createdBy.profile?.slug;

  const owner = project?.createdBy.id === user?.id;

  if (!project) {
    return <div>Project not found</div>;
  }
  const repoName = project.githubRepoUrl?.split("github.com/")[1];

  return (
    <Container>
      <div className="mx-auto max-w-full">
        <div className="flex flex-wrap px-4 py-4 sm:px-6 lg:px-8 lg:py-16">
          {/* *********** Left content - START ************ */}
          <div className="relative h-auto max-h-[400px] w-full overflow-hidden rounded-md border border-gray-200 lg:w-1/2">
            <Image
              src={project?.imageUrl ?? ""}
              alt="Image"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
              quality={100}
              priority
              className="rounded-md"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </div>
          {/* *********** Right content - START ************ */}
          <div className="w-full bg-white px-10 py-4 md:w-full lg:w-1/2">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold text-black lg:text-3xl">
                  {project?.title}
                </h1>
                <div className="flex gap-2">
                  {owner && (
                    <>
                      <EditButton project={project} />
                      <DeleteButton
                        itemType="projects"
                        itemId={params.projectId}
                        bg="red"
                        textColor="white"
                        label="Delete"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Project Owner */}

              <div className="flex items-center gap-3">
                <div className="font-medium">
                  <span>by</span>
                  <Link href={`/profile/${slug}`}>
                    <span className="ml-2 cursor-pointer hover:underline">
                      {project?.createdBy.name}
                    </span>
                  </Link>
                </div>
                {project.createdBy.image && (
                  <Link href={`/profile/${slug}`}>
                    <Avatar size="lg" imageUrl={project.createdBy.image} />
                  </Link>
                )}
              </div>

              {/* Project Description */}
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
                {project.projectUrl && (
                  <a
                    href={project?.projectUrl ?? ""}
                    target="_blank"
                    className="flex h-[32px] w-40 gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20"
                  >
                    <span className="flex items-center justify-start gap-[6px] overflow-hidden px-[6px]">
                      <RiExternalLinkLine className="h-4 w-4 flex-shrink-0 fill-black" />
                      <span
                        className={`${GeistSans.className} truncate text-sm font-medium`}
                      >
                        {project?.title}
                      </span>
                    </span>
                  </a>
                )}
                {project.githubRepoUrl && (
                  <a
                    href={project?.githubRepoUrl ?? ""}
                    className="flex h-[32px] w-40 gap-1 rounded-full bg-[#F5F5F5] pl-2 pr-3 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 lg:w-48"
                  >
                    <span className="flex items-center justify-start gap-[6px] overflow-hidden px-[6px]">
                      <RxGithubLogo className="h-4 w-4 flex-shrink-0 fill-black" />

                      <span
                        className={`${GeistSans.className} truncate text-sm font-medium`}
                      >
                        {repoName}
                      </span>
                    </span>
                  </a>
                )}
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
