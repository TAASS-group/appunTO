"use client"
 
import * as React from "react"
import { ChevronDown, ChevronsUpDown, File, Plus, User, Warehouse, X } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link";
import { FaForumbee } from "react-icons/fa"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
 
export function CollapsibleDemo( {course} : {course: any} ) {
  const [isOpen, setIsOpen] = React.useState(false)
 
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className=" space-y-1"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <h4 className="text-sm font-semibold line-clamp-1 break-all ">
          {course.name}
        </h4>
        </TooltipTrigger>
        <TooltipContent>
          <p>{course.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        
        <CollapsibleTrigger asChild className="flex-none !ml-0">
          <Button variant="ghost" size="sm" className="w-9 p-0 items-center">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-1 pl-3">
      <Link    href={{
            pathname: `/${course.id}/forum/`,
           
          }}>
              <Button variant="ghost" className="lg:w-full justify-start">
                <Warehouse className="mr-2 h-4 w-4" />
                Forum
              </Button>
        </Link>
        <Link    href={{
            pathname: `/${course.id}`,
           
          }}>
              <Button variant="ghost" className="lg:w-full justify-start">
                <File className="mr-2 h-4 w-4" />
                File
              </Button>
        </Link>
      </CollapsibleContent>
    </Collapsible>
  )
}