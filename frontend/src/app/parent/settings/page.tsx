import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function SettingsPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Account Settings" subtitle="Manage your account and security settings." />
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">Profile settings will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
