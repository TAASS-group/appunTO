import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Differences = ({ diff }) => {
  const parseDiff = (diffString) => {
    let oldLineNumber = 1;
    let newLineNumber = 1;

    return (
      diffString
        .split("\n")
        .slice(4) // start parsing after the header lines
        .filter(
          (line) =>
            !line.startsWith("\\ No newline at end of file") &&
            !line.startsWith("@@")
        )
        //remove last
        .slice(0, -1)
        .map((line) => {
          let parsedLine = { content: line.substring(1), type: "context" };

          if (line.startsWith("-")) {
            parsedLine = {
              ...parsedLine,
              type: "deletion",
              oldLineNumber: oldLineNumber++,
              newLineNumber: "",
            };
          } else if (line.startsWith("+")) {
            parsedLine = {
              ...parsedLine,
              type: "addition",
              oldLineNumber: "",
              newLineNumber: newLineNumber++,
            };
          } else {
            parsedLine = {
              ...parsedLine,
              oldLineNumber: oldLineNumber++,
              newLineNumber: newLineNumber++,
            };
          }

          return parsedLine;
        })
    );
  };

  const parsedLines = parseDiff(diff);

  const renderLine = (line, index) => {
    let style = {};
    if (line.type === "deletion") {
      style = { backgroundColor: "#FF6868" };
    } else if (line.type === "addition") {
      style = { backgroundColor: "#66DE93" };
    }

    return (
      <div
        key={index}
        style={{
          ...style,
          display: "flex",
          padding: "5px 10px",
          fontFamily: "monospace",
          borderBottom: "1px solid #ddd",
        }}
      >
        {line.oldLineNumber ? (
          <span
            style={{
              display: "inline-block",
              textAlign: "right",
              paddingRight: "10px",
              borderRight: "1px solid #ddd",
            }}
          >
            {line.oldLineNumber || ""}
          </span>
        ) : (
          <span
            style={{
              display: "inline-block",
              textAlign: "right",
              paddingRight: "10px",
              borderRight: "1px solid #ddd",
            }}
          >
            {line.newLineNumber || ""}
          </span>
        )}
        <span style={{ paddingLeft: "10px" }}>{line.content}</span>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="h-full w-full rounded-r-lg overflow-y-hidden max-h-full">
        {parsedLines.map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
};

export default Differences;
