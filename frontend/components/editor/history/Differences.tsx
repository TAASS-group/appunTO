/* import React from "react";

const Differences = ({ before, after }) => {
  // Function to create a map of changes for easy lookup
  const mapChanges = (data, type) => {
    return data.reduce((acc, item) => {
      acc[item.row] = {
        ...item,
        type,
      };
      return acc;
    }, {});
  };

  const beforeChanges = mapChanges(before, "before");
  const afterChanges = mapChanges(after, "after");

  // Finding the maximum row number to iterate over all possible rows
  const maxRow = Math.max(
    ...before.map((item) => item.row),
    ...after.map((item) => item.row)
  );

  // Function to highlight the words based on the change type
  const highlightWords = (line, wordsChanged, type) => {
    const lineWords = line.split(" ");
    return lineWords.map((word, index) => {
      const key = `${type}-${index}`;
      const highlight = wordsChanged.includes(word);
      if (highlight) {
        const style =
          type === "before"
            ? { backgroundColor: "#ff000033" }
            : { backgroundColor: "#0080003b" };
        return (
          <span key={key} style={style}>
            {word}
          </span>
        );
      }
      return word;
    });
  };

  // Function to render each row with the correct styling
  const renderRow = (rowIndex) => {
    const beforeLine = beforeChanges[rowIndex];
    const afterLine = afterChanges[rowIndex];
    const beforeText = beforeLine
      ? highlightWords(beforeLine.line, beforeLine.wordsChanged, "before")
      : null;
    const afterText = afterLine
      ? highlightWords(afterLine.line, afterLine.wordsChanged, "after")
      : null;

    return (
      <div
        key={`row-${rowIndex}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {beforeText && (
          <div style={{ textDecoration: "line-through", color: "red" }}>
            {rowIndex}
            {beforeText}
          </div>
        )}
        {afterText && (
          <div style={{ color: "green" }}>
            {rowIndex}
            {afterText}
          </div>
        )}
      </div>
    );
  };

  // Render the rows between 0 and the maximum found row
  const renderDiff = () => {
    let rows = [];
    for (let i = 0; i <= maxRow; i++) {
      rows.push(renderRow(i));
    }
    return rows;
  };

  return (
    <div>
      <h3>Diff Viewer</h3>
      {renderDiff()}
    </div>
  );
};

export default Differences;
 */

import React from "react";

const Differences = ({ diff }) => {
  // This function will parse the diff string and return an array of lines with their respective types (addition, deletion, or context)
  const parseDiff = (diffString) => {
    return diffString
      .split("\n")
      .slice(4) // start parsing after the header lines
      .filter(
        (line) =>
          !line.startsWith("\\ No newline at end of file") &&
          !line.startsWith("@@")
      )
      .map((line) => {
        if (line.startsWith("-")) {
          return { type: "deletion", content: line.substring(1) }; // remove the '-' prefix
        } else if (line.startsWith("+")) {
          return { type: "addition", content: line.substring(1) }; // remove the '+' prefix
        } else {
          return { type: "context", content: line };
        }
      });
  };

  // Storing the parsed diff in a state variable
  const parsedLines = parseDiff(diff);

  // This function renders a single line with the appropriate styling
  const renderLine = (line, index) => {
    let style = {};
    if (line.type === "deletion") {
      style = { backgroundColor: "pink", textDecoration: "line-through" };
    } else if (line.type === "addition") {
      style = { backgroundColor: "lightgreen" };
    }

    return (
      <div key={index} style={style}>
        {line.content}
      </div>
    );
  };

  return <div>{parsedLines.map((line, index) => renderLine(line, index))}</div>;
};

export default Differences;
