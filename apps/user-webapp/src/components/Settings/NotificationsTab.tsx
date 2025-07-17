import { Card } from "@user-webapp/components/ui/card";
import { Bell, ShoppingBag, Star, Check, Mail } from "lucide-react";

export function NotificationsTab({
  notifications,
  newsletter,
  handleInputChange,
}: {
  notifications: boolean;
  newsletter: boolean;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" /> Notification Preferences
        </h3>
        {["notifications", "newsletter"].map((name) => (
          <div key={name} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">{name === "notifications" ? "Email Notifications" : "Newsletter"}</p>
              <p className="text-sm text-muted-foreground">
                {name === "notifications"
                  ? "Receive important updates via email"
                  : "Get weekly updates and promotions"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name={name}
                checked={name === "notifications" ? notifications : newsletter}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:bg-primary after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        ))}
      </div>
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-medium text-lg">Notification Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: ShoppingBag, label: "Order Updates" },
            { icon: Star, label: "Promotions" },
            { icon: Check, label: "Account Activity" },
            { icon: Mail, label: "Messages" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">
                  {label} notifications
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
