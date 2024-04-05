export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const res = await fetch(`${process.env.AUTH_URL}/api/devs`);
  
  if (!res.ok) {
    return new Response(res.statusText, { status: res.status });
  }
  const data = await res.json();
  const user = data.find((dev: any) => dev.username === params.username);
  return Response.json(user);
}
