"use client";

import { useState } from "react";
import EducationsSection from "./educations-section";
import ExperiencesSection from "./experiences-section";
import ProjectsSection from "./projects-section";
import ProfileNav from "./profile-nav";
import React from "react";

interface Props {
  profileData: any;
  isUserProfile: boolean;
}
const ProfileContent = ({ profileData, isUserProfile }: Props) => {
  const [activeTab, setActiveTab] = useState<
    "projects" | "education" | "experience"
  >("projects");
  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <ProjectsSection
            isUserProfile={isUserProfile}
            projects={profileData.projects}
          />
        );
      case "experience":
        return (
          <ExperiencesSection
            isUserProfile={isUserProfile}
            experiences={profileData.experience}
          />
        );
      case "education":
        return (
          <EducationsSection
            isUserProfile={isUserProfile}
            educations={profileData.education}
          />
        );
      default:
        return (
          <ProjectsSection
            isUserProfile={isUserProfile}
            projects={profileData.projects}
          />
        );
    }
  };

  return (
    <>
      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="rounded-b border-x border-b p-5">
        <div className="m-auto flex max-w-[120rem] flex-col">
          {renderContent()}
        </div>
      </main>
    </>
  );
};

export default ProfileContent;
