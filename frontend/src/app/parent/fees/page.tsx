import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function FeesPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Fees & Balances" subtitle="View and manage school fees for your children." />
        <Card>
          <CardContent>
            <EmptyState
              title="No fees due"
              description="There are no outstanding fees at the moment."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
