import React, { useEffect } from "react";
import { ChatHeader } from "./ChatHeader.jsx";
import { MessageLoadingSkeleton } from "./MessageLoadingSkeleton.jsx";
import { NoChatHistoryPlaceHolder } from "./NoChatHistoryPlaceHolder.jsx";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatContainer = () => {
  const { selectedUser, messages, getMessagesByUserId, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <div className="flex flex-1 flex-col px-6 py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="w-full space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble ${msg.senderId === authUser._id ? "bg-green-500 text-white" : "bg-blue-600 text-white"}`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="h-45 rounded-lg"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                </div>
                <time className="chat-footer text-xs text-slate-600">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder />
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
