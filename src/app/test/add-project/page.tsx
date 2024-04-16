import { auth } from "@/lib/auth";
import { addProject } from "@/lib/setData";

export default async function page() {
  const session = await auth();
  const send = async () => {
    'use server'
    await addProject({
      userId: session?.user.id as string,
      title: "ARB Bookings",
      description: "Project description of the project ARB Bookings goes here. This is a placeholder for now.",
      repo: "https://github.com/s2shar/ARBbookings",
      images: ["https://s2sharpit.me/dp"],
      tags: ["tag1", "tag2"],
      techStacks: ["tech1", "tech2"],
      likes: ["s2shar", "s2sharpit"],
      collaborators: [
        { username: "s2shar", role: "frontend" },
        { username: "s2sharpit", role: "backend" },
      ],
    });
  };
  return (
    <form
    className="p-8"
      action={send}
    >
      <button
        className="flex max-md:flex-col items-center max-md:text-xs md:gap-2 pb-0.5 pt-1 md:py-2 px-3 rounded-md font-medium md:font-semibold bg-white hover:bg-gray-200 transition text-black"
        type="submit"
      >
        Add Project
      </button>
    </form>
  );
}
