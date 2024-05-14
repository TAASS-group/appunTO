import React from "react";
import { CommitType } from "./FileHistory";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { parseDiffToJSON } from "@/lib/utils";
import Differences from "./Differences";

export default function Commit({ commit }: { commit: CommitType }) {
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

  return (
    <div className="flex flex-row w-full h-[200px]">
      <div className="py-6 pr-2">
        <span className="text-xs text-muted-foreground">
          {format(new Date(commit.createdAt), "dd/MM/yyyy")}
        </span>
      </div>
      <div className="grow px-4 py-6 flex flex-col justify-between border-l-2 border-r-2">
        <div className="font-semibold">{commit.title}</div>
        <div className="text-sm">{commit.message}</div>
        <div className="flex justify-between">
          <Button variant={"outline"}>Comments</Button>
          <div>author</div>
        </div>
      </div>
      <div className="w-1/3 flex-none">
        <Differences diff={diffText} />
      </div>
    </div>
  );
}
