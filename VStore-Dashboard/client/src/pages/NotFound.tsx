import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <div className="flex items-center justify-center h-full text-center bg-gray-100 ">
        <h1
          className="text-4xl font-semibold aos-init aos-animate"
          data-aos="slide-down"
        >
          <h1 className="text-4xl">404</h1>
          <p className="text-2xl ">
            page not found,{' '}
            <Link
              to={'/'}
              className="font-bold transition border-b border-b-neutral-950 hover:scale-95"
            >
              Go home <Home className="inline" />{' '}
            </Link>
          </p>
        </h1>
      </div>
    </>
  );
}
