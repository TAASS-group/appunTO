"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Sidebar } from "@/components/home/Sidebar";
import { playlists } from "@/components/home/data/playlists";
import { Button } from "@/components/ui/button";
import React from "react";
import { Righbar } from "@/components/home/Rightbar";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-screen lg:w-full">
        <div className="lg:w-[85%] lg:px-10 w-full">{children}</div>
        <div className="w-[15%] hidden lg:block">
          <Righbar/>
        </div>
      </div>
    </QueryClientProvider>
  );
}
