import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AdmissionsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Admissions" subtitle="Manage admission applications." />
        <Card>
          <CardContent>
            <EmptyState
              title="No applications"
              description="Admission applications will appear here once submitted."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
