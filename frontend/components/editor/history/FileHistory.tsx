"use client";
import React from "react";
import Commit from "./Commit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { genericFetchRequest } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "@/components/icons";
import ImageUploader from "@/components/fileUploader";

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
        `/api/v1/file/getCommmits/${course_id}`,
        "GET"
      );
      return response.json();
    },
    enabled: !!course_id,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="lg:w-[90%] w-full mx-auto overflow-x-scroll lg:overflow-x-auto"
    >
      {commits &&
        commits.map((commit: CommitType, index: number) => (
          <Commit
            key={index}
            commit={commit}
            setSelectedCommit={setSelectedCommit}
            selectedCommit={selectedCommit}
            index={index}
            containerRef={containerRef}
          />
        ))}
      {isLoading && (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <Icons.spinner className="animate-spin w-12 h-12" />
            <p className="text-center">Loading commits</p>
          </div>
        </div>
      )}
      {(error || (commits && commits.length === 0)) && (
        <div className="text-center items-center flex flex-col justify-center min-h-[300px] space-y-8 py-8">
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2ljOGUwMHJteWswdzdvenkzYWtreTg5N2M3bXoxNzB2cTV5bTh5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Gf5pzZxHdyTcs/giphy.gif"
            alt="No commits found"
            width={400}
            height={400}
            className="rounded-md"
          />
          <div className="space-y-2">
            <p className="text-xl md:text-2xl font-bold">
              Oops... it&aposs quite empty here!
            </p>
            <p>
              <span className="block">
                Start the journey by committing today.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
