import Image from "next/image";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const res = await fetch(`${process.env.URL}/api/test/${params.username}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-red-500 pt-6 text-3xl">From API</h1>
      <h1>{data.username}</h1>
      <p>{data.name}</p>
      <p>{data.id}</p>
      <p>{data.email}</p>
      <p>{data.major}</p>
      <p>{data.interests}</p>
      <Image
        className="border border-green-500 rounded-full"
        src={data.image}
        alt={data.username}
        width={200}
        height={200}
      />
    </div>
  );
}
