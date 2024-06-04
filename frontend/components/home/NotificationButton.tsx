"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { NotificationContext } from "@/providers/NotificationProvider";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import { genericFetchRequest } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function NotificationButton() {
  let {
    seenNotifications,
    unseenNotifications,
    setSeenNotifications,
    setUnseenNotifications,
  } = React.useContext(NotificationContext);

  React.useEffect(() => {
    /* setNotifications([
      {
        id: 1,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: true,
      },
      {
        id: 2,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: true,
      },
      {
        id: 3,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: true,
      },
      {
        id: 4,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: false,
      },
      {
        id: 5,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: false,
      },
      {
        id: 6,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: false,
      },
      {
        id: 7,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: false,
      },
      {
        id: 8,
        message: "The course has been updated with new content and assignments",
        title: "Test Title",
        course: "Test Course",
        timestamp: "2022-01-01T00:00:00Z",
        seen: false,
      },
    ]) */
  }, []);

  const { data: session } = useSession();

  const ackNotification = async (notificationId: number) => {
    console.log("ack", notificationId);
    /*  const ret = await fetch("http://localhost:8085/api/v1/message/ackowledge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationId,
        userId: (session?.user as any).uid,
      }),
    }); */

    const ret = await genericFetchRequest(
      "/api/v1/message/ackowledge",
      "POST",
      {
        notificationId,
        userId: (session?.user as any).uid,
      },
      { "Content-Type": "application/json" }
    );

    console.log(ret);

    setSeenNotifications((prev: any[]) =>
      prev.concat(
        unseenNotifications.filter((n: any) => n.id === notificationId)
      )
    );
    setUnseenNotifications((prev: any[]) =>
      prev.filter((n) => n.id !== notificationId)
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative"
          variant="ghost"
          size="icon"
          onClick={() => alert("test")}
        >
          <Bell className="h-[1.5rem] w-[1.5rem]"></Bell>
          {unseenNotifications.length > 0 && (
            <span className="h-[10px] w-[10px] rounded-full bg-primary absolute top-2 right-[8px] border-[1px] border-background"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] max-h-72">
        <ScrollArea className="w-full h-72  rounded-md">
          <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-xl font-bold leading-none">Notifications</h4>
              <Badge className="rounded-full">
                {unseenNotifications.length}
              </Badge>
            </div>
            {unseenNotifications.length === 0 &&
              seenNotifications.length === 0 && (
                <div className="flex flex-col h-[20vh] items-center justify-center space-y-2">
                  <p className="text-lg font-bold">No notifications</p>
                  <p className="text-muted-foreground">
                    You have no notifications to show
                  </p>
                </div>
              )}
            <div className="flex flex-col-reverse">
              {unseenNotifications.map((notification: any, index: number) => (
                <div
                  onClick={() => ackNotification(notification.id)}
                  key={index}
                >
                  <div className="border-t border-gray-200">
                    <div className="-mx-2 flex items-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground space-y-2">
                      <div className="w-2 h-2 bg-black rounded-full"></div>{" "}
                      <div className="flex flex-col space-y-2 w-full">
                        <p className="font-medium leading-none">
                          {notification.courseName}
                        </p>
                        <div className="p-2 space-y-2">
                          <p className="text-sm font-medium leading-none  ">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>

                          <p className="text-xs text-muted-foreground text-right">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col-reverse">
              {seenNotifications.map((notification: any, index: number) => (
                <div key={index}>
                  <div className="border-t border-gray-200">
                    <div className="-mx-2 flex items-center space-x-4 rounded-md p-2 transition-all space-y-2">
                      <div className="w-2 h-2 opacity-0"></div>{" "}
                      <div className="flex flex-col space-y-2 w-full">
                        <p className="font-medium leading-none">
                          {notification.courseName}
                        </p>
                        <div className="p-2 space-y-2">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>

                          <p className="text-xs text-muted-foreground text-right">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
