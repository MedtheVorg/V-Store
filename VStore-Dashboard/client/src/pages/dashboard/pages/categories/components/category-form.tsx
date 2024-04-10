import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
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
import { Billboard, Category } from '@/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/redux/services/categoryService';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;
type CategoryFormProps = {
  initialData: Category | null;
  billboards: Billboard[];
};

export function CategoryForm({
  initialData,
  billboards = [],
}: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    'https://unsplash.it/1080/400?image=60'
  );

  const params = useParams();
  const navigate = useNavigate();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData ? 'Edit a Category' : 'Add a new Category ';
  const toastMessage = initialData ? 'Category updated.' : 'Category created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (initialData && {
      name: initialData.name,
      billboardId: initialData.billboardId as string,
    }) || {
      name: '',
      billboardId: '',
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      if (initialData) {
        await updateCategory({
          categoryId: params.categoryId as string,
          storeId: params.storeId as string,
          billboardId: data.billboardId,
          name: data.name,
        }).unwrap();
      } else {
        await createCategory({
          storeId: params.storeId as string,
          billboardId: data.billboardId,
          name: data.name,
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

      await deleteCategory({
        categoryId: params.categoryId as string,
        storeId: params.storeId as string,
      }).unwrap();

      toast.success('Category deleted.', { id: '1' });

      navigate(`/dashboard/${params.storeId}/categories`);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex items-center justify-between gap-x-2">
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            const imageSrc = billboards.find(
                              (ele) => ele._id === value
                            )?.imageUrl as string;

                            setSelectedImage(imageSrc);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a billboard"
                                className="text-left"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {billboards.map((item) => (
                              <SelectItem value={item._id} key={item._id}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Link
                          to={`/dashboard/${params.storeId}/billboards/new`}
                        >
                          <Button type="button" size={'icon'}>
                            <Plus />
                          </Button>
                        </Link>
                      </div>
                      <div>
                        <img
                          src={selectedImage}
                          alt="billboard image"
                          className="aspect-video object-cover h-[300px] w-full rounded-md mt-4"
                        />
                      </div>
                    </div>
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
