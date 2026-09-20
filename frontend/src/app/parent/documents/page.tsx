import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function DocumentsPage() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Documents" subtitle="Access school documents and resources." />
        <Card>
          <CardContent>
            <EmptyState
              title="No documents"
              description="Documents will appear here once available."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
