import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDiffToJSON(diffText: string) {
  const lines = diffText.split("\n");
  const result: any = {
    before: [],
    after: [],
  };
  let lineNumberBefore = 0;
  let lineNumberAfter = 0;

  lines.forEach((line) => {
    // Skip non-diff lines
    if (
      line.startsWith("diff") ||
      line.startsWith("index") ||
      line.startsWith("---") ||
      line.startsWith("+++")
    ) {
      return;
    }

    if (line.startsWith("@@")) {
      // Extract line numbers (simplified, assumes only starts are listed)
      const matches = line.match(/-(\d+),(\d+) +(\d+),(\d+)/);
      lineNumberBefore = matches ? parseInt(matches[1], 10) - 1 : 0; // Adjust because we'll increment before using
      lineNumberAfter = matches ? parseInt(matches[3], 10) - 1 : 0; // Same adjustment
      return;
    }

    const content = line.substring(1); // Remove the +, -, or space at the beginning
    if (line.startsWith("-")) {
      result.before.push({
        row: ++lineNumberBefore,
        line: content,
        wordsChanged: content.split(" "), // Simplification, would need more logic for real "changed words"
      });
    } else if (line.startsWith("+")) {
      result.after.push({
        row: ++lineNumberAfter,
        line: content,
        wordsChanged: content.split(" "), // Simplification
      });
    } else {
      // Context line, increment both line numbers
      lineNumberBefore++;
      lineNumberAfter++;
    }
  });

  return result;
}
