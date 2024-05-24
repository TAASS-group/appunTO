"use client";
import React from "react";
import Commit from "./Commit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { genericFetchRequest } from "@/lib/utils";

export type CommitType = {
  id: string;
  title: string;
  message: string;
  authorName: string;
  authorImg: string;
  createdAt: string;
  comments: string[];
  diff: string;
};

/* const fakeData: CommitType[] = [
  {
    commit: {
      id: "1",
      title: "Initial commit",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      createdAt: "2020-01-01T00:00:00.000Z",
      comments: [],
      profileImage: "https://github.com/shadcn.png",
    },
    diff: `diff --git a/file.txt b/file.txt
    index 89cc574..b45ef6f 100644
    --- a/file.txt
    +++ b/file.txt
    @@ -1,3 +1 @@
    -Hello, World!
    -This is a new line!
    -new line
    \ No newline at end of file
    +Hello, World!
    \ No newline at end of file
    this is a test
    hello`,
  },

  {
    commit: {
      id: "2",
      title: "Initial commit",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      createdAt: "2020-01-01T00:00:00.000Z",
      comments: [],
      profileImage: "https://github.com/shadcn.png",
    },
    diff: "",
  },
  {
    commit: {
      id: "3",
      title: "Initial commit",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      createdAt: "2020-01-01T00:00:00.000Z",
      comments: [],
      profileImage: "https://github.com/shadcn.png",
    },
    diff: "",
  },
]; */

export default function FileHistory() {
  const { course_id } = useParams();
  const [selectedCommit, setSelectedCommit] = React.useState<number | null>(0);
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
    <div className="w-[90%] mx-auto">
      {commits &&
        commits.map((commit: CommitType, index: number) => (
          <Commit
            key={index}
            commit={commit}
            setSelectedCommit={setSelectedCommit}
            selectedCommit={selectedCommit}
            index={index}
          />
        ))}
    </div>
  );
}
