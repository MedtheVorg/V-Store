import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  storeId: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ cell }) => (
      <img
        src={cell.getValue() as string}
        alt={cell.getValue() as string}
        className="min-h-20 h-20 w-full object-cover object-center rounded-lg"
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
