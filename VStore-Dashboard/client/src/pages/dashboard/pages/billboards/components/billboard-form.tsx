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
import { Billboard } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import {
  useCreateBillboardMutation,
  useDeleteBillboardMutation,
  useUpdateBillboardMutation,
} from '@/redux/services/billboardService';
import ImageUploader from './image-uploader';

const formSchema = z.object({
  label: z.string().min(1, 'billboard label is required'),
  images: z
    .any()
    .refine((file) => {
      return file?.length == 0 ? false : true;
    }, 'File is required.')
    .refine((file: FileList) => {
      if (typeof file[0] === 'string') return true;

      return file[0]?.type.includes('image');
    }, 'only images are allowed.')
    .refine((file) => {
      if (typeof file[0] === 'string') return true;

      return file[0]?.size <= 3000000;
    }, 'Max file size is 3MB.'),
});

type BillboardFormValues = z.infer<typeof formSchema>;
type BillboardFormProps = {
  initialData: Billboard | null;
};

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [createBillboard] = useCreateBillboardMutation();
  const [updateBillboard] = useUpdateBillboardMutation();
  const [deleteBillboard] = useDeleteBillboardMutation();

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard ';
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (initialData && {
      images: [initialData.imageUrl],
      label: initialData.label,
    }) || {
      images: '',
      label: '',
    },
  });

  const onSubmit = async (formValues: BillboardFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      // upload image to cloudinary only if the user uploads a new image
      let imgSrc = undefined;

      if (typeof formValues.images[0] !== 'string') {
        imgSrc = await uploadToCloudinary(formValues.images[0]);
      }

      if (initialData) {
        await updateBillboard({
          storeId: params.storeId as string,
          billboardId: params.billboardId as string,
          imageUrl: imgSrc,
          label: formValues.label,
        }).unwrap();
      } else {
        await createBillboard({
          imageUrl: imgSrc,
          label: formValues.label,
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

      await deleteBillboard({
        storeId: params.storeId as string,
        billboardId: params.billboardId as string,
      }).unwrap();

      navigate(`/dashboard/${params.storeId}/billboards`);

      toast.success('Billboard deleted.', { id: '1' });
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
          className="space-y-8 w-full "
        >
          {/* uploaded Files or images preview */}
          <ImageUploader
            initialData={initialData}
            form={form}
            loading={loading}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Billboard label..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
