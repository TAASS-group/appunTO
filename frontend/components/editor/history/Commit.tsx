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
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  containerRef,
}: {
  commit: CommitType;
  setSelectedCommit: (id: number) => void;
  selectedCommit: number | null;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<commentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();

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
      `/api/v1/comment/getbycommit/${commitId}`,
      "GET"
    );
    const res = await data.json();
    console.log("Comments", res);
    setComments(res);
  };

  const addComments = async (commitId: string) => {
    console.log("Saving comments for commit", commitId);
    const data = await genericFetchRequest(
      `/api/v1/comment/add`,
      "POST",
      {
        author: (session?.user as any).uid,
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
      className={`flex flex-row w-full min-h-[200px]  rounded-lg ${
        index == selectedCommit ? "bg-gray-100 " : ""
      } hover:outline-1 hover:outline outline-gray-200	`}
      onClick={() => {
        setSelectedCommit(index);
        //scroll all to right or left based on current position
        setTimeout(() => {
          if (containerRef.current) {
            const scrollPosition = containerRef.current.scrollLeft;
            const totalWidth =
              containerRef.current.scrollWidth -
              containerRef.current.clientWidth;

            if (scrollPosition < totalWidth) {
              // If not at the end, scroll to the right
              containerRef.current.scrollTo({
                left: totalWidth,
                behavior: "smooth",
              });
            } else {
              // If at the end, scroll to the left
              containerRef.current.scrollTo({
                left: 0,
                behavior: "smooth",
              });
            }
          }
        }, 100);
      }}
    >
      {commit && (
        <>
          <div className="hidden lg:block py-6 pr-2 mx-4">
            <span className="text-xs text-muted-foreground">
              {format(new Date(commit.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="grow px-4 py-6 flex flex-col justify-between lg:border-l-2 lg:border-r-2 min-w-full lg:min-w-0 lg:w-auto">
            <div className="grow flex flex-col lg:space-y-8 space-y-2 justify-between">
              <span className="lg:hidden text-xs text-muted-foreground">
                {format(new Date(commit.createdAt), "dd/MM/yyyy")}
              </span>
              <div className="font-semibold">{commit.title}</div>
              <div className="text-sm">{commit.message}</div>
              <div className="flex justify-between items-center">
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    getComments(commit.id);
                    e.stopPropagation();
                  }}
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
                <div className="flex items-center gap-2 lg:p-4 mt-2">
                  <Textarea
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    placeholder="Add a comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addComments(commit.id);
                    }}
                    disabled={!commentText.trim()}
                  >
                    Add
                  </Button>
                </div>
                {comments &&
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="lg:p-4 mt-2 flex space-y-2 text-xs flex-col border-t py-2"
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
          <ScrollArea className="w-fit lg:w-1/3 flex-none h-[228px] flex items-center">
            {selectedCommit == index && commit.diff && (
              <Differences diff={commit.diff} />
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
}
