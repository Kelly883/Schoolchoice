import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function TimetablePage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Timetable" subtitle="View your children's class schedules." />
        <Card>
          <CardContent>
            <EmptyState
              title="No timetable available"
              description="Timetables will appear here once published by the school."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
