import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AnnouncementsPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Announcements" subtitle="Latest school announcements and updates." />
        <Card>
          <CardContent>
            <EmptyState
              title="No announcements"
              description="There are no announcements at the moment."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
