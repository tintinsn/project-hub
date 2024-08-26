import HeroSection from "@/components/hero-section";
import ProjectList from "@/components/project-list";
import Container from "@/components/ui/container";
import { fakeProjects } from "@/const";
import getUser from "../actions/get-user";

export default async function HomePage() {
  // const projects = await getProjects()
  const projects = fakeProjects;



  return (
    <Container>
      {/* <div className="relative flex flex-col px-4 sm:px-6 lg:px-8 lg:pb-20 lg:pt-8"> */}
      <div className="relative flex flex-col px-4 pb-20 sm:px-6 lg:px-8 lg:pt-5">
        <HeroSection />
      </div>

      <div className="flex flex-col px-4 sm:px-6 sm:py-16 lg:px-8">
        <ProjectList  items={projects} />
      </div>
    </Container>
  );
}
