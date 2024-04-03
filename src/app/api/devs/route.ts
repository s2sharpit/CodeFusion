import prisma from "@/lib/db";

export async function GET(
  request: Request,
) {
  // const session = await auth();

  const res = await prisma.user.findMany();

  return Response.json(res);
}