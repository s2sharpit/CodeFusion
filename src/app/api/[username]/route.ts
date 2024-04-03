import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  // const session = await auth();

  const res = await prisma.user.findUnique({
    where: { username: params.username },
  });


  return Response.json(res);
}
