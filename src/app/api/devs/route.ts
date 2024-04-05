import prisma from "@/lib/db";
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // const session = await auth();

  const res = await prisma.user.findMany();

  return Response.json(res);
}
