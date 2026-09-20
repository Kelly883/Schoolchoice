import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AttendancePage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Attendance" subtitle="View your children's attendance records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No attendance records"
              description="Attendance records will appear here once available."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
