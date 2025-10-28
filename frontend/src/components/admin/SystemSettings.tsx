import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const settings = [
  {
    id: 'notifications',
    label: 'Email Notifications',
    description: 'Send email notifications for important events',
    enabled: true
  },
  {
    id: 'registration',
    label: 'Open Registration',
    description: 'Allow new student registrations',
    enabled: true
  },
  {
    id: 'maintenance',
    label: 'Maintenance Mode',
    description: 'Put system in maintenance mode',
    enabled: false
  },
  {
    id: 'backups',
    label: 'Automatic Backups',
    description: 'Enable daily database backups',
    enabled: true
  }
];

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((setting, index) => (
          <div key={setting.id}>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">{setting.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch defaultChecked={setting.enabled} />
            </div>
            {index < settings.length - 1 && <Separator />}
          </div>
        ))}
        
        <div className="pt-4">
          <Button className="w-full">Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}