import { Sidebar } from "@/components/home/Sidebar";
import { playlists } from "@/components/home/data/playlists";
import { Button } from "@/components/ui/button";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="w-[15%]"> <Sidebar playlists={playlists} className="hidden lg:block" /></div>
      <div className="w-[70%] px-10">{children}</div>
      <div className="w-[15%]"></div>
    </div>
  );
}
