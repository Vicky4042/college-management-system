// frontend/src/components/ui/avatar.tsx
import { FC, ReactNode } from 'react';

interface AvatarProps {
  children?: ReactNode;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({ children, className }) => (
  <div className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ${className || ''}`}>
    {children}
  </div>
);

export const AvatarFallback: FC<AvatarProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
