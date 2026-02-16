import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import UserSkeleton from "./UserSkeleton.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

const ContactList = () => {
  const { allContacts, isUsersLoading, getAllContacts, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col">
        {[...Array(5)].map((_, i) => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {allContacts.length === 0 ? (
        <p className="p-8 text-center text-sm text-slate-400">
          No contacts found
        </p>
      ) : (
        allContacts.map((contact) => (
          <div
            key={contact._id}
            className="flex cursor-pointer items-center gap-3 border-b border-slate-100 p-4 transition-colors hover:bg-slate-50"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={contact.profilePic}
                  alt={contact.fullName}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-slate-100">
                  <UserRound className="h-5 w-5 text-slate-400" />
                </AvatarFallback>
              </Avatar>
              {onlineUsers.includes(contact._id) && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-medium text-slate-900">
                {contact.fullName}
              </h4>
              <p className="truncate text-xs text-slate-500">{contact.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
