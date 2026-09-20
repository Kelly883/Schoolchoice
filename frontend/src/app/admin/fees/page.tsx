import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function FeesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Fees" subtitle="Manage fee structures and invoices." />
        <Card>
          <CardContent>
            <EmptyState
              title="No fee structures"
              description="Fee structures will appear here once created."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
