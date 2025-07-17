import { Card } from "@user-webapp/components/ui/card";
import { Input } from "@user-webapp/components/ui/input";
import { Button } from "@user-webapp/components/ui/button";
import { Lock, Shield } from "lucide-react";
import { Badge } from "@user-webapp/components/ui/badge";
import { toast } from "sonner";

export function SecurityTab({
  twoFactor,
  toggleTwoFactor,
}: {
  twoFactor: boolean;
  toggleTwoFactor: () => void;
}) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Lock className="h-5 w-5" /> Password
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Change Password</Button>
        </div>
      </div>
      <div className="space-y-4 pt-6 border-t">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" /> Two-Factor Authentication
            </h3>
            <p className="text-sm text-muted-foreground">Add extra security</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={twoFactor ? "default" : "secondary"}>
              {twoFactor ? "Enabled" : "Disabled"}
            </Badge>
            <Button
              variant="outline"
              onClick={() => {
                toggleTwoFactor();
                toast.success(`Two-Factor ${twoFactor ? "disabled" : "enabled"}`, {
                  position: "top-center",
                });
              }}
            >
              {twoFactor ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
