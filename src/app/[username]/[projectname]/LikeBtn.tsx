'use client'
import { updateLikeAction } from "@/data/actions";
import { Project } from "@prisma/client";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "sonner";

export default function LikeBtn({
  username,
  project,
}: {
  username: string;
  project: Project;
}) {
  const handleLike = async () => {
    const result = await updateLikeAction(project);

    if (result?.error) {
      return toast.error(result.error);
    }
  };
  return (
    <form action={handleLike}>
      <button
        type="submit"
        disabled={!username}
        className="text-2xl p-1 pb-0 grid gap-0 hover:text-primary"
      >
        {project.likes.includes(username) ? (
          <FaHeart className="text-red-700" />
        ) : (
          <FaRegHeart />
        )}
        <span className="text-xs font-semibold">{project.likes.length}</span>
      </button>
    </form>
  );
}
