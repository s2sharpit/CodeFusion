"use server";

import { getGhProjData } from "./getGhProjData";
import { addProject } from "./projects";
import { revalidateTag } from "next/cache";

export async function createProjectAction(formData: FormData) {
  const { project } = await getGhProjData({
    title: String(formData.get("title")),
    repo: String(formData.get("repo")),
  });
  
//   console.log(project);

  await addProject(project);
  revalidateTag("projects");
}
