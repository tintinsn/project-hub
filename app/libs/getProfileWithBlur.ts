import getProfile from "../actions/get-profile";
import { getBlurDataURL } from "./getBlurDataURL";

export async function getProfileWithBlur(slug: string) {
  const profile = await getProfile(slug);

  if (!profile) return null;

  const projectsWithBlur = await Promise.all(
    profile.projects.map(async (project) => ({
      ...project,
      blurDataURL: await getBlurDataURL(project.imageUrl || ""),
    })),
  );

  return {
    ...profile,
    projects: projectsWithBlur,
  };
}
