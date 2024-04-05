import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getUsers = unstable_cache(
  async () => {
    return prisma.user.findMany();
  },
  ["users"],
  {
    tags: ["users"],
  }
);
