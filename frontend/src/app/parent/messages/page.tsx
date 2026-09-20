import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function MessagesPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Messages" subtitle="Communicate with teachers and school staff." />
        <Card>
          <CardContent>
            <EmptyState
              title="No messages"
              description="Your messages will appear here."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
