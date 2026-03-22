"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
  resize?: "none" | "y" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, rows = 4, resize = "y", id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const resizeClass = {
      none: "resize-none",
      y: "resize-y",
      both: "resize",
    }[resize];

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy placeholder:text-navy/40",
            "transition-all duration-200 outline-none",
            "border-navy/20 hover:border-navy/40",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-crimson focus:border-crimson focus:ring-crimson/20",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-navy-light",
            resizeClass,
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-crimson">{error}</p>
        ) : hint ? (
          <p className="text-xs text-navy/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
