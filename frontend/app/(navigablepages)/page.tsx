import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { HomeFileFavourite } from "@/components/home/HomeFileFavourite";
import { Sidebar } from "@/components/home/Sidebar";
import {
  listenNowAlbums,
  madeForYouAlbums,
} from "@/components/home/data/albums";
import { playlists } from "@/components/home/data/playlists";
import { HomeRecentChange } from "@/components/home/HomeRecentChange";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function MusicPage() {
  return (
    <>
      <div className="">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Your favourites
                      </h2>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {listenNowAlbums.map((album) => (
                          <HomeFileFavourite
                            key={album.name}
                            album={album}
                            className="w-[220px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Recent changes
                    </h2>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea className="w-full ">
                      <div className="flex flex-col w-full space-y-4 pb-4 pt-2 pl-2 pr-3">
                        {madeForYouAlbums.map((album) => (
                          <HomeRecentChange key={album.name} album={album} />
                        ))}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
