"use client";

import { useSession } from "next-auth/react";
import * as React from "react";

export const NotificationContext = React.createContext({} as any);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [seenNotifications, setSeenNotifications] = React.useState<any[]>([]);
  const [unseenNotifications, setUnseenNotifications] = React.useState<any[]>(
    []
  );
  const [ws, setWs] = React.useState<WebSocket | null>(null);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (!session?.user) return;
    const socket = new WebSocket("ws://127.0.0.1:8085/ws");
    socket.onopen = () => {
      // userid:courseId
      socket.send((session?.user as any).uid);
      console.log("Socket connected");
    };
    socket.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      // put first not seen and then seen
      if (message.seen) {
        setSeenNotifications((prev: any[]) => [...prev, message]);
      } else {
        setUnseenNotifications((prev: any[]) => [...prev, message]);
      }
      //setNotifications((prev: any[]) => [...prev, message]);
    };
    socket.onerror = function (error) {
      console.error("WebSocket Error: ", error);
    };

    socket.onclose = (event) => {
      console.log("Socket closed", event.code, event.reason);
      setWs(null);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        seenNotifications,
        unseenNotifications,
        setSeenNotifications,
        setUnseenNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
