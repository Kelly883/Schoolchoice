import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function ClassesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Classes" subtitle="Manage class records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No classes"
              description="Class records will appear here once added."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
