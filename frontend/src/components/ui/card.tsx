import * as React from "react";

// Main Card wrapper
export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-lg border bg-white shadow p-4 ${className || ''}`}>{children}</div>
}

// Card header
export function CardHeader({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`font-semibold mb-2 ${className || ''}`}>{children}</div>
}

// Card title
export function CardTitle({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={`text-lg font-bold ${className || ''}`}>{children}</h3>
}

// Card content
export function CardContent({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>
}
