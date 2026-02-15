import { MessageSquarePlus } from "lucide-react";

export const NoChatHistoryPlaceHolder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
        <MessageSquarePlus className="h-10 w-10 text-stone-800" />
      </div>
      <h3 className="text-lg font-medium">No messages yet</h3>
      <p className="text-gray-400">
        Start the conversation by sending a message
      </p>
    </div>
  );
};
