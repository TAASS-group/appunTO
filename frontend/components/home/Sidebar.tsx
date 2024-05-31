import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Home, PersonStanding, User } from "lucide-react";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
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
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
