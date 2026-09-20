import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function TeachersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Teachers" subtitle="Manage teacher records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No teachers"
              description="Teacher records will appear here once added."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
