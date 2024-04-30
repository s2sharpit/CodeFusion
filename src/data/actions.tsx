"use server";

import { auth, signIn } from "@/lib/auth";
import { getProjects } from "./getData";
import { getGhProjData } from "./getGhProjData";
import { updateLike, addProject } from "./projects";
import { revalidateTag } from "next/cache";
import { editUser } from "./users";
import { Project } from "@prisma/client";

export const signInAction = async () => {
  return await signIn("github");
};

export async function updateLikeAction(project: Project) {
  try {
    const session = await auth();
    if (!session || !session.user.username) {
      return { error: "User session not found!" };
    }

    const likes = project.likes.includes(session.user.username)
      ? project.likes.filter((like) => like !== session.user.username)
      : [...project.likes, session.user.username];

    project.likes = likes;

    const updateProjectRes = await updateLike(project);
    if (updateProjectRes?.error)
      return { error: String(updateProjectRes.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error updating like, Try again later!" };
  }
}

export async function editUserAction(skills: string[]) {
  try {
    const editUserResponse = await editUser(skills);

    if (editUserResponse?.error)
      return { error: String(editUserResponse.error) };

    revalidateTag("users");
  } catch (error) {
    return { error: "Error editing user details, Try again later!" };
  }
}

export async function createProjectAction(formData: FormData) {
  try {
    const title = String(formData.get("title"));
    const repo = String(formData.get("repo"));
    if (!title || !repo)
      return { error: "Project Title and Repo are required!" };
    const session = await auth();

    const projectsData = await getProjects();
    if (!projectsData.projects || projectsData.error) {
      return { error: projectsData.error };
    }
    const projectExists = projectsData?.projects.some(
      (project) => project.repo === `${session?.user.username}/${repo}`
    );

    if (projectExists)
      return { error: "Project Already Exists, Try adding different project!" };

    const response = await getGhProjData({ title, repo });

    if (response?.error) return { error: String(response.error) };

    const addProjectResponse = await addProject(response.project as Proj);

    if (addProjectResponse?.error)
      return { error: String(addProjectResponse.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error creating project, Try again later!" };
  }
}
