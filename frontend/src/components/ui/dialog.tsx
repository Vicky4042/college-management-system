import * as React from "react"

export function Dialog({ children }: React.PropsWithChildren) {
  return <div>{children}</div>
}

export function DialogTrigger({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button onClick={onClick} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
      {children}
    </button>
  )
}

export function DialogContent({ children }: React.PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg">{children}</div>
    </div>
  )
}

export function DialogHeader({ children }: React.PropsWithChildren) {
  return <div className="font-semibold mb-2">{children}</div>
}

export function DialogTitle({ children }: React.PropsWithChildren) {
  return <h3 className="text-lg font-bold">{children}</h3>
}
