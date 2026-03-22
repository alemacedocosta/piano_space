"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressFillVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-primary",
      warning: "bg-sand-dark",
      error: "bg-crimson",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const progressSizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ProgressProps extends VariantProps<typeof progressFillVariants>, VariantProps<typeof progressSizeVariants> {
  value: number;
  label?: string;
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      label,
      showValue = false,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <div ref={ref} className="flex flex-col gap-2" {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <span className="text-sm font-medium text-navy">{label}</span>}
            {showValue && <span className="text-sm text-navy/60">{clampedValue}%</span>}
          </div>
        )}
        <div className={cn(
          "w-full bg-navy-light rounded-full overflow-hidden",
          progressSizeVariants({ size })
        )}>
          <div
            className={cn(
              "h-full transition-all duration-500 rounded-full",
              progressFillVariants({ variant })
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
