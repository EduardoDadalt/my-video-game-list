"use client";
import Button from "../button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
