import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function AuditLogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Audit Logs" subtitle="View system audit logs." />
        <Card>
          <CardContent>
            <EmptyState
              title="No audit logs"
              description="Audit logs will appear here once actions are recorded."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
