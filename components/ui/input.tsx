import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-9 w-full min-w-0 rounded-md border bg-white dark:bg-gray-800 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        // Text styles
        "text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        // Border styles
        "border-gray-300 dark:border-gray-600",
        // Focus styles
        "focus-visible:border-blue-500 dark:focus-visible:border-blue-400",
        "focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20",
        // Selection styles
        "selection:bg-blue-100 dark:selection:bg-blue-900",
        "selection:text-gray-900 dark:selection:text-gray-100",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "file:text-gray-700 dark:file:text-gray-300",
        // Invalid styles
        "aria-invalid:border-red-500 dark:aria-invalid:border-red-400",
        "aria-invalid:ring-2 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-400/20",
        // Disabled styles
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900",
        // Responsive
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }