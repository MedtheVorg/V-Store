// "use client"
import toast from 'react-hot-toast';
import { Copy, Server } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';

type ApiAlertProps = {
  title: string;
  description: string;
  variant: 'public' | 'admin';
};

const textMap: Record<ApiAlertProps['variant'], string> = {
  admin: 'Admin',
  public: 'Public',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  admin: 'destructive',
  public: 'secondary',
};

export default function ApiAlert({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Api Route copied to the clipboard    ');
  };

  return (
    <Alert>
      <Server className="w-4 h-4  " />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex  items-center justify-between gap-x-4 w-full  ">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono overflow-clip  text-sm font-semibold text-ellipsis ">
          {description}
        </code>
        <Button variant={'outline'} size={'icon'} onClick={onCopy}>
          <Copy className="size-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
