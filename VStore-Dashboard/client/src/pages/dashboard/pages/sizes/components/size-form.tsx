import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Size } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateSizeMutation,
  useDeleteSizeMutation,
  useUpdateSizeMutation,
} from '@/redux/services/sizeService';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string(),
});

type SizeFormValues = z.infer<typeof formSchema>;
type SizeFormProps = {
  initialData: Size | null;
};

export function SizeForm({ initialData }: SizeFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [createSize] = useCreateSizeMutation();
  const [updateSize] = useUpdateSizeMutation();
  const [deleteSize] = useDeleteSizeMutation();

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Add a new size ';
  const toastMessage = initialData ? 'Size updated.' : 'Size created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      if (initialData) {
        await updateSize({
          ...data,
          sizeId: params.sizeId as string,
          storeId: params.storeId as string,
        }).unwrap();
      } else {
        await createSize({
          ...data,
          storeId: params.storeId as string,
        }).unwrap();
        form.reset();
      }

      toast.success(toastMessage, { id: '1' });

      form.reset();
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('UnAuthorized');
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      await deleteSize({
        sizeId: params.sizeId as string,
        storeId: params.storeId as string,
      }).unwrap();

      toast.success('Size deleted.', { id: '1' });

      navigate(`/dashboard/${params.storeId}/sizes`);
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('UnAuthorized');
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="are you sure?"
        description="this action is permanent and cannot be reversed!"
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            size={'sm'}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
