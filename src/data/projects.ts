import prisma from "@/lib/db";

export async function addProject(project: Project) {
  try {
    return await prisma.project.create({
      data: project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}
