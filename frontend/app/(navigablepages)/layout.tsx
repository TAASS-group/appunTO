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

export default function NavigableLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="py-4 px-8 flex h-20 items-center lg:justify-start justify-between">
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
        <SearchBarMobile />
        <div className=" w-1/3  justify-end hidden lg:flex ">
          <NotificationButton />
          <DarkmodeToggle />
          <UserProfile />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
