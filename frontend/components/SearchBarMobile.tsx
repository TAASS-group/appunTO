"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { genericFetchRequest } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

export default function SearchBarMobile() {
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
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild className="lg:hidden">
        <Button size={"icon"} variant="outline">
          <Search className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] -translate-y-[65%] rounded-lg">
        <DialogHeader className="pt-8">
          <div className="relative ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 "
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </DialogHeader>
        <ScrollArea className="h-[50vh] w-full">
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
                <DialogClose key={course.id} asChild>
                  <div
                    onClick={() => router.push(`/${course.id}`)}
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
                </DialogClose>
              );
            })}
          {!isLoading && data && data.length === 0 && (
            <div className=" text-sm py-2 font-bold ">No results found</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/* <div
          className={`lg:hidden relative ${
            !isOpen &&
            "border h-[36px] w-[36px] rounded-md flex justify-center items-center cursor-pointer hover:bg-muted hover:bg-opacity-10"
          }`}
        >
          <div className="w-[400px]"></div>
          <Search
            className={` ${
              isOpen && "absolute"
            } left-2 top-2.5 h-4 w-4 text-muted-foreground`}
          />
          {isOpen && <Input placeholder="Search" className="pl-8 " />}
        </div> */
