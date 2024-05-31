"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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

export default function SearchBarMobile() {
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
            <Input placeholder="Search" className="pl-8 " />
          </div>
        </DialogHeader>
        <ScrollArea className="h-[50vh] w-full rounded-md border">
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
