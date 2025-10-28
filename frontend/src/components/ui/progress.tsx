import * as React from 'react'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div className={`w-full bg-gray-200 rounded ${className}`} {...props}>
      <div
        className="bg-blue-600 h-2 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
