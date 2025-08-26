import * as React from "react"

export function Tabs({ children }: React.PropsWithChildren) {
  return <div>{children}</div>
}

export function TabsList({ children }: React.PropsWithChildren) {
  return <div className="flex border-b mb-2">{children}</div>
}

export function TabsTrigger({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500"
    >
      {children}
    </button>
  )
}

export function TabsContent({ children }: React.PropsWithChildren) {
  return <div className="mt-2">{children}</div>
}
