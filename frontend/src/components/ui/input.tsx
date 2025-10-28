import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border px-3 py-2 rounded w-full outline-none focus:ring focus:ring-blue-300 ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
