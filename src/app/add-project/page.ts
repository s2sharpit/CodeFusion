import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await auth();

    redirect(`/${session?.user.username}`)
}
