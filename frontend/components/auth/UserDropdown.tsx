"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenericRequest, genericRequest } from "@/lib/request";
import { Building2, FileBadge, Home, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserDropdown() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-7 w-7 lg:h-10 lg:w-10">
            <AvatarImage
              className=" object-contain"
              src={`${session?.user.photoURL}`}
              alt="@userlogo"
            />
            <AvatarFallback>
              {session?.user.displayName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem className="cursor-pointer">
              Home
              <DropdownMenuShortcut>
                <Home className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <User className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            signOut();
          }}
        >
          Sign out
          <DropdownMenuShortcut>
            <LogOut className="h-4 w-4 text-destructive" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
