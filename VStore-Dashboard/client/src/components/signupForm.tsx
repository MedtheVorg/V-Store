import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { SignUpFormValues, signUpFormSchema } from '@/schema/validationSchema';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { useRegisterUserMutation } from '@/redux/services/authService';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Logo from './Logo';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: undefined,
    },
  });

  //https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const fileRef = form.register('avatar', { required: true });

  const onSubmit = async (formValues: SignUpFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading', { id: '1' });

      const imgSrc = await uploadToCloudinary(formValues.avatar[0]);

      await registerUser({
        ...formValues,
        avatar: imgSrc,
      }).unwrap();

      toast.success('Account Created!', { id: '1' });

      navigate('/signin');
    } catch (error: any) {
      if (error.status === 409) {
        toast.error('a user already exists with the provided email', {
          id: '1',
        });
      } else {
        toast.error('Something went wrong.', { id: '1' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div
        className="items-center justify-center hidden border-r bg-muted/50 lg:flex"
        data-aos="fade-down"
      >
        <Logo className="size-96" />
      </div>
      <div className="flex items-center justify-center py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg p-8 space-y-3 border rounded-md"
            data-aos="fade-down"
          >
            <h1 className="text-3xl font-semibold md:text-5xl">Sign Up</h1>
            <p className="text-muted-foreground">
              Fill the form bellow to create a new account.
            </p>

            <div className="flex flex-col gap-y-4">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email..."
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="password..."
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-x-2">
                        <Input
                          type="file"
                          disabled={loading}
                          {...fileRef}
                          accept="image/*"
                        />

                        <Avatar>
                          <AvatarImage
                            src={
                              field.value?.[0]
                                ? URL.createObjectURL(field.value?.[0])
                                : undefined
                            }
                            alt="user avatar"
                            className="object-cover m-0 size-16"
                          />
                          <AvatarFallback>Av</AvatarFallback>
                        </Avatar>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full h-12 mt-10" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?
              <Button asChild disabled={loading} variant={'link'}>
                <Link to="/signin" className="underline">
                  Sign in
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
