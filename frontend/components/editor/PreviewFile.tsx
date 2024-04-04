"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MdPreview,
  MdCatalog,
  MdEditor,
  ToolbarNames,
  StaticTextDefaultValue,
  ExposeParam,
} from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import "md-editor-rt/lib/style.css";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
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
export default function PreviewFile() {
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

  const [id] = useState("preview-only");
  const [preview, setPreview] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [text, setText] = useState(textprova);

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
      if (preview == true) {
        el.style.visibility = "hidden";
        el.style.width = "0";
      } else {
        el.style.visibility = "visible";
        el.style.width = "50%";
      }
    }
  }, [preview]);

  const editorRef = useRef<ExposeParam>();

  const { theme } = useTheme();
  const save = () => {
    console.log(text);
  };

  const downloadMd = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "appunto.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="flex flex-col w-full overflow-hidden px-4 pt-8">
      <div className="flex flex-col">
        <div className="text-center">
          <span className="text-xl">
            <span className="font-semibold">Titolo appunto</span>{" "}
            <span className="text-sm">written by</span>{" "}
            <span className="font-semibold">Me</span>
          </span>
        </div>
        <div className="w-full flex justify-between py-4">
          <div className="flex gap-4">
            <Button onClick={() => setPreview((prev) => !prev)}>
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button>asd</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Download</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem
                  onClick={() => editorRef?.current?.triggerSave()}
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
            <Button disabled={text == textprova} onClick={save}>
              Save
            </Button>
            <Button
              variant={"outline"}
              className="border-destructive text-destructive"
              disabled={text == textprova}
              onClick={() => setText(textprova)}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <ExportPDF key="ExportPDF" modelValue={text} height="700px" />
      <div>
        <MdEditor
          className="!w-full !max-w-full"
          ref={editorRef}
          editorId={id}
          modelValue={text}
          onChange={setText}
          language={"en-US"}
          defToolbars={[
            <Mark key="mark-extension" />,
            <Emoji key="emoji-extension" />,
            <ExportPDF key="ExportPDF" modelValue={text} height="700px" />,
          ]}
          toolbars={preview ? previewToolbar : editToolbar}
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
      </div>
    </div>
  );
}
