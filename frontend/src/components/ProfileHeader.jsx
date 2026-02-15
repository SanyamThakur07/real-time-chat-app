import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { UserRound, LogOut, VolumeOff, Volume2 } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { updateProfile, authUser, logout } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current.click()}
          className="group relative"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={selectedImg || authUser.profilePic}
              alt="User image"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
            <AvatarBadge className="bg-green-500 ring-2 ring-white" />
          </Avatar>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-[10px] font-medium text-white">Change</span>
          </div>
        </button>
        <input
          type="file"
          accept="images/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {authUser.fullName}
          </h3>
          <p className="text-xs text-slate-500">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound
              .play()
              .catch((error) => console.error("Error playing sound: ", error));
            toggleSound();
          }}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          {isSoundEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeOff className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={logout}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
