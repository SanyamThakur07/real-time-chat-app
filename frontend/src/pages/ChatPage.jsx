import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";

export const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="h-[600px] min-w-250 rounded-md border bg-white shadow-sm">
      <div className="flex h-full">
        <div className="h-full w-70 bg-gray-200">
          <div className="flex flex-col">
            <ProfileHeader />
          </div>
        </div>
        <div className="flex-1 bg-amber-50"></div>
        <div></div>
      </div>
    </div>
  );
};
