import React from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import { ActiveTabsSwitch } from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import { useChatStore } from "../store/useChatStore.js";

export const ChatPage = () => {
  const { activeTab } = useChatStore();
  
  return (
    <div className="flex h-screen w-full bg-slate-50">
      {/* Sidebar */}
      <div className="flex h-full w-80 flex-col border-r border-slate-200 bg-white">
        <ProfileHeader />
        <ActiveTabsSwitch />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex flex-1 items-center justify-center bg-slate-50">
        <p className="text-slate-400">Select a chat to start messaging</p>
      </div>
    </div>
  );
};
