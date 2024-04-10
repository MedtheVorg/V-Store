import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category, Color, Image, Product, Size } from '@/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageUploader from './image-uploader';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/redux/services/productService';
import AlertModel from '@/pages/dashboard/components/modals/alert-modal';
import { Checkbox } from '@/components/ui/checkbox';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';

const formSchema = z.object({
  name: z.string().min(1),
  images: z
    .any()
    .refine((files) => {
      return files?.length == 0 ? false : true;
    }, 'Image is required.')
    .refine((files: FileList) => {
      if (typeof (files[0] as unknown as Image)?.url === 'string') return true;

      return files[0]?.type.includes('image');
    }, 'only images are allowed.')
    .refine((files) => {
      if (typeof files[0] === 'string') return true;
      for (let i = 0; i < files.length; i++) {
        if (files[i]?.size > 3000000) {
          return false;
        }
      }
      return true;
    }, 'Max Image size is 3MB.')
    .refine((files: FileList) => {
      return files.length > 5 ? false : true;
    }, 'max Images count is 5'),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;
type ProductFormProps = {
  initialData: Product | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
};

export function ProductForm({
  initialData,
  categories = [],
  sizes = [],
  colors = [],
}: ProductFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const title = initialData ? 'Edit Product' : 'Create Product';
  const description = initialData ? 'Edit a Product' : 'Add a new Product ';
  const toastMessage = initialData ? 'Product updated.' : 'Product created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (initialData && {
      ...initialData,
      categoryId: initialData.category?._id,
      sizeId: initialData.size?._id,
      colorId: initialData.color?._id,
    }) || {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    },
  });

  const onSubmit = async (formValues: ProductFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      // upload images to cloudinary only if the user uploads  new images
      let uploadedImages: Image[] | undefined = undefined;

      if (typeof (formValues.images[0] as Image)?.url !== 'string') {
        uploadedImages = [];
        for (let i = 0; i < formValues.images.length; i++) {
          const imageUrl = await uploadToCloudinary(formValues.images[i]);

          uploadedImages.push({ url: imageUrl });
        }
      }

      if (initialData) {
        await updateProduct({
          ...formValues,
          images: uploadedImages ? (uploadedImages as Image[]) : undefined,
          storeId: params.storeId as string,
          productId: params.productId as string,
          category: formValues.categoryId,
          size: formValues.sizeId,
          color: formValues.colorId,
        }).unwrap();
      } else {
        await createProduct({
          ...formValues,
          images: uploadedImages as Image[],
          storeId: params.storeId as string,
          category: formValues.categoryId,
          size: formValues.sizeId,
          color: formValues.colorId,
        }).unwrap();
      }

      navigate(`/dashboard/${params.storeId}/products`);

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

      deleteProduct({
        storeId: params.storeId as string,
        productId: params.productId as string,
      }).unwrap(),
        toast.success('Product deleted.', { id: '1' });

      navigate(`/dashboard/${params.storeId}/products`);
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
          <ImageUploader
            form={form}
            initialData={initialData}
            loading={loading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="19.80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <div className="flex items-center justify-between gap-x-2">
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                          <Link
                            to={`/dashboard/${params.storeId}/categories/new`}
                          >
                            <Button type="button" size={'icon'}>
                              <Plus />
                            </Button>
                          </Link>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category._id} key={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a size"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem value={size._id} key={size._id}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Link to={`/dashboard/${params.storeId}/sizes/new`}>
                        <Button type="button" size={'icon'}>
                          <Plus />
                        </Button>
                      </Link>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a color"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem value={color._id} key={color._id}>
                              <div className="flex items-center gap-x-2">
                                <div
                                  className="size-6 rounded-full border"
                                  style={{ backgroundColor: color.value }}
                                />
                                {color.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Link to={`/dashboard/${params.storeId}/colors/new`}>
                        <Button type="button" size={'icon'}>
                          <Plus />
                        </Button>
                      </Link>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row  items-start space-x-3 space-y-0 border p-4 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="leading-0 space-y-1">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row  items-start space-x-3 space-y-0 border p-4 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="leading-0 space-y-1">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
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
