"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse bg-navy-light",
  {
    variants: {
      variant: {
        text: "h-4 rounded",
        circle: "rounded-full",
        rect: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "rect",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string;
  height?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "rect",
      width = "w-full",
      height,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant }),
          width,
          height ?? (variant === "text" ? "" : "h-12"),
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard = ({ count = 1 }: SkeletonCardProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex gap-3 p-4 border border-navy-light rounded-lg">
          <Skeleton variant="circle" width="w-10" height="h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="w-3/4" />
            <Skeleton variant="text" width="w-1/2" />
            <Skeleton variant="rect" height="h-1" className="mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export { Skeleton, SkeletonCard };
