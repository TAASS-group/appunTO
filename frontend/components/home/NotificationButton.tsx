"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { NotificationContext } from "@/providers/NotificationProvider";
import { Separator } from "../ui/separator";
import { Bell, BellIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export function NotificationButton() {
  let { notifications, setNotifications } =
    React.useContext(NotificationContext);
  React.useEffect(() => {
    setNotifications([
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
    ]);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="ghost" size="icon">
          <Bell className="h-[1.5rem] w-[1.5rem]"></Bell>
          {notifications.length > 0 && (
            <span className="h-[10px] w-[10px] rounded-full bg-primary absolute top-2 right-[8px] border-[1px] border-background"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] max-h-72">
        <ScrollArea className="w-full h-72  rounded-md">
          <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-xl font-bold leading-none">Notifications</h4>
              <Badge className="rounded-full">{notifications.length}</Badge>
            </div>
            <div className="flex flex-col-reverse">
              {notifications.map((notification: any, index: number) => (
                <div onClick={() => alert(notification.id)} key={index}>
                  <div
                    className={`-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground ${
                      notification.seen ? "bg-accent" : "text-accent-foreground"
                    } }`}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground text-end">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
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
