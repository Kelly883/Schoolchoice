import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function PaymentsPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Payment History" subtitle="View all your past payments." />
        <Card>
          <CardContent>
            <EmptyState
              title="No payments yet"
              description="Your payment history will appear here once you make a payment."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
