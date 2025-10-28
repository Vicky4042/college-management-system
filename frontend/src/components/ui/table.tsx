import * as React from "react"
import { cn } from "@/lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
export function Table({ children, className, ...props }: TableProps) {
  return (
    <table className={cn("min-w-full border border-gray-300", className)} {...props}>
      {children}
    </table>
  )
}

interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export function TableHeader({ children, className, ...props }: TableSectionProps) {
  return <thead className={cn("bg-gray-100", className)} {...props}>{children}</thead>
}
export function TableBody({ children, className, ...props }: TableSectionProps) {
  return <tbody className={className} {...props}>{children}</tbody>
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export function TableRow({ children, className, ...props }: TableRowProps) {
  return <tr className={cn("border-b", className)} {...props}>{children}</tr>
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export function TableCell({ children, className, ...props }: TableCellProps) {
  return <td className={cn("px-4 py-2 text-sm", className)} {...props}>{children}</td>
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export function TableHead({ children, className, ...props }: TableHeadProps) {
  return <th className={cn("px-4 py-2 text-left text-sm font-medium text-gray-600", className)} {...props}>{children}</th>
}
