import { unstable_cache } from "next/cache";
import prisma from "@/lib/db";

export const getUsers = unstable_cache(
  async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      // return []
      throw error; // Re-throwing the error to maintain consistency in error handling
    }
  },
  ["users"],
  {
    tags: ["users"],
  }
);

export const getProjects = unstable_cache(
  async () => {
    try {
      return await prisma.project.findMany();
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error; // Re-throwing the error to maintain consistency in error handling
    }
  },
  ["projects"],
  {
    tags: ["projects"],
  }
);
