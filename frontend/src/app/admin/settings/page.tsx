import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Settings" subtitle="Manage school settings and configuration." />
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">School settings will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
