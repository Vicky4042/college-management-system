import * as React from "react"

export function Badge({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ${className}`}
    >
      {children}
    </span>
  )
}
