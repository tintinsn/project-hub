import getUser from "@/app/actions/get-user";
import { getProfileWithBlur } from "@/app/libs/getProfileWithBlur";
import CreateProjectModal from "@/components/modal/create-project-modal";
import CreateExperienceModal from "@/components/modal/create-project-modal";
import UpdateUserInfoModal from "@/components/modal/update-profile-modal";

import ProfileAside from "@/components/profile/profile-aside";
import ProfileContent from "@/components/profile/profile-content";
import ProfileHeader from "@/components/profile/profile-header";
import { Suspense } from "react";

interface ParamsProps {
  params: { slug: string };
}

export default async function ProfilePage({ params }: ParamsProps) {
  const slug = params.slug;
  const profile = await getProfileWithBlur(slug);
  const user = await getUser();

  if (!profile) {
    return <div className="">Not found</div>; // Add return here
  }

  const isUserProfile = profile?.user.id === user?.id;

  const userInfo = {
    userId: profile.userId,
    name: profile.user.name,
    jobTitle: profile.jobTitle,
    bio: profile.bio,
    githubLink: profile.githubLink,
    linkedinLink: profile.linkedinLink,
    phoneNumber: profile.phoneNumber,
    email: profile.email,
    address: profile.address,
    image: profile.user.image,
    technicalSkills: profile.technicalSkills,
  };

  return (
    <div className="my-10 grid px-6 lg:grid-cols-[1fr_2fr] lg:grid-rows-[18rem_auto_1fr] lg:px-20">
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileHeader
          name={profile.user.name}
          jobTitle={profile.jobTitle}
          githubLink={profile.githubLink}
          linkedinLink={profile.linkedinLink}
          phoneNumber={profile.phoneNumber}
          email={profile.email}
          address={profile.address}
          image={profile.user.image}
          isUserProfile={isUserProfile}
        />
        <ProfileAside bio={profile.bio} techStack={profile.technicalSkills} />
        <ProfileContent isUserProfile={isUserProfile} profileData={profile} />
        <UpdateUserInfoModal userInfo={userInfo} />
      </Suspense>
    </div>
  );
}
