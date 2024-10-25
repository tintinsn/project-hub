interface ProfileNavProps {
  activeTab: "projects" | "education" | "experience";
  setActiveTab: (tab: "projects" | "education" | "experience") => void;
}

const tabs: { id: "projects" | "education" | "experience"; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];
const ProfileNav = ({ activeTab, setActiveTab }: ProfileNavProps) => {
  return (
    <nav className="mt-3 rounded-lg">
      <ul className="flex flex-wrap border">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`inline-block cursor-pointer px-[1.25rem] py-[0.5rem] ${
              activeTab === tab.id
                ? "bg-black text-white transition-all duration-300 ease-in-out"
                : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileNav;

