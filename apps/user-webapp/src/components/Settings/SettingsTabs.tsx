"use client";
import { Tabs, TabsList, TabsTrigger } from "@user-webapp/components/ui/tabs";
import { Lock, Bell, CreditCard, HelpCircle } from "lucide-react";

export default function SettingsTabs({
  children,
  onTabChange,
}: {
  children: React.ReactNode;
  onTabChange: (value: string) => void;
}) {
  return (
    <Tabs defaultValue="profile" onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" /> <span className="hidden md:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" /> <span className="hidden md:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> <span className="hidden md:inline">Billing</span>
        </TabsTrigger>
        <TabsTrigger value="support" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> <span className="hidden md:inline">Support</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
