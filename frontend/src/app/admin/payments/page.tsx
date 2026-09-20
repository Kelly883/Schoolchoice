import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function PaymentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Payments" subtitle="View and manage payment records." />
        <Card>
          <CardContent>
            <EmptyState
              title="No payments"
              description="Payment records will appear here once payments are made."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
