import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { ColorColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';
import { DataTable } from '@/components/ui/data-table';
import { useNavigate, useParams } from 'react-router-dom';

type ColorClientProps = {
  data: ColorColumn[];
};

export default function ColorClient({ data }: ColorClientProps) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage Colors for your store"
        />
        <Button
          onClick={() => navigate(`/dashboard/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 size-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="Colors" entityIdName="ColorId" />
    </>
  );
}
