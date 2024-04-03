export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const res = await fetch("http://localhost:3000/api/s2sharpit", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <h1>{data.username}</h1>
      <p>{data.name}</p>
      <p>{data.id}</p>
      <p>{data.email}</p>
      <p>{data.major}</p>
      <p>{data.interests}</p>
    </div>
  );
}
