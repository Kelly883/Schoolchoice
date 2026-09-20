import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function ResultsPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Results & Report Cards" subtitle="View your children's academic results." />
        <Card>
          <CardContent>
            <EmptyState
              title="No results available"
              description="Results will appear here once they are published by the school."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
