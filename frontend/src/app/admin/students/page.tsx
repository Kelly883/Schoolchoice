import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function StudentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Students" subtitle="Manage student records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No students"
              description="Student records will appear here once added."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
