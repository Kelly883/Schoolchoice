import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Admin Dashboard" subtitle="Welcome to the school administration portal." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Total Students</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Teachers</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Pending Applications</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Fees Collected</div>
              <div className="text-2xl font-bold text-neutral-900">₦0</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
