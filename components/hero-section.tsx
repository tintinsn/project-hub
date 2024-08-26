import { User } from "@prisma/client";
import Image from "next/image";




const HeroSection = () => {
  return (
    <div className="flex min-h-screen flex-col pt-24 lg:pt-0">
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
          <button className="flex items-center justify-center space-x-3 rounded-full bg-[rgb(14,14,14)] px-5 py-3 text-center text-white">
            {/* <LuMousePointer2 className="fill-white" /> */}
            <span className="text-xl">🚀</span>
            <span>Let&apos;s Share Project</span>
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex flex-shrink items-end justify-center">
        <div className="relative flex w-full items-center justify-center">
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 z-30 h-44 w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
          <Image
            src="/image-hero-light.png"
            alt="hero"
            width={900}
            height={500}
            // fill
            className="rounded-t-lg"
            style={{ objectFit: "contain", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
