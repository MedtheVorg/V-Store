import { useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeAccessToken, removeUser } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  useGetUserQuery,
  useLogoutUserMutation,
} from '@/redux/services/authService';
import { LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function UserButton() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const { data: userData } = useGetUserQuery(userInfo?._id as string);

  const onLogout = async () => {
    try {
      await logoutUser(null);
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      dispatch(removeUser());
      dispatch(removeAccessToken());
      setTheme('light');
      navigate(0);
    }
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} className="rounded-full ">
            <Avatar
              className="border-[2px] border-transparent transition-all duration-300 hover:border-black dark:hover:border-white"
              title={userData?.username}
            >
              <AvatarImage
                src={userData?.avatar}
                className="object-cover m-0 size-16"
              />
              <AvatarFallback>
                {userData?.username.slice(0, 0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="profile">
            <DropdownMenuItem className="flex items-center cursor-pointer gap-x-2">
              <User size={20} /> <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center cursor-pointer gap-x-2"
            onClick={onLogout}
          >
            <LogOut size={20} /> <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
