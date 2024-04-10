import placeholder from '../../../../../public/images/placeholder.png';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUpdateUserMutation } from '@/redux/services/authService';
import {
  UpdateUserFormValues,
  updateUserSchema,
} from '@/schema/validationSchema';
import { User } from '@/types';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type ProfileFormProps = {
  initialData: User;
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      avatar: initialData.avatar,
      username: initialData.username,
      oldPassword: '',
      newPassword: '',
    },
  });

  //https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const fileRef = form.register('avatar', { required: true });

  const onSubmit = async (formValues: UpdateUserFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      // upload image to cloudinary only if the user uploads a new image
      let imgSrc = undefined;

      if (typeof formValues.avatar[0] !== 'string') {
        imgSrc = await uploadToCloudinary(formValues.avatar[0]);
      }

      await updateUser({
        userId: initialData._id,
        avatar: imgSrc,
        oldPassword:
          formValues.oldPassword?.length === 0
            ? undefined
            : formValues.oldPassword,
        newPassword:
          formValues.newPassword?.length === 0
            ? undefined
            : formValues.newPassword,
        username: formValues.username,
      }).unwrap();

      toast.success('user Updated successfully.', { id: '1' });

      form.reset();
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('UnAuthorized Action.', { id: '1' });
      } else if (error.status === 400) {
        toast.error('Old password is invalid.', { id: '1' });
      } else {
        toast.error('Something went wrong.', { id: '1' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8    space-y-4 lg:max-w-[80%] mx-auto">
      <CardTitle className="text-3xl font-semibold md:text-4xl">
        Profile
      </CardTitle>
      <CardDescription className="text-muted-foreground">
        fill the form below to update your profile
      </CardDescription>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid  md:grid-cols-2 md:gap-x-4 p-2">
              <div className="flex flex-col gap-y-4">
                {/* <FormLabel>Email</FormLabel> */}
                {/* <Input disabled={true} value={initialData.email} /> */}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="username..."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="old password..."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="new password..."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-8 md:hidden" />
              {/* profile image */}
              <div className=" md:border-l p-2">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-center w-full block py-2">
                        Avatar
                      </FormLabel>
                      <FormControl>
                        <div className=" flex flex-col items-center justify-center gap-y-8">
                          <Avatar className="size-64 border-zinc border-2">
                            {field.value ? (
                              <AvatarImage
                                src={
                                  typeof field.value === 'string'
                                    ? field.value
                                    : URL.createObjectURL(field.value[0])
                                }
                                alt="user avatar"
                                className="object-cover m-0 size-64 object-top"
                                onLoad={() => {
                                  URL.revokeObjectURL(field.value[0]);
                                }}
                              />
                            ) : (
                              <AvatarFallback>
                                <img
                                  src={placeholder}
                                  className="object-cover w-full h-full"
                                  alt="placeholder image"
                                />
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div>
                            <Input
                              type="file"
                              disabled={loading}
                              {...fileRef}
                              accept="image/*"
                              className="w-auto hidden"
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
                        </div>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="h-12 mt-20 " disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
