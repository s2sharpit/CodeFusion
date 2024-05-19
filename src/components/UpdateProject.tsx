"use client";
import { Button, Input, Label } from "@/components/ui";
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
import { deleteProjectAction, updateProjectAction } from "@/data/actions";
import { Project } from "@prisma/client";
import React from "react";
import { LuPencil } from "react-icons/lu";
import { toast } from "sonner";

export default function UpdateProject({ project }: { project: Project }) {
  const handleSave = async (formData: FormData) => {
    const title = String(formData.get("title"));
    if (title) project.title = title;
    const demoVid = String(formData.get("demoVid"));
    if (demoVid) project.demoVid = String(formData.get('demoVid'))

    const result = await updateProjectAction(project);
    if (result?.error) {
      return toast.error(`${result.error}`);
    }
    toast.success("Project updated successfully!");
  };

  async function handleDelete() {
    const result = await deleteProjectAction(project);

    if (result?.error) {
      return toast.error(`${result.error}`);
    }
    toast.success("Project deleted successfully!");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <LuPencil className="text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={handleSave}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Saving changes will update project details by fetching from
              Github.
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
              <Label htmlFor="demoVid">Demo Video Youtube Link:</Label>
              <div className="col-span- flex items-center">
                <span className="text-sm">youtu.be/</span>
                <Input
                  name="demoVid"
                  id="demoVid"
                  placeholder="785iHaicd1w (only add unique identifier)"
                  className="border-0 border-b rounded-none h-7 p-0 focus-visible:border-ring focus-visible:border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                  // required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDelete} variant="destructive">
                Delete
              </Button>
            </DialogClose>
            <div className="flex-grow"></div>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
