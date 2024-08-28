import Image from "next/image";
import Link from "next/link";
import LinkButton from "./ui/link-button";
import { PiNavigationArrowFill } from "react-icons/pi";

const HeroSection = () => {
  return (
    <div className="flex flex-col pt-5 lg:pt-0">
      {/* Top Content */}
      <div className="flex flex-grow items-center justify-center">
        <div className="my-5 flex max-w-3xl flex-col items-center space-y-6 text-center 2xl:max-w-5xl">
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight 2xl:text-8xl 2xl:leading-snug">
            {/* innovative */}
            Discover, <p className="inline-block text-blue-500">
              Showcase
            </p>{" "}
            your Projects and Profile
          </h1>
          <p className="text-sm text-gray-600">
            Join a vibrant developer community. Share, explore projects, and
            build your portfolio. Showcase your skills or get inspired—our
            platform is your development hub.
          </p>
          <div className="pb-2">
            <LinkButton
              href="/create"
              label="Let's Share Project"
              icon={PiNavigationArrowFill}
              position="center"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex flex-shrink items-end justify-center">
        <div className="relative flex w-full items-center justify-center">
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 z-30 h-[200px] w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
          <Image
            src="/hero-image1.png"
            alt="hero"
            width={900}
            height={500}
            // fill
            className="shado shadow-custom rounded-t-lg"
            style={{ objectFit: "contain", height: "100%" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
