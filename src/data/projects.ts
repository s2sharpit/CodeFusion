import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Project } from "@prisma/client";

export async function addProject(project: Proj) {
  try {
    await prisma.project.create({
      data: project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return { error: "Error adding project, Try again!" };
  }
}

export async function updateLike(project: Project) {
  try {
    const { id, ...data } = project;
    await prisma.project.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    console.error("Error updating project likes:", error);
    return { error: "Error updating project likes. Please try again!" };
  }
}
