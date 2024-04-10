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
import ApiAlert from '@/components/ui/api-alert';
import AlertModel from '../../../components/modals/alert-modal';
import { Store } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '@/redux/hook';
import {
  useDeleteStoreMutation,
  useUpdateStoreMutation,
} from '@/redux/services/storeService';

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const [updateStore] = useUpdateStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (formValues: SettingsFormValues) => {
    try {
      setLoading(true);

      toast.promise(
        updateStore({
          name: formValues.name,
          storeId: params.storeId as string,
          userId: userInfo?._id as string,
        }).unwrap(),
        {
          loading: 'Loading...',
          success: 'Store updated',
          error: (err: any) => {
            if (err.status === 401) {
              return 'UnAuthorized action.';
            } else {
              return 'Something went wrong.';
            }
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      deleteStore({
        storeId: params.storeId as string,
        userId: userInfo?._id as string,
      }).unwrap();

      navigate('/dashboard');

      toast.success('Store deleted.');
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
        title="Are you sure ?"
        description="This action cannot be undone and all store related data will be lost!"
      />
      <div className="flex items-center justify-between">
        <div>
          <Heading title="Settings" description="Manage store preferences" />
        </div>
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
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={loading} className="ml-auto" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="HEALTH_CHECK"
        description={`${import.meta.env.VITE_BASE_URL}/healthcheck`}
        variant="public"
      />
      <ApiAlert
        title="EXPRESS_SERVER_PUBLIC_API_URL"
        description={`${import.meta.env.VITE_BASE_URL}/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
