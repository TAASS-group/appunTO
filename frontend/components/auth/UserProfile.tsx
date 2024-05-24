"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

export default function UserProfile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      UserProfile
    </Button>
  );
}
