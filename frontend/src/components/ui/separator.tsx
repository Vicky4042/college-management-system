import * as React from "react";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return <hr className={`border-t border-gray-200 my-4 ${className || ""}`} />;
}
