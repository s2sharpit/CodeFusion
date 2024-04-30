import { Badge, Button, Subtle, Wrapper } from "@/components/ui";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getUsers } from "@/data/getData";
import { getGhUser } from "@/data/getGhData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuPencil } from "react-icons/lu";
import CopyURL from "./CopyURL";
import DevForm from "./DevForm";

export default async function DevCard({
  paramsUser,
  isEditable,
}: {
  paramsUser: string;
  isEditable: boolean;
}) {
  const usersData = await getUsers();
  const ghUser = await getGhUser(paramsUser);

  // ! error using in server components, do not uncomment
  // if (!usersData.users || usersData.error) {
  //   toast.error(usersData.error)
  // }

  const user = usersData?.users.find((dev) => dev.username === paramsUser);

  if (!user) {
    notFound();
  }

  return (
    <Wrapper className="p-4 rounded-md border border-border mt-0 md:sticky md:h-min md:top-28">
      <Dialog>
        <div className="flex w-full justify-between">
          <h4 className="font-semibold">@{user?.username}</h4>
          <div className="flex gap-2 -mt-2">
            {isEditable && (
              <DialogTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                  <LuPencil className="text-lg" />
                </Button>
              </DialogTrigger>
            )}
            <CopyURL />
          </div>
        </div>
        <picture className="grid place-items-center gap-2">
          <Image
            src={user.image as string}
            alt={user.username}
            width={200}
            height={200}
            className="rounded-full w-36 h-36"
          />
          <Subtle size={"sm"}>{user?.name}</Subtle>
        </picture>

        <p className="text-center text-pretty text-sm">{user?.bio}</p>
        {user?.skills.length > 0 ? (
          <div className="grid place-items-center gap-2">
            <h4 className="text-primary font-medium text-sm">Skills</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {user?.skills.map((skill) => (
                <Badge variant={"secondary"} key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ) : isEditable && (
          <DialogTrigger asChild>
            <Button>
              Add Skills
            </Button>
          </DialogTrigger>
        )}

        <div className="flex flex-row flex-wrap justify-center items-center xsm:mx-auto ">
          {ghUser?.social_accounts.map(
            ({ provider, url, icon }: SocialAccount) => (
              <div className="mx-4" key={provider}>
                <Link
                  href={url ?? ""}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer inline-flex h-10 items-center rounded-lg  font-extrabold text-[1.5rem] hover:scale-110 transition-all duration-300 ease-in-out hover:text-purple-500"
                  aria-label={`Follow us on ${provider}`}
                  title={`${provider}(External Link)`}
                >
                  {icon}
                </Link>
              </div>
            )
          )}
        </div>

        <DevForm user={user} ghUser={ghUser} />
      </Dialog>
    </Wrapper>
  );
}
