"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Home, PersonStanding, User } from "lucide-react";
import Link from "next/link";
import { CollapsibleDemo } from "../forum/Collapsible";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:8080/course/getAll");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log(data);
    return data
  };

  const { data: courses } = useQuery({queryKey: ["courses"],queryFn:fetchCourses});

  return (
    <div className={cn("lg:pb-12 w-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 lg:px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="lg:space-y-1 gap-2 flex lg:block items-center">
            <Button variant="secondary" className="lg:w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Link href="/profile">
              <Button variant="ghost" className="lg:w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-2 hidden lg:block">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Courses
          </h2>
          <ScrollArea className="h-[500px] px-1">
            <div className="space-y-1 p-2">
              {courses?.map((course : any) => (
                <CollapsibleDemo course={course} key={course.id} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
