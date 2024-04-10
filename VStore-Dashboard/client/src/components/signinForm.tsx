import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';

import { SignInFormValues, signInFormSchema } from '@/schema/validationSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginUserMutation } from '@/redux/services/authService';
import { useAppDispatch } from '@/redux/hook';
import { setAccessToken, setUser, userInfo } from '@/redux/features/authSlice';
import Logo from './Logo';

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUser] = useLoginUserMutation();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formValues: SignInFormValues) => {
    try {
      setLoading(true);
      toast.loading('Loading...', { id: '1' });

      const responseData = (await loginUser(formValues).unwrap()) as {
        user: userInfo;
        accessToken: string;
      };

      dispatch(setUser(responseData.user));
      dispatch(setAccessToken(responseData.accessToken));

      toast.dismiss('1');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.status === 400) {
        toast.error('Invalid Credentials', { id: '1' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div
        className="hidden bg-muted/50  lg:flex items-center justify-center border-r"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <Logo className="size-96" />
      </div>
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 border  rounded-md  w-full max-w-lg  space-y-3"
            data-aos="fade-down"
          >
            <h1 className="text-3xl font-semibold ">Sign In</h1>
            <p className="text-muted-foreground">
              Fill the form bellow to sign in.
            </p>

            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
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
                        placeholder="password..."
                        type="password"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full h-12 mt-10" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Button asChild disabled={loading} variant={'link'}>
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
