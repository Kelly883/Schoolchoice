import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function ResultsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Results" subtitle="Manage student results and report cards." />
        <Card>
          <CardContent>
            <EmptyState
              title="No results"
              description="Results will appear here once published."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
