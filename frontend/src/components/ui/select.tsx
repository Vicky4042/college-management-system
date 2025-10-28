import * as React from 'react'

interface SelectProps {
  value: string
  onChange: (val: string) => void
  children: React.ReactNode
}

export function Select({ value, onChange, children }: SelectProps) {
  return <div className="relative">{children}</div>
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <button className="border rounded w-full text-left px-3 py-2">{children}</button>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="border rounded mt-1 bg-white">{children}</div>
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div className="px-3 py-2 cursor-pointer">{children}</div>
}
