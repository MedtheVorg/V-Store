import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useStoreModal } from '@/hooks/use-store-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCreateStoreMutation } from '@/redux/services/storeService';
import { useAppSelector } from '@/redux/hook';
import { Store } from '@/types';

type StoreModalProps = {
  stores?: Store[];
};

const fromSchema = z.object({
  name: z.string().min(1),
});

export default function StoreModal({ stores }: StoreModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const storeModal = useStoreModal();

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [createStore] = useCreateStoreMutation();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try {
      setIsLoading(true);

      const response = await createStore({
        name: values.name,
        userId: userInfo?._id as string,
      }).unwrap();

      navigate(`/dashboard/${response._id}`);

      // close the model
      storeModal.onClose();
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={stores?.length === 0 ? () => {} : storeModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                  disabled={isLoading}
                  variant={'outline'}
                  onClick={stores?.length === 0 ? () => {} : storeModal.onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
