"use client";

import React, { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { exportAsPdf } from "./export";
import { Emoji, Mark, ExportPDF } from "@vavt/rt-extension";
import "@vavt/rt-extension/lib/asset/style.css";
import FileHistory from "./history/FileHistory";
import { genericFetchRequest } from "@/lib/utils";
import { useParams } from "next/navigation";
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

  const { isLoading, error, data } = useQuery({
    queryKey: ["getFileContent", course_id],
    queryFn: async () => {
      const res = await genericFetchRequest(
        `/file/getFileContent/${course_id}`,
        "GET"
      );
      console.log(res);
      return res.text();
    },
    enabled: !!course_id, // !! is a trick to convert a string to a boolean
  });

  // TODO: check if is the correct way to set the text
  useEffect(() => {
    if (data) {
      setText(data);
      setPreviusText(data);
    }
  }, [data]);

  /* useEffect(() => {
    if (error) {
      alert("il corso cercato non esiste");
    }
  }, [error]); */

  const [id] = useState("preview-only");
  const [status, setStatus] = useState<"edit" | "preview" | "history">(
    "history"
  );
  const [catalog, setCatalog] = useState(false);
  const [text, setText] = useState(textprova);
  const [previusText, setPreviusText] = useState(textprova);

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
    await genericFetchRequest("/file/updatefile/test1", "POST", {
      content: text,
      author: "author",
      message: "update to a new version",
    });
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

  const exportPdfRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full overflow-hidden px-4 pt-8">
      <div className="flex flex-col">
        <div className="text-center">
          <span className="text-2xl font-semibold">Title</span>
        </div>
        <div className="w-full flex justify-between py-4">
          <div className="flex gap-4">
            <Button
              className=" capitalize"
              onClick={() =>
                setStatus((prev) => (prev != "edit" ? "edit" : "preview"))
              }
            >
              {status != "edit" ? "edit" : "preview"}
            </Button>
            <Button onClick={() => setStatus("history")}>History</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Download</Button>
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
          <div className="flex gap-4">
            <Button disabled={text == previusText} onClick={save}>
              Save
            </Button>
            <Button
              variant={"outline"}
              className="border-destructive text-destructive"
              disabled={text == previusText}
              onClick={() => setText(previusText)}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div>
        {status === "history" ? (
          <FileHistory />
        ) : (
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