import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function NewsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="News" subtitle="Create and manage news articles." />
        <Card>
          <CardContent>
            <EmptyState
              title="No news articles"
              description="News articles will appear here once published."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
