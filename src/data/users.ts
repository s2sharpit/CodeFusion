import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function editUser(skills: string[]) {
  try {
    const session = await auth();
    await prisma.user.update({
      where: { id: session?.user.id },
      data: { skills },
    });
  } catch (e) {
    return { error: "Error editing user details, Try again later!" };
  }
}
