import * as React from "react"

export function Table({ children }: React.PropsWithChildren) {
  return <table className="min-w-full border border-gray-300">{children}</table>
}

export function TableHeader({ children }: React.PropsWithChildren) {
  return <thead className="bg-gray-100">{children}</thead>
}

export function TableRow({ children }: React.PropsWithChildren) {
  return <tr className="border-b">{children}</tr>
}

export function TableHead({ children }: React.PropsWithChildren) {
  return <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">{children}</th>
}

export function TableBody({ children }: React.PropsWithChildren) {
  return <tbody>{children}</tbody>
}

export function TableCell({ children }: React.PropsWithChildren) {
  return <td className="px-4 py-2 text-sm">{children}</td>
}
