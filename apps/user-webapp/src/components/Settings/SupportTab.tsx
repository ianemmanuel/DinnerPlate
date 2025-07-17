import { Card } from "@user-webapp/components/ui/card";
import { HelpCircle, Mail, Phone, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@user-webapp/components/ui/button";

export function SupportTab() {
  return (
    <Card className="p-6 space-y-6">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <HelpCircle className="h-5 w-5" /> Help & Support
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: HelpCircle, label: "FAQs" },
          { icon: Mail, label: "Contact Us" },
          { icon: Phone, label: "Live Chat" },
          { icon: AlertTriangle, label: "Report Issue" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
            <div className="bg-gray-100 p-3 rounded-lg w-fit mb-3">
              <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <h4 className="font-medium mb-1">{label}</h4>
            <p className="text-sm text-muted-foreground">Description here</p>
          </div>
        ))}
      </div>
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-medium text-lg">Account Actions</h3>
        {[
          { label: "Download Data", variant: "outline" },
          { label: "Request Account Deletion", variant: "outline" },
          { label: "Log Out", variant: "destructive", icon: LogOut },
        ].map(({ label, variant, icon: Icon }) => (
          <Button key={label} variant={variant as any} className="w-full flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />} {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
