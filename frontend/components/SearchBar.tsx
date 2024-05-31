"use client";

import { Search } from "lucide-react";
import React, { useRef } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export default function SearchBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  //if i click outside of ref
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="hidden lg:block relative w-1/3">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className={`pl-8 z-30 relative  rounded-lg`}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute top-[90%] left-0 w-full z-20 bg-white border border-t-0 rounded-b-md transition-all">
          <ScrollArea className="h-[35vh] w-full ">
            <div className="p-4">
              <div className=" py-2 font-bold cursor-pointer border-b-2">
                corso
              </div>

              <div className=" py-2 font-bold cursor-pointer border-b-2">
                corso
              </div>
              <div className=" py-2 font-bold cursor-pointer border-b-2">
                corso
              </div>
              <div className=" py-2 font-bold cursor-pointer border-b-2">
                corso
              </div>
              <div className=" py-2 font-bold cursor-pointer border-b-2">
                corso
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
