import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function CalendarPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="School Calendar" subtitle="View upcoming school events and activities." />
        <Card>
          <CardContent>
            <EmptyState
              title="No events"
              description="There are no upcoming events at the moment."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
