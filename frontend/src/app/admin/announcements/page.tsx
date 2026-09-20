import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AnnouncementsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Announcements" subtitle="Create and manage school announcements." />
        <Card>
          <CardContent>
            <EmptyState
              title="No announcements"
              description="Announcements will appear here once created."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
