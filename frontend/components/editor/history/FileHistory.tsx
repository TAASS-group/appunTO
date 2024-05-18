"use client";
import React, { use, useEffect } from "react";
import Commit from "./Commit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { genericFetchRequest } from "@/lib/utils";

export type CommitType = {
  commit: {
    id: string;
    title: string;
    message: string;
    author: string;
    createdAt: string;
    comments: string[];
  };
  diff: string;
};

/* const fakeData: CommitType[] = [
  {
    id: "1",
    title: "Initial commit",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "John Doe",
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
  {
    id: "2",
    title: "Add new feature",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit vel met tellus et sapien et sapien et sapien",
    author: "John Doe",
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
  {
    id: "3",
    title: "Fix bug",
    message: "Fix bug",
    author: "John Doe",
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
]; */

export default function FileHistory() {
  const { course_id } = useParams();

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: commits,
  } = useQuery({
    queryKey: ["commits", course_id],
    queryFn: async () => {
      const response = await genericFetchRequest(
        `/file/getCommmits/${course_id}`,
        "GET"
      );
      return response.json();
    },
    enabled: !!course_id,
  });

  return (
    <div className="w-full">
      {commits &&
        commits.map((commit: CommitType, index: number) => (
          <Commit key={index} commit={commit} />
        ))}
    </div>
  );
}
