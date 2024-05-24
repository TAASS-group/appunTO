import React, { useCallback, useState } from "react";
import { CommitType } from "./FileHistory";
import { format, set } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { genericFetchRequest, parseDiffToJSON } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Differences from "./Differences";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type commentType = {
  id: string;
  text: string;
  createdAt: Date;
  authorName: string;
  authorImg: string;
};

export default function Commit({
  commit,
  setSelectedCommit,
  selectedCommit,
  index,
}: {
  commit: CommitType;
  setSelectedCommit: (id: number) => void;
  selectedCommit: number | null;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<commentType[]>([]);
  const [commentText, setCommentText] = useState("");

  /* const diffText = `diff --git a/file.txt b/file.txt
  index 89cc574..b45ef6f 100644
  --- a/file.txt
  +++ b/file.txt
  @@ -1,3 +1 @@
  -Hello, World!
  -This is a new line!
  -new line
  \ No newline at end of file
  +Hello, World!
  \ No newline at end of file`; */
  const diffText = `diff --git a/file.txt b/file.txt
  index 89cc574..b45ef6f 100644
  --- a/file.txt
  +++ b/file.txt
  @@ -1,4 +1,4 @@
  Hello, World!
  -This is a new line!
  +This is a modified line!
  new line
  -Another new line
  \ No newline at end of file
  +Another modified line!
  \ No newline at end of file
  `;

  const diff = parseDiffToJSON(diffText);

  const getComments = async (commitId: string) => {
    if (isOpen) {
      setIsOpen((x) => !x);
      return;
    }
    setIsOpen((x) => !x);
    console.log("Getting comments for commit", commitId);
    const data = await genericFetchRequest(
      `/comment/getbycommit/${commitId}`,
      "GET"
    );
    const res = await data.json();
    console.log("Comments", res);
    setComments(res);
  };

  const addComments = async (commitId: string) => {
    console.log("Saving comments for commit", commitId);
    const data = await genericFetchRequest(
      `/comment/add`,
      "POST",
      {
        author: "kDrhnFfbJFQBCjlltn40lqGPewG2",
        text: commentText,
        createdAt: new Date(),
        commit: { id: commitId },
      },
      { "Content-Type": "application/json" }
    );
    const res = await data.json();
    setCommentText("");
    setComments((x) => [...x, res]);
    console.log("Comments", res);
  };
  return (
    <div
      className={`flex flex-row w-full min-h-[200px] ${
        index == selectedCommit ? "bg-gray-100 rounded-lg" : ""
      }`}
      onClick={() => setSelectedCommit(index)}
    >
      {commit && (
        <>
          <div className="py-6 pr-2 mx-4">
            <span className="text-xs text-muted-foreground">
              {format(new Date(commit.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="grow px-4 py-6 flex flex-col justify-between border-l-2 border-r-2">
            <div className="grow flex flex-col space-y-8 justify-between">
              <div className="font-semibold">{commit.title}</div>
              <div className="text-sm">{commit.message}</div>
              <div className="flex justify-between items-center">
                <Button
                  variant={"outline"}
                  onClick={() => getComments(commit.id)}
                >
                  Comments
                </Button>
                <div className="flex items-center gap-2 mx-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={commit.authorImg} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex justify-center">{commit.authorName}</div>{" "}
                </div>
              </div>
            </div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="flex items-center gap-2 p-4">
                  <Textarea
                    placeholder="Add a comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />

                  <Button
                    onClick={() => addComments(commit.id)}
                    disabled={!commentText.trim()}
                  >
                    Add
                  </Button>
                </div>
                {comments &&
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="p-4 flex space-y-2 text-xs flex-col border-t py-2"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={comment.authorImg} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex justify-center">
                            {comment.authorName}
                          </div>
                        </div>
                        <span className="text-muted-foreground">
                          {format(new Date(comment.createdAt), "dd/MM/yyyy")}
                        </span>
                      </div>

                      <div className="flex justify-between">{comment.text}</div>
                    </div>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="w-1/3 flex-none flex items-center">
            {selectedCommit == index && commit.diff && (
              <Differences diff={commit.diff} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
