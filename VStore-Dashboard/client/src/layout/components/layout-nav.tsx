import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { Link } from 'react-router-dom';

export default function LayoutNav() {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <nav className=" flex items-center justify-center space-x-4 px-4 border-b-[1px] border-b-zinc-600 py-2  ">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <Link to={'/'}>
          <Logo className="duration-500  hover:fill-white" />
        </Link>
        <div className="flex items-center font-semibold duration-500 gap-x-2 text-zinc-100 hover:text-white">
          {userInfo ? (
            <Link to={'/dashboard'}>Dashboard</Link>
          ) : (
            <div className="space-x-2">
              <Link to={'/signin'}>
                <Button>Sign in</Button>
              </Link>

              <Link to={'/signup'}>
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
