"use client";

import React, { useState } from "react";
import { MdPreview, MdCatalog } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";

const scrollElement = document.documentElement;

export default function MdViewer() {
  const [text] = useState("# Hello Editor");
  const [id] = useState("preview-only");

  return (
    <>
      <MdPreview editorId={id} modelValue={text} />
      <MdCatalog editorId={id} scrollElement={scrollElement} />
    </>
  );
}
