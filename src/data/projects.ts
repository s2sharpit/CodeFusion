import prisma from "@/lib/db";

export async function addProject(project: Project) {
  try {
    await prisma.project.create({
      data: project,
    });
  } catch (error) {
    // console.error("Error adding project:", error);
    return { error: "Error adding project, Try again!" };
  }
}
