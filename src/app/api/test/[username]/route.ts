export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const res = await fetch("http://localhost:3000/api/devs");
  const data = await res.json();
  const user = data.find((dev: any) => dev.username === params.username);
  return Response.json(user);
}
