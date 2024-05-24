import UserProfile from "@/components/auth/UserProfile";
import { DarkmodeToggle } from "@/components/DarkmodeToggle";
import { NotificationButton } from "@/components/home/NotificationButton";
import { Input } from "@/components/ui/input";
import { NotificationContext } from "@/providers/NotificationProvider";
import { Search, Bell } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function NavigableLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="py-4 px-8 flex h-20 items-center">
        <div className=" w-1/3 h-full relative">
          <Image
            src="/logoblack.png"
            fill
            alt="logo"
            objectFit="contain"
            objectPosition="left"
            className="block dark:hidden"
          />
          <Image
            src="/logowhite.png"
            fill
            alt="logo"
            objectFit="contain"
            objectPosition="left"
            className="hidden dark:block"
          />
        </div>
        <div className=" relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 " />
        </div>
        <div className=" w-1/3 flex justify-end ">
          <NotificationButton />
          <DarkmodeToggle />
          <UserProfile />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
