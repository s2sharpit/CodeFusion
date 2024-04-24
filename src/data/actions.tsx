"use server";

import { auth } from "@/lib/auth";
import { getProjects } from "./getData";
import { getGhProjData } from "./getGhProjData";
import { addProject } from "./projects";
import { revalidateTag } from "next/cache";

export async function createProjectAction(formData: FormData) {
  try {
    const title = String(formData.get("title"));
    const repo = String(formData.get("repo"));
    if (!title || !repo) return { error: "Project Title and Repo are required!"};
    const session = await auth();

    const projects = await getProjects();
    const projectExists = projects.some(
      (project) => project.repo === `${session?.user.username}/${repo}`
    );

    if (projectExists) return { error: "Project Already Exists, Try adding different project!" };

    const response = await getGhProjData({ title, repo });

    if (response?.error) return { error: String(response.error) };

    const { project } = response;
    const addProjectResponse = await addProject(project as Project);

    if (addProjectResponse?.error)
      return { error: String(addProjectResponse.error) };

    revalidateTag("projects");
  } catch (error) {
    return { error: 'Error creating project, Try again later!' };
  }
}
