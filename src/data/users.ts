import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function updateUser(user: User) {
  try {
    const {id, ...data} = user;
    await prisma.user.update({
      where: { id },
      data,
    });
  } catch (e) {
    return { error: "Error editing user details, Try again later!" };
  }
}
