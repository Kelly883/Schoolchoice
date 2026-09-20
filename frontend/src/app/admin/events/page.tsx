import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function EventsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Events" subtitle="Create and manage school events." />
        <Card>
          <CardContent>
            <EmptyState
              title="No events"
              description="Events will appear here once created."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
