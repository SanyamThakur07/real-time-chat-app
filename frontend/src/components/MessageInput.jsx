import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Input } from "@/components/ui/input";
import { Send, Image, X } from "lucide-react";
import useKeyboardSound from "./UseKeyboardSound.jsx";

export const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled } = useChatStore();
  const [text, setText] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text && !imagePrev) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({
      text: text.trim(),
      image: imagePrev,
    });

    setText("");
    setImagePrev("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePrev(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePrev("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="border-t border-slate-200 bg-white p-3">
      {/* Image Preview - positioned above input */}
      {imagePrev && (
        <div className="mb-3 flex items-start">
          <div className="relative">
            <img
              src={imagePrev}
              alt="Preview"
              className="h-20 w-20 rounded-lg border border-slate-300 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form - fixed at bottom */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <Input
          id="text-msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the message"
          className="flex-1"
        />
        <button
          className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200"
          onClick={() => fileInputRef.current.click()}
          type="button"
        >
          <Image />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleInputChange}
        />
        <button
          className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200"
          type="submit"
        >
          <Send />
        </button>
      </form>
    </div>
  );
};
