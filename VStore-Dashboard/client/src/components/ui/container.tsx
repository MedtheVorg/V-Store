import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('px-2 sm:px-0 max-w-7xl mx-auto w-full', className)}>
      {children}
    </div>
  );
}
