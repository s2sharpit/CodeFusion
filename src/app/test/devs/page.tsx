import Image from "next/image";

export default async function Devs() {
  const res = await fetch(`${process.env.AUTH_URL}/api/devs`, {next: {tags: ["devs"]}});
  const data = await res.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return (
    <section>
      Devs
      {data?.map((dev: any) => (
        <div key={dev?.id}>
          <h1>{dev?.username}</h1>
          <p>{dev?.name}</p>
          <p>{dev?.id}</p>
          <p>{dev?.email}</p>
          <p>{dev?.major}</p>
          <p>{dev?.interests}</p>
          <Image
            className="border border-green-500 rounded-full"
            src={dev?.image}
            alt={dev?.username}
            width={200}
            height={200}
          />
        </div>
      ))}
    </section>
  );
}
