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
    <div className="flex h-20 items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current.click()}
          className="group relative"
        >
          <Avatar className="h-13 w-13">
            <AvatarImage
              src={selectedImg || authUser.profilePic}
              alt="User image"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-medium text-white">Change</span>
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
          <h3 className="text-md leading-tight font-semibold text-slate-600">
            {authUser.fullName}
          </h3>
          <p className="text-sm leading-tight font-medium text-slate-500">
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer" onClick={logout}>
          <LogOut />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound
              .play()
              .catch((error) => console.error("Audion play failed: ", error));
            toggleSound();
          }}
        >
          {isSoundEnabled ? <Volume2 /> : <VolumeOff />}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
