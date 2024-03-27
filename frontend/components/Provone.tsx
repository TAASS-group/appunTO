"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { MdEditor, ExposeParam } from "md-editor-rt";
import { Emoji, Mark, ExportPDF } from "@vavt/v3-extension";
import "@vavt/v3-extension/lib/asset/style.css";

const editorId = "editor-preview";

declare global {
  interface Window {
    editorInstance: any;
  }
}

export default function Provone() {
  const isDebug = true;

  const [md, setMd] = useState("asd");

  const editorRef = useRef<ExposeParam>();

  const tips =
    "Source code of mark, emoji, preview and time extension components in this page: ";

  useEffect(() => {
    if (isDebug) {
      editorRef.current?.on("catalog", (v) => {
        console.log("catalog", v);
      });
      editorRef.current?.on("fullscreen", (v) => {
        console.log("fullscreen", v);
      });
      editorRef.current?.on("htmlPreview", (v) => {
        console.log("htmlPreview", v);
      });
      editorRef.current?.on("pageFullscreen", (v) => {
        console.log("pageFullscreen", v);
      });
      editorRef.current?.on("preview", (v) => {
        console.log("preview", v);
      });

      window.editorInstance = editorRef.current;
    }
  }, [isDebug]);

  return (
    <div className="project-preview">
      <div className="container">
        <MdEditor
          ref={editorRef}
          theme={"dark"}
          previewTheme={"dark"}
          codeTheme={"github"}
          modelValue={md}
          language={"en-US"}
          editorId={editorId}
          autoDetectCode
          defToolbars={[
            <Mark key="mark-extension" />,
            <Emoji key="emoji-extension" />,
            /* <ReadExtension mdText={md} key="read-extension" />, */
            <ExportPDF key="ExportPDF" modelValue={md} height="700px" />,
          ]}
          onSave={(v, h) => {
            console.log("v", v);

            h.then((html) => {
              console.log("h", html);
            });
          }}
          toolbars={[
            "bold",
            "underline",
            "italic",
            "strikeThrough",
            "-",
            "title",
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
            0,
            1,
            2,
            3,
            "-",
            "revoke",
            "next",
            "save",
            "=",
            "prettier",
            "pageFullscreen",
            "fullscreen",
            "preview",
            "htmlPreview",
            "catalog",
            "github",
          ]}
          onChange={(value: string) => setMd(value)}
          onUploadImg={async (
            files: Array<File>,
            callback: (urls: string[]) => void
          ) => {
            const res = await Promise.all(
              files.map((file) => {
                return new Promise((rev, rej) => {
                  const form = new FormData();
                  form.append("file", file);

                  console.log("file", file);
                });
              })
            );

            callback(res.map((item: any) => item.data.url));
          }}
          footers={["markdownTotal", "=", 0, "scrollSwitch"]}
        />
        <br />
        <span className="tips-text">
          {tips}
          <a
            href="https://github.com/imzbf/md-editor-rt/tree/docs/src/components"
            target="_blank"
          >
            components
          </a>
        </span>
      </div>
    </div>
  );
}
