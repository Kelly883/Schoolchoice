import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AttendancePage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Attendance" subtitle="View and manage attendance records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No attendance records"
              description="Attendance records will appear here once recorded."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
