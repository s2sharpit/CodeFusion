import { Modal } from "@/components/Modal";
import { Title, Label, Input, Textarea, Button } from "@/components/ui";
import { auth } from "@/lib/auth";
export default async function HII() {
  const session = await auth();
  return (
    <Modal>
      <Title size="sm">
        Add <span className="text-primary">New</span> Project
      </Title>
      <form action="" className="">
        <div className="grid w-full max-w-xl items-center gap-1.5">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" type="text" placeholder="Project Title" />
        </div>
        <div className="grid w-full max-w-xl items-center gap-1.5">
          <Label htmlFor="repo">Repository</Label>
          <div className="flex items-center">
            <span className="">github.com/{session?.user.username}/</span>
            <Input
              id="repo"
              type="text"
              placeholder="Repository URL"
              className="border-0 rounded-none border-b focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}
