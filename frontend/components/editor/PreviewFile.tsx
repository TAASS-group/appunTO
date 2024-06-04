"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  MdPreview,
  MdCatalog,
  MdEditor,
  ToolbarNames,
  StaticTextDefaultValue,
  ExposeParam,
  Themes,
} from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import "md-editor-rt/lib/style.css";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  Pencil,
  Eye,
  History,
  ArrowDownToLine,
  TimerReset,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { exportAsPdf } from "./export";
import { Emoji, Mark, ExportPDF } from "@vavt/rt-extension";
import "@vavt/rt-extension/lib/asset/style.css";
import FileHistory from "./history/FileHistory";
import { genericFetchRequest } from "@/lib/utils";
import { useParams } from "next/navigation";
import { CommitDialog } from "./commitDialog";
import { useSession } from "next-auth/react";
export default function PreviewFile() {
  const { course_id } = useParams();

  const queryClient = useQueryClient();
  const textprova = `## 😲 md-editor-rt

Markdown Editor for React, developed in jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript<supsubscript>26</supsubscript subscript<sub>[1]</sub>inline code，[link](https://github.com/imzbf)

> quote: I Have a Dream

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] Friday
- [ ] Saturday
- [x] Sunday

![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🤗 Demo



## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table

| nickname | from             |
| -------- | ---------------- |
| zhijian  | ChongQing, China |

## 📏 Formula

Inline: $x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 🧬 Diagram


## 🪄 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

## ☘️ em...
`;

  const [likeCount, setLikeCount] = useState(0);
  const { isLoading, error, data } = useQuery({
    queryKey: ["getFileContent", course_id],
    queryFn: async () => {
      const res = await genericFetchRequest(
        `/api/v1/file/getFileContent/${course_id}`,
        "GET"
      );
      console.log(res);
      return res.text();
    },
    enabled: !!course_id, // !! is a trick to convert a string to a boolean
  });

  const { data: title } = useQuery({
    queryKey: ["getFileTitle", course_id],
    queryFn: async () => {
      /* const res = await fetch(
        `http://localhost:8080/course/getCourseById/${course_id}`
      ); */
      const res = await genericFetchRequest(
        `/course/getCourseById/${course_id}`,
        "GET"
      );
      console.log(res);
      const data = await res.json();
      return data.name;
    },
    enabled: !!course_id,
  });

  const { data: isEnrolled } = useQuery({
    queryKey: ["getIsEnrolled", course_id],
    queryFn: async () => {
      /* const res = await fetch(
        `http://localhost:8080/user/enrolledCourses?uid=${session?.user?.uid}`
      ); */
      const res = await genericFetchRequest(
        `/user/enrolledCourses?uid=${session?.user?.uid}`,
        "GET"
      );
      if (!res.ok) return false;
      const data = await res.json();

      for (const course of data) {
        if (course == course_id) {
          console.log("isEnrolled", course);
          return true;
        }
      }
      console.log("isEnrolled", false);
      return false;
    },
    enabled: !!course_id,
  });

  const { data: enrolledCount } = useQuery({
    queryKey: ["getEnrolledCount", course_id],
    queryFn: async () => {
      /* const res = await fetch(
        `http://localhost:8080/user/enrolledCoursesCount?courseId=${course_id}`,
        {
          method: "GET",
        }
      ); */
      const res = await genericFetchRequest(
        `/user/enrolledCoursesCount?courseId=${course_id}`,
        "GET"
      );
      const data = await res.json();
      console.log("enrolledCount", data);

      return data;
    },
    enabled: !!course_id,
  });

  const enroll = async () => {
    console.log("enroll", isEnrolled);
    if (!isEnrolled) {
      /*  await fetch(
        `http://localhost:8080/user/enroll?uid=${session?.user?.uid}&courseId=${course_id}`,
        {
          method: "GET",
        }
      ); */
      await genericFetchRequest(
        `/user/enroll?uid=${session?.user?.uid}&courseId=${course_id}`,
        "GET"
      );
    } else {
      /*  await fetch(
        `http://localhost:8080/user/leave?uid=${session?.user?.uid}&courseId=${course_id}`,
        {
          method: "GET",
        }
      ); */

      await genericFetchRequest(
        `/user/leave?uid=${session?.user?.uid}&courseId=${course_id}`,
        "GET"
      );
    }
    queryClient.invalidateQueries({ queryKey: ["getIsEnrolled"] });
    queryClient.invalidateQueries({ queryKey: ["getEnrolledCount"] });
  };

  // TODO: check if is the correct way to set the text
  useEffect(() => {
    if (data) {
      setText(data);
      setPreviusText(data);
    }
  }, [data]);

  const [id] = useState("preview-only");
  const [status, setStatus] = useState<"edit" | "preview" | "history">("edit");
  const [catalog, setCatalog] = useState(false);
  const [text, setText] = useState(textprova);
  const [previusText, setPreviusText] = useState(textprova);

  const [isHovered, setIsHovered] = useState(false);

  const { data: session } = useSession();

  const previewToolbar: ToolbarNames[] = [
    "=",
    "pageFullscreen",
    "fullscreen",
    "catalog",
  ];

  const editToolbar: ToolbarNames[] = [
    "bold",
    "underline",
    "italic",
    "-",
    "strikeThrough",
    "sub",
    "sup",
    "quote",
    "unorderedList",
    "orderedList",
    "task",
    "-",
    "codeRow",
    "code",
    "link",
    "image",
    "table",
    "mermaid",
    "katex",
    "-",
    "revoke",
    "next",
    0,
    1,
    2,
    3,
    "=",
    "pageFullscreen",
    "fullscreen",
    "catalog",
  ];

  useEffect(() => {
    if (document) {
      const el = document.getElementsByClassName(
        "md-editor-input-wrapper"
      )[0] as HTMLDivElement;
      if (status == "preview") {
        el.style.visibility = "hidden";
        el.style.width = "0";
      } else if (status == "edit") {
        el.style.visibility = "visible";
        el.style.width = "50%";
      }
    }
  }, [status]);

  const editorRef = useRef<ExposeParam>();

  const { theme } = useTheme();
  const save = async () => {
    //
    await genericFetchRequest(
      `/api/v1/file/updatefile/${course_id}`,
      "POST",
      {
        content: text,
        author: "author",
        message: "update to a new version",
      },
      { "Content-Type": "application/json" }
    );

    alert("saved");
    queryClient.invalidateQueries({ queryKey: ["getFileContent"] });
  };

  const downloadMd = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "appunto.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onSubmit = async (title: string, message: string) => {
    await genericFetchRequest(
      `/api/v1/file/updatefile/${course_id}`,
      "POST",
      {
        title,
        content: text,
        author: (session?.user as any).uid,
        message,
      },
      { "Content-Type": "application/json" }
    );
    queryClient.invalidateQueries({ queryKey: ["getFileContent"] });
  };

  const exportPdfRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full lg:px-4 lg:pt-8 px-2 pt-4">
      <div className="flex flex-col">
        <div className="text-center flex lg:flex-row flex-col lg:justify-center items-center gap-4">
          <span className="text-2xl font-semibold">{title}</span>
        </div>
        <div className="w-full flex justify-between lg:flex-row py-4 gap-2">
          <div className="flex gap-2 lg:justify-start item-center">
            <Button
              className="lg:hidden"
              size={"icon"}
              onClick={() =>
                setStatus((prev) => (prev != "edit" ? "edit" : "preview"))
              }
            >
              {status != "edit" ? (
                <Pencil className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              className="capitalize hidden lg:block"
              onClick={() =>
                setStatus((prev) => (prev != "edit" ? "edit" : "preview"))
              }
            >
              {status != "edit" ? "edit" : "preview"}
            </Button>

            <Button
              className="lg:hidden"
              size={"icon"}
              onClick={() => setStatus("history")}
            >
              <History className="h-4 w-4" />
            </Button>
            <Button
              className="hidden lg:block"
              onClick={() => setStatus("history")}
            >
              History
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <div className="hidden lg:block">Download</div>
                  <ArrowDownToLine className="lg:hidden h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem
                  onClick={() => exportAsPdf(exportPdfRef.current)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Pdf</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadMd}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Markdown</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-2 justify-center lg:justify-start">
            <CommitDialog onSubmit={onSubmit} clickable={text == previusText} />

            {/* <Button disabled={text == previusText} onClick={save}>
              Save
            </Button> */}
            <Button
              variant={"outline"}
              className="border-destructive text-destructive"
              disabled={text == previusText}
              onClick={() => setText(previusText)}
            >
              <div className="hidden lg:block">Reset</div>
              <TimerReset className="lg:hidden h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        {status === "history" ? (
          <FileHistory />
        ) : (
          <div>
            <MdEditor
              className="!w-full !max-w-full"
              ref={editorRef}
              editorId={id}
              modelValue={text}
              theme={(theme as Themes) || "light"}
              onChange={setText}
              language={"en-US"}
              defToolbars={[
                <Mark key="mark-extension" />,
                <Emoji key="emoji-extension" />,
              ]}
              toolbars={status == "preview" ? previewToolbar : editToolbar}
              onSave={(value, html) => {
                html.then((h) => {
                  exportAsPdf(h);
                });

                /* html.then((h) => {
              const doc = new jsPDF();
              const htmltag = document.createElement("html");
              const bodytag = document.createElement("body");
              bodytag.innerHTML = h;
              htmltag.appendChild(bodytag);

              const parsed = new DOMParser().parseFromString(h, "text/html");
              doc.html(parsed, {
                callback: function (doc) {
                  // Save the PDF
                  doc.save("sample-document.pdf");
                },
                x: 15,
                y: 15,
                width: 170, //target width in the PDF document
                windowWidth: 650, //window width in CSS pixels
              });
            }); */
              }}
            />
            <div className="flex gap-2 justify-center py-4">
              <Button className="flex gap-2 px-2 items-center" onClick={enroll}>
                <motion.span
                  key={enrolledCount}
                  className=""
                  initial={{ y: +10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  {enrolledCount}
                </motion.span>
                {!isEnrolled ? (
                  <ThumbsUp className="h-5 w-5" />
                ) : (
                  <ThumbsDown className="h-5 w-5" />
                )}
              </Button>

              <Button
                className="flex gap-2 px-2 items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Forum</span>
                <motion.div
                  animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MessageSquare className="h-5 w-5" />
                </motion.div>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden">
        <div ref={exportPdfRef}>
          <MdPreview
            editorId={"daksjdk"}
            modelValue={text}
            theme={(theme as Themes) || "light"}
            style={{ padding: "10mm" }}
          />
        </div>
      </div>
    </div>
  );
}
