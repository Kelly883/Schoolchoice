import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function ChildrenPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="My Children" subtitle="View and manage your children's profiles." />
        <Card>
          <CardContent>
            <EmptyState
              title="No children linked"
              description="Your children's profiles will appear here once they are linked to your account."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
