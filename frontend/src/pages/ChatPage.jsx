import React from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import { ActiveTabsSwitch } from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import { useChatStore } from "../store/useChatStore.js";
import { NoConversationPlaceholder } from "../components/NoConversationPlaceholder.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

export const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

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
      <div className="flex-1 bg-slate-50">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};
