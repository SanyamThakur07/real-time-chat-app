import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatStore } from "../store/useChatStore.js";

export const ActiveTabsSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="border-b border-slate-200 px-4 py-2"
    >
      <TabsList className="h-9 w-full bg-slate-100">
        <TabsTrigger
          value="chats"
          className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
        >
          Chats
        </TabsTrigger>
        <TabsTrigger
          value="contacts"
          className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
        >
          Contacts
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
