import PageLoading from '@/components/ui/page-Loading';
import { useAppSelector } from '@/redux/hook';
import { useGetUserQuery } from '@/redux/services/authService';
import ProfileForm from './components/profile-form';
import { User } from '@/types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const userId = useAppSelector((state) => state.auth.userInfo?._id);

  const { data, isLoading, error } = useGetUserQuery(userId as string);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        // should log out user ??
        toast.error('something went wrong while fetching user data');
      }
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <PageLoading />;
  }
  return <ProfileForm initialData={data as User} />;
}
