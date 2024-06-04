import UserProfile from "@/components/auth/UserProfile";
import { DarkmodeToggle } from "@/components/DarkmodeToggle";
import { NotificationButton } from "@/components/home/NotificationButton";
import { Input } from "@/components/ui/input";
import { NotificationContext } from "@/providers/NotificationProvider";
import { Search, Bell } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import SearchBarMobile from "@/components/SearchBarMobile";
import Link from "next/link";
import { Sidebar } from "@/components/home/Sidebar";
import { UserDropdown } from "@/components/auth/UserDropdown";

export default function NavigableLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="py-4 px-4 lg:px-8 border-b-[1px] flex h-20 items-center lg:justify-start justify-between">
        <div className=" w-1/3 h-full relative">
          <Link href="/">
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
          </Link>
        </div>
        <SearchBar />

        <div className=" w-1/3 gap-4 justify-end flex ">
          <SearchBarMobile />
          <NotificationButton />
          <div className="hidden lg:block">
            <DarkmodeToggle />
          </div>
          <UserDropdown />
        </div>
      </header>

      <main className="flex w-full">
        <div className="w-[15%] hidden lg:flex">
          <Sidebar className="hidden lg:block" />
        </div>
        {children}
      </main>
    </div>
  );
}
