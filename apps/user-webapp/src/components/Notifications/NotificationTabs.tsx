"use client";

import NotificationList from "./NotificationList";
import MessageList from "./MessageList";
import { useSearchParams } from "next/navigation";

interface NotificationTabsProps {
  tab: "notifications" | "messages";
}

export default function NotificationTabs({ tab }: NotificationTabsProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      {tab === "notifications" ? (
        <NotificationList filter={filter} searchQuery={searchQuery} />
      ) : (
        <MessageList filter={filter} searchQuery={searchQuery} />
      )}
    </>
  );
}