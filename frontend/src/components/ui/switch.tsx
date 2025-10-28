import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Switch({ ...props }: SwitchProps) {
  return (
    <input
      type="checkbox"
      className="w-10 h-6 rounded-full bg-gray-300 checked:bg-blue-500 transition-colors duration-200"
      {...props}
    />
  );
}
