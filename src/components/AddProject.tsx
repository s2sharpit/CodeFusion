'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input, Label } from "@/components/ui";
import { createProjectAction } from "@/data/actions";
import { toast } from "sonner";
import { Session } from "next-auth";

export default function AddProject({ session }: { session: Session }) {
  async function handleSubmit(formData: FormData) {
    const result = await createProjectAction(formData);

    if (result?.error) {
      return toast.error(`${result.error}`);
    }
    toast.success("Project added successfully!");
  }

  return (
    <div className="flex justify-end items-center gap-8 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <form action={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Before adding the project, make sure all details like
                description, topics, and collaborators are included in your
                public GitHub repository.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Enter Project Title"
                  // required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="repo">Github Repo:</Label>
                <div className="col-span- flex items-center">
                  <span className="text-sm">
                    github.com/{session?.user.username}/
                  </span>
                  <Input
                    name="repo"
                    id="repo"
                    className="border-0 border-b rounded-none h-7 p-0 focus-visible:border-ring focus-visible:border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    // required
                  />
                </div>
              </div>
              <div className="grid gap-2.5"></div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
