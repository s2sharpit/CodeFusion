"use client";
import React, { useState } from "react";
import { Badge, Button, Input, Label } from "@/components/ui";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LuX } from "react-icons/lu";
import { editUserAction } from "@/data/actions";
import { toast } from "sonner";

export default function DevForm({
  skills: initialSkills,
}: {
  skills: string[];
}) {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && newSkill.trim() !== "") {
      e.preventDefault();
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillIndex: number) => {
    const updatedSkills = skills.filter((_, index) => index !== skillIndex);
    setSkills(updatedSkills);
  };

  const handleSubmit = async () => {
    let updatedSkills = [...skills];
    if (newSkill.trim() !== "") {
      updatedSkills.push(newSkill.trim());
      setSkills([...skills, newSkill.trim()])
      setNewSkill("");
    }

    const result = await editUserAction(updatedSkills);

    if (result?.error) {
      return toast.error(`${result.error}`);
    }
    toast.success("User details updated successfully!");
  };

  return (
    <DialogContent>
      <form action={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
          <DialogDescription>
            Refetch the updated data from Github or add skills.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2.5">
            <Label htmlFor="skills">
              Edit Skills (Use like ReactJS, not like React.js)
            </Label>
            <div className="border border-border p-2 rounded-md flex flex-wrap  gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-secondary rounded-full h-min"
                >
                  <Badge variant={"secondary"} className="pr-1">
                    {skill}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(index)}
                    className="p-1 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20"
                  >
                    <LuX className="text-sm" />
                  </button>
                </div>
              ))}
              <Input
                name="skills"
                id="skills"
                placeholder="Enter Skills"
                className="h-auto w-auto py-1"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
