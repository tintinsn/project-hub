import HeroSection from "@/components/hero-section";
import ProjectList from "@/components/project-list";
import Container from "@/components/ui/container";

export default async function HomePage() {
  return (
    <Container>
      <div className="relative flex flex-col px-4 pb-20 sm:px-6 lg:px-8 lg:pt-5">
        <HeroSection />
      </div>

      <div className="flex flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-16">
        <ProjectList />
      </div>
    </Container>
  );
}
