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
import { Billboard } from '@/types';

type ImageUploaderProps = {
  form: UseFormReturn<
    {
      label: string;
      images?: any;
    },
    any,
    undefined
  >;
  initialData: Billboard | null;
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
              typeof form.getValues('images')[0] === 'string' ? ( // string[]
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
                  <ImagePlus className="size-4 mr-2" />
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
      label: string;
      images?: any;
    },
    any,
    undefined
  >;
  loading: boolean;
};

function PreviewFiles({ files, form, loading }: PreviewFilesProps) {
  const onRemove = (targetFile: File) => {
    const newValues = Array.from(files).filter((file) => file !== targetFile);
    form.setValue('images', newValues);
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      {Array.from(files).map((file) => (
        <div
          key={`${file.name}-${file.lastModified}`}
          className="relative aspect-video w-full h-[400px] rounded-md overflow-hidden "
        >
          <div className="z-10 absolute top-2 right-2">
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
            className="object-cover object-center  absolute size-full disabled:opacity-50"
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
  images: string[];
  form: UseFormReturn<
    {
      label: string;
      images?: any;
    },
    any,
    undefined
  >;
  loading: boolean;
};
function PreviewImages({ images, form, loading }: PreviewImagesProps) {
  const onRemove = (targetImage: string) => {
    const newValues = images.filter((image) => image !== targetImage);

    form.setValue('images', newValues);
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      {images.map((image) => (
        <div
          key={image}
          className="relative aspect-video w-full h-[400px] rounded-md overflow-hidden "
        >
          <div className="z-10 absolute top-2 right-2">
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
            className="object-cover absolute size-full"
            alt="image"
            src={image}
            aria-disabled="true"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
