"use client";
import React from "react";
import Commit from "./Commit";

export type CommitType = {
  id: string;
  title: string;
  message: string;
  author: {
    name: string;
    img: string;
  };
  createdAt: string;
  comments: string[];
};

const fakeData: CommitType[] = [
  {
    id: "1",
    title: "Initial commit",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: {
      name: "<NAME>",
      img: "https://avatars.githubusercontent.com/u/123456789?v=4",
    },
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
  {
    id: "2",
    title: "Add new feature",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit vel met tellus et sapien et sapien et sapien",
    author: {
      name: "<NAME>",
      img: "https://avatars.githubusercontent.com/u/123456789?v=4",
    },
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
  {
    id: "3",
    title: "Fix bug",
    message: "Fix bug",
    author: {
      name: "<NAME>",
      img: "https://avatars.githubusercontent.com/u/123456789?v=4",
    },
    createdAt: "2020-01-01T00:00:00.000Z",
    comments: [],
  },
];

export default function FileHistory() {
  const [commits, setCommits] = React.useState<CommitType[]>(fakeData);
  return (
    <div className="w-full">
      {commits.map((commit: CommitType, index: number) => (
        <Commit key={index} commit={commit} />
      ))}
    </div>
  );
}
