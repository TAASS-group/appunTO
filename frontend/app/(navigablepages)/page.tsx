import { Metadata } from "next";
import Image from "next/image";

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
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { genericFetchRequest } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export type MyFile = {
  id: string;
  path: string;
  courseId: string;
};
export type Commit = {
  id: string;
  message: string;
  title: string;
  createdAt: string;
  author: string;
  gitCommitId: string;
  file: MyFile;
};
export type Favourite = { file: MyFile; courseName: string; content: string };
export type RecentChange = {
  commit: Commit;
  courseName: string;
  authors: string[];
  user: {
    uid: string;
    displayName: string;
    photoUrl: string;
  };
};
export type HomeData = {
  uid: string;
  hasFavorites: boolean;
  favourites: Favourite[];
  recentChanged: RecentChange[];
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const res = await genericFetchRequest(
    `/api/v1/file/getUserFiles/${session?.user.uid}`,
    "GET"
  );

  const data: HomeData = await res.json();

  console.log("USER DATA", res, data);
  return (
    <>
      <div className="">
        <div>
          <div className="bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {data.hasFavorites ? "Your favourites" : "Files"}
                      </h2>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  {data.favourites.length == 0 && (
                    <div className="flex flex-col  space-y-2">
                      <p className=" font-bold">No files</p>
                      <p className="text-muted-foreground text-xs">
                        You have no favourites to show
                      </p>
                    </div>
                  )}
                  {data.hasFavorites ? (
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {data.favourites.map((fav, index) => (
                            <HomeFileFavourite
                              key={fav.file.id}
                              favourite={fav}
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
                  ) : (
                    <>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {data.favourites
                              .slice(0, data.favourites.length / 2)
                              .map((fav, index) => (
                                <HomeFileFavourite
                                  key={fav.file.id}
                                  favourite={fav}
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
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {data.favourites
                              .slice(data.favourites.length / 2)
                              .map((fav, index) => (
                                <HomeFileFavourite
                                  key={fav.file.id}
                                  favourite={fav}
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
                    </>
                  )}

                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Recent changes
                    </h2>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea className="w-full ">
                      <div className="flex flex-col w-full space-y-4 pb-4 pt-2 lg:pl-2 pr-2 lg:pr-3">
                        {data.recentChanged.map((commit) => (
                          <HomeRecentChange
                            key={commit.commit.id}
                            change={commit}
                          />
                        ))}
                        {data.recentChanged.length === 0 && (
                          <div className="flex flex-col h-[20vh]  space-y-2">
                            <p className=" font-bold">No recent changes</p>
                            <p className="text-muted-foreground text-xs">
                              You have no recent changes to show
                            </p>
                          </div>
                        )}
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
