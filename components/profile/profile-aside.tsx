import StackIcon from "tech-stack-icons";

interface ProfileAsideProps {
  bio: string | null;
  techStack: string[] | [];
}

const ProfileAside = ({ bio, techStack }: ProfileAsideProps) => {
  return (
    <aside className="mt-3 flex flex-col gap-4 text-black lg:row-span-2 lg:mr-10">
      <div className="rounded-lg border p-5">
        <p className="block max-w-full p-2 text-base leading-7 tracking-wider">
          {bio}
        </p>
      </div>
      <div className="rounded-lg border p-5">
        <p className="mb-4 block max-w-full p-2 text-xl font-semibold leading-6">
          Technologies
        </p>
        <div className="flex flex-wrap gap-6 p-2">
          {techStack &&
            techStack.map((tech) => (
              <div key={tech}>
                <StackIcon name={tech} className="w-7s h-7" />
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default ProfileAside;
