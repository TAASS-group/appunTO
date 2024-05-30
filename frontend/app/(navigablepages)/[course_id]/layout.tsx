'use client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Sidebar } from "@/components/home/Sidebar";
import { playlists } from "@/components/home/data/playlists";
import { Button } from "@/components/ui/button";
import React from "react";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full">
        <div className="w-[15%]"> <Sidebar playlists={playlists} className="hidden lg:block" /></div>
        <div className="w-[70%] px-10">{children}</div>
        <div className="w-[15%]"></div>
      </div>
    </QueryClientProvider>
  );
}