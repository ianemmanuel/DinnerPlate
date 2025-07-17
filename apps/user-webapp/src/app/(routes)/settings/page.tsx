"use client";

import { useState } from "react";
import SettingsTabs from "@user-webapp/components/Settings/SettingsTabs";
import { SecurityTab } from "@user-webapp/components/Settings/SecurityTab";
import { NotificationsTab } from "@user-webapp/components/Settings/NotificationsTab";
import { BillingTab } from "@user-webapp/components/Settings/BillingTab";
import { SupportTab } from "@user-webapp/components/Settings/SupportTab";

// Define a type alias for allowed tab values
type Tab = "profile" | "security" | "notifications" | "billing" | "support";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94110",
    notifications: true,
    newsletter: true,
    twoFactor: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleTwoFactor = () => {
    setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
  };

  return (
    <div className="container mx-auto px-6 py-8 lg:px-12">
      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground text-lg mb-8">Manage your account preferences</p>

      <SettingsTabs onTabChange={(value) => setActiveTab(value as Tab)}>
        {activeTab === "security" && (
          <SecurityTab twoFactor={formData.twoFactor} toggleTwoFactor={toggleTwoFactor} />
        )}

        {activeTab === "notifications" && (
          <NotificationsTab
            notifications={formData.notifications}
            newsletter={formData.newsletter}
            handleInputChange={handleInputChange}
          />
        )}

        {activeTab === "billing" && <BillingTab />}

        {activeTab === "support" && <SupportTab />}
      </SettingsTabs>
    </div>
  );
}
