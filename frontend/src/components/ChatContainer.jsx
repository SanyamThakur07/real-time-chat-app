import React, { useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader.jsx";
import { MessageLoadingSkeleton } from "./MessageLoadingSkeleton.jsx";
import { NoChatHistoryPlaceHolder } from "./NoChatHistoryPlaceHolder.jsx";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageInput } from "./MessageInput.jsx";

const ChatContainer = () => {
  const {
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
    messages,
    getMessagesByUserId,
    isMessagesLoading,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeToMessages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMessagesLoading]);

  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <div
        ref={messagesContainerRef}
        className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
      >
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="w-full space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble rounded-t-2xl px-4 py-2.5 ${msg.senderId === authUser._id ? "rounded-bl-2xl bg-green-600 text-white" : "rounded-br-2xl bg-blue-600 text-white"}`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="h-45 rounded-lg"
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                </div>
                <time className="chat-footer text-xs text-slate-600">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            ))}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder />
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
