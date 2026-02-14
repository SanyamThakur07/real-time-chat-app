import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Button } from "@/components/ui/button";

export const ChatPage = () => {
  const { logout } = useAuthStore();
  return <Button onClick={logout}>Logout</Button>;
};
