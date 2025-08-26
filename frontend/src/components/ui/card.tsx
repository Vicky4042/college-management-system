import * as React from "react"

export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-lg border bg-white shadow p-4 ${className}`}>{children}</div>
}

export function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="font-semibold mb-2">{children}</div>
}

export function CardTitle({ children }: React.PropsWithChildren) {
  return <h3 className="text-lg font-bold">{children}</h3>
}

export function CardContent({ children }: React.PropsWithChildren) {
  return <div>{children}</div>
}
