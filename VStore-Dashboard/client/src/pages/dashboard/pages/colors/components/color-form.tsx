import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HexColorPicker } from 'react-colorful';

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
import { Color } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateColorMutation,
  useDeleteColorMutation,
  useUpdateColorMutation,
} from '@/redux/services/colorService';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .regex(
      /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      'String must be a valid hex code Color.'
    ),
});

type ColorFormValues = z.infer<typeof formSchema>;
type ColorFormProps = {
  initialData: Color | null;
};

export function ColorForm({ initialData }: ColorFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteColor] = useDeleteColorMutation();

  const title = initialData ? 'Edit Color' : 'Create Color';
  const description = initialData ? 'Edit a Color' : 'Add a new Color ';
  const toastMessage = initialData ? 'Color updated.' : 'Color created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      if (initialData) {
        await updateColor({
          ...data,
          colorId: params.colorId as string,
          storeId: params.storeId as string,
        }).unwrap();
      } else {
        await createColor({
          ...data,
          storeId: params.storeId as string,
        }).unwrap();
        form.reset();
      }

      toast.success(toastMessage, { id: '1' });
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('UnAuthorized', { id: '1' });
      } else {
        toast.error('Something went wrong.', { id: '1' });
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      await deleteColor({
        colorId: params.colorId as string,
        storeId: params.storeId as string,
      }).unwrap();

      toast.success('Color deleted.', { id: '1' });

      navigate(`/dashboard/${params.storeId}/Colors`);
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
          <div className="grid grid-cols-1 gap-8">
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
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                    <FormControl>
                      <div className="flex flex-col">
                        <Input
                          disabled={true}
                          placeholder="Color value"
                          {...field}
                        />

                        <FormMessage />
                      </div>
                    </FormControl>
                    <HexColorPicker
                      style={{ width: '100%' }}
                      color={field.value}
                      onChange={field.onChange}
                    />
                  </div>
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
