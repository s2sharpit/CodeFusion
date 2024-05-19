"use server";

import { auth, signIn } from "@/lib/auth";
import { getProjects } from "./getData";
import { getGhProjData } from "./getGhProjData";
import { updateProject, addProject, deleteProject } from "./projects";
import { revalidateTag } from "next/cache";
import { updateUser } from "./users";
import { Project, User } from "@prisma/client";

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

    const updateProjectRes = await updateProject(project);
    if (updateProjectRes?.error)
      return { error: String(updateProjectRes.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error updating like, Try again later!" };
  }
}

export async function updateUserAction(user: User) {
  try {
    const editUserResponse = await updateUser(user);

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
    const projectRepo = String(formData.get("repo"));
    const demoVid = String(formData.get("demoVid"));
    if (!title || !projectRepo)
      return { error: "Project Title and Repo are required!" };

    const session = await auth();
    const repo = `${session?.user.username}/${projectRepo}`;

    const projectsData = await getProjects();
    if (!projectsData.projects || projectsData.error) {
      return { error: projectsData.error };
    }
    const projectExists = projectsData?.projects.some(
      (project) => project.repo === repo
    );

    if (projectExists)
      return { error: "Project Already Exists, Try adding different project!" };

    const response = await getGhProjData({ title, repo });

    if (response?.error) return { error: String(response.error) };

    const addProjectResponse = await addProject({...response.project, demoVid} as Proj);

    if (addProjectResponse?.error)
      return { error: String(addProjectResponse.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error creating project, Try again later!" };
  }
}

export async function updateProjectAction(project: Project) {
  try {
    const response = await getGhProjData({
      title: project.title as string,
      repo: project.repo,
    });

    if (!response.project || response?.error)
      return { error: String(response.error) };

    const { likes, title, ...data } = response.project;

    const proj = {
      id: project.id,
      title: project.title,
      likes: project.likes,
      demoVid: project.demoVid,
      ...data,
    };

    const updateProjectResponse = await updateProject(proj);

    if (updateProjectResponse?.error)
      return { error: String(updateProjectResponse.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error updating project, Try again later!" };
  }
}

export async function deleteProjectAction(project: Project) {
  try {
    const deleteProjectResponse = await deleteProject(project.id);

    if (deleteProjectResponse?.error)
      return { error: String(deleteProjectResponse.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: "Error deleting project, Try again later!" };
  }
}
