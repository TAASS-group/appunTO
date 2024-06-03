"use client";

import { Search } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { genericFetchRequest } from "@/lib/utils";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const debouncedFilter = useDebounce(searchValue, 500);
  const { isLoading, error, data } = useQuery({
    queryKey: ["search", debouncedFilter],
    queryFn: async () => {
      try {
        const res = await genericFetchRequest(
          `/course/findCourse?name=${debouncedFilter}`,
          "GET"
        );
        const result = await res.json();
        return result;
      } catch (error) {
        return [];
      }
    },
    enabled: !!debouncedFilter,
  });

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
  const router = useRouter();

  return (
    <div ref={ref} className="hidden lg:block relative w-1/3">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className={`pl-8 z-30 relative  rounded-lg`}
        onFocus={() => setIsOpen(true)}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {isOpen && (
        <div className="absolute top-[90%] left-0 w-full z-20 bg-white border border-t-0 rounded-b-md transition-all">
          <ScrollArea className="h-[35vh] w-full py-4 px-2 ">
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <Icons.spinner className="w-8 h-8"></Icons.spinner>
              </div>
            )}
            {!isLoading &&
              data &&
              data.length > 0 &&
              data.map((course: any) => {
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/${course.id}`);
                    }}
                    className="w-full p-2 grid grid-cols-2 border rounded-lg cursor-pointer text-xs gap-2 hover:bg-muted hover:bg-opacity-10"
                  >
                    <div className=" text-lg font-bold   col-span-2">
                      {course.name}
                    </div>
                    <div className=" col-span-2">
                      <span className=" font-semibold">Department:</span>{" "}
                      <span>{course.department}</span>
                    </div>
                    <div className=" col-span-2">
                      <span className=" font-semibold">Professor:</span>{" "}
                      <span>{course.professor}</span>
                    </div>
                    <div className=" col-span-2">
                      <span className=" font-semibold">Description:</span>{" "}
                      <span>{course.description}</span>
                    </div>
                  </div>
                );
              })}
            {!isLoading && data && data.length === 0 && (
              <div className=" text-sm py-2 font-bold ">No results found</div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
