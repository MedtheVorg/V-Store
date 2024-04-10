import { cn } from '@/lib/utils';
import React, { MouseEventHandler } from 'react';

type IconButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string;
    disabled?: boolean;
};

export default function IconButton({
    onClick,
    className,
    icon,
    disabled,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition disabled:opacity-50',
                className
            )}
            disabled={disabled}
        >
            {icon}
        </button>
    );
}
