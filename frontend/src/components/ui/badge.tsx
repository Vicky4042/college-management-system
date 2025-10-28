import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'default' | 'outline' | 'secondary' | 'destructive'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  children?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children, ...props }) => {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded text-sm font-medium'

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-800',
    secondary: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </div>
  )
}
