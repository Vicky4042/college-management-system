import * as React from 'react'
import { cn } from '@/lib/utils'

type AlertVariant = 'default' | 'destructive'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  children: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const baseClasses = 'flex items-center p-4 rounded border'
    const variantClasses: Record<AlertVariant, string> = {
      default: 'bg-gray-100 text-gray-800 border-gray-200',
      destructive: 'bg-red-100 text-red-800 border-red-200',
    }

    return (
      <div ref={ref} className={cn(baseClasses, variantClasses[variant], className)} {...props}>
        {children}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

// AlertDescription component
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm ml-2', className)} {...props}>
        {children}
      </p>
    )
  }
)
AlertDescription.displayName = 'AlertDescription'
