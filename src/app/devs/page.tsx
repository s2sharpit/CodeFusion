import { getUsers } from "@/lib/getData";
import Image from "next/image";

export default async function Devs() {
  const users = await getUsers();
  return (
    <section>
      Devs
      <div className="flex gap-4 mt-16">
        {users?.map((dev) => (
          <div key={dev?.id} className="p-4 border border-blue-500 rounded-md">
            <h1>{dev?.username}</h1>
            <p>{dev?.name}</p>
            <p>{dev?.id}</p>
            <p>{dev?.email}</p>
            <p>{dev?.major}</p>
            <p>{dev?.interests}</p>
            <Image
              className="border border-green-500 rounded-full"
              src={dev?.image as string}
              alt={dev?.username}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
