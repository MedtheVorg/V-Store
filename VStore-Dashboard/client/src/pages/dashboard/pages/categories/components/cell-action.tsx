import toast from 'react-hot-toast';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CategoryColumn } from './columns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';
import { useDeleteCategoryMutation } from '@/redux/services/categoryService';

type CellActionProps = {
  data: CategoryColumn;
};

export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [deleteCategory] = useDeleteCategoryMutation();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success('Category Id copied to the clipboard');
  };
  const onUpdate = () => {
    navigate(`/dashboard/${params.storeId}/categories/${data.id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      await deleteCategory({
        storeId: params.storeId as string,
        categoryId: data.id,
      });

      toast.success('Category deleted.', { id: '1' });
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('UnAuthorized', { id: '1' });
      } else {
        toast.error('Something went wrong.', { id: '1' });
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <AlertModel
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="are you sure?"
        description="this action is permanent and cannot be reversed!"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="size-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className="size-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
