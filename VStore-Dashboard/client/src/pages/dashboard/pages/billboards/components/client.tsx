'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { BillboardColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';
import { DataTable } from '@/components/ui/data-table';
import { useNavigate, useParams } from 'react-router-dom';

type BillboardClientProps = {
  data: BillboardColumn[];
};

export default function BillboardClient({ data }: BillboardClientProps) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            navigate(`/dashboard/${params.storeId}/billboards/new`)
          }
        >
          <Plus className="mr-2 size-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />

      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
}
