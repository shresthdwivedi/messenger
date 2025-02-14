"use client";

import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  errors: FieldErrors<FieldValues>,
  id: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type, errors, required, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-[#9b6dff]",
            errors[id] && 'focus:ring-rose-500',
            className
          )}
          autoComplete={id} 
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
