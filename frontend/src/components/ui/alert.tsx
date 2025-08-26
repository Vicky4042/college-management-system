import * as React from "react"

export function Alert({ children }: React.PropsWithChildren) {
  return <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded">{children}</div>
}

export function AlertDescription({ children }: React.PropsWithChildren) {
  return <p className="text-sm">{children}</p>
}
