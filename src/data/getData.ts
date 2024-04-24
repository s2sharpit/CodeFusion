import { unstable_cache } from "next/cache";
import prisma from "@/lib/db";

export const getUsers = unstable_cache(
  async () => {
    try {
      const users = await prisma.user.findMany();
      return { users }
    } catch (error) {
      console.error("Error fetching users:", error);
      return { users: [], error: "Server Error, Try Again!" };
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
      const projects = await prisma.project.findMany();
      return { projects };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { projects: [], error: "Server Error, Try Again!" };
    }
  },
  ["projects"],
  {
    tags: ["projects"],
  }
);
