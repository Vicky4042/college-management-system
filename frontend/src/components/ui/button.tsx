import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "ghost":
      variantClass = "bg-transparent text-gray-700 hover:bg-gray-100";
      break;
    case "outline":
      variantClass = "border border-gray-400 text-gray-700 hover:bg-gray-100";
      break;
    default:
      variantClass = "bg-gray-200 text-gray-900";
  }

  let sizeClass = "";
  switch (size) {
    case "sm":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "lg":
      sizeClass = "px-4 py-2 text-lg";
      break;
    default:
      sizeClass = "px-3 py-2 text-md";
  }

  return (
    <Component
      className={`${variantClass} ${sizeClass} rounded transition-colors duration-200`}
      {...props}
    >
      {children}
    </Component>
  );
}
