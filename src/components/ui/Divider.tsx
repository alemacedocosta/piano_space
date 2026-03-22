"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement | HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  variant?: "solid" | "dashed";
}

const Divider = React.forwardRef<HTMLElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      label,
      variant = "solid",
      ...props
    },
    ref
  ) => {
    const borderClass = variant === "dashed" ? "border-dashed" : "";

    if (orientation === "horizontal") {
      if (label) {
        return (
          <div
            className={cn("flex items-center gap-3", className)}
            {...props}
          >
            <hr className={cn("flex-1 border-navy-light", borderClass)} />
            <span className="text-xs text-navy/50">{label}</span>
            <hr className={cn("flex-1 border-navy-light", borderClass)} />
          </div>
        );
      }

      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={cn("border-navy-light", borderClass, className)}
          {...props}
        />
      );
    }

    if (orientation === "vertical") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            "inline-block w-px min-h-[1em] bg-navy-light",
            className
          )}
          {...props}
        />
      );
    }

    return null;
  }
);

Divider.displayName = "Divider";

export { Divider };
