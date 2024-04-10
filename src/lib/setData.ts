'use server';

import prisma from "@/lib/db";

export const addProject = async (data: Project) => {
  await prisma.project.create({ data });
  console.log("Project added successfully!");
  
}