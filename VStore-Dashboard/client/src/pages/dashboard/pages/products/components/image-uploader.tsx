import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Image, Product } from '@/types';
import { cn } from '@/lib/utils';

type ImageUploaderProps = {
  form: UseFormReturn<
    {
      name: string;
      price: number;
      categoryId: string;
      colorId: string;
      sizeId: string;
      images?: any;
      isFeatured?: boolean | undefined;
      isArchived?: boolean | undefined;
    },
    any,
    undefined
  >;
  initialData: Product | null;
  loading: boolean;
};

export default function ImageUploader({
  form,
  initialData,
  loading,
}: ImageUploaderProps) {
  const fileRef = form.register('images', { required: true });

  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormLabel>Background image</FormLabel>
          <FormControl>
            <section>
              {initialData &&
              typeof form.getValues('images')[0].url === 'string' ? ( // string[]
                <PreviewImages
                  form={form}
                  images={form.getValues('images')}
                  loading={loading}
                />
              ) : (
                <PreviewFiles
                  files={form.getValues('images')}
                  form={form}
                  loading={loading}
                />
              )}

              <div>
                <input
                  type="file"
                  accept="image/*"
                  {...fileRef}
                  className="hidden"
                  disabled={loading}
                  multiple
                  onChange={fileRef.onChange}
                />
                <Button
                  variant={'secondary'}
                  type="button"
                  className="relative"
                  disabled={loading}
                  onClick={(e) => {
                    (
                      (e.target as HTMLButtonElement)
                        .previousElementSibling as HTMLInputElement
                    ).click();
                  }}
                >
                  <ImagePlus className="mr-2 size-4" />
                  upload an image
                </Button>
              </div>
            </section>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type PreviewFilesProps = {
  files: FileList;
  form: UseFormReturn<
    {
      name: string;
      price: number;
      categoryId: string;
      colorId: string;
      sizeId: string;
      images?: any;
      isFeatured?: boolean | undefined;
      isArchived?: boolean | undefined;
    },
    any,
    undefined
  >;
  loading: boolean;
};

function PreviewFiles({ files, form, loading }: PreviewFilesProps) {
  const onRemove = (targetFile: File) => {
    const newValues = Array.from(files).filter((file) => file !== targetFile);
    //clear errors to retrigger zod validation
    form.clearErrors('images');
    form.setValue('images', newValues);
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-4 overflow-auto sm:grid-cols-3 md:grid-cols-5">
      {Array.from(files).map((file) => (
        <div
          key={`${file.name}-${file.lastModified}`}
          className="relative flex h-[150px] w-full  rounded-md overflow-hidden border-2 grow  "
        >
          <div className="absolute z-10 top-2 right-2 ">
            <Button
              type="button"
              onClick={() => onRemove(file)}
              variant={'destructive'}
              size={'icon'}
              disabled={loading}
            >
              <Trash className="size-4" />
            </Button>
          </div>
          <img
            className={cn(
              'object-cover absolute size-full disabled:opacity-50 ',
              file.size > 3000000 && 'border-2 border-red-500'
            )}
            alt="image"
            src={URL.createObjectURL(file)}
            onLoad={() => {
              URL.revokeObjectURL(file.name);
            }}
          />
        </div>
      ))}
    </div>
  );
}

type PreviewImagesProps = {
  images: Image[];
  form: UseFormReturn<
    {
      name: string;
      price: number;
      categoryId: string;
      colorId: string;
      sizeId: string;
      images?: any;
      isFeatured?: boolean | undefined;
      isArchived?: boolean | undefined;
    },
    any,
    undefined
  >;
  loading: boolean;
};
function PreviewImages({ images, form, loading }: PreviewImagesProps) {
  const onRemove = (targetImage: Image) => {
    const newValues = images.filter((image) => image.url !== targetImage.url);
    //clear errors to retrigger zod validation
    form.clearErrors('images');
    form.setValue('images', newValues);
  };

  return (
    <div className="flex items-center gap-4 mb-4 ">
      {images.map((image) => (
        <div
          key={image.url}
          className="relative size-[200px] rounded-md overflow-hidden "
        >
          <div className="absolute z-10 top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(image)}
              variant={'destructive'}
              size={'icon'}
              disabled={loading}
            >
              <Trash className="size-4" />
            </Button>
          </div>
          <img
            className="absolute object-cover size-full"
            alt="image"
            src={image.url}
            aria-disabled="true"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
