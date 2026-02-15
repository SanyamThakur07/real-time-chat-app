import { MessageCircleWarning } from "lucide-react";

export const NoConversationPlaceholder = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
        <MessageCircleWarning className="h-10 w-10 text-stone-800" />
      </div>
      <h3 className="text-lg font-medium">Select a conversion</h3>
      <p className="text-gray-400">
        Choose a contact to start chatting or continue a previous conversation
      </p>
    </div>
  );
};
