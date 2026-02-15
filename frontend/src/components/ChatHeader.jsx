import React from "react";

import { useChatStore } from "../store/useChatStore.js";

import { UserRound, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11">
          <AvatarImage
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className="h-full w-full object-cover"
          />

          <AvatarFallback>
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
        </div>
      </div>
      <button
        className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-slate-200"
        onClick={() => setSelectedUser(null)}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
