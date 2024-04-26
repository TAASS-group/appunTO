import { Button } from "@/components/ui/button";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="w-[15%]">left</div>
      <div className="w-[70%]">{children}</div>
      <div className="w-[15%]">right</div>
    </div>
  );
}
