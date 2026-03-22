"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        free:         "bg-primary-light text-primary-dark border border-primary/30",
        pro:          "bg-accent-light text-accent-dark border border-accent/30",
        beginner:     "bg-primary-light text-primary-dark",
        intermediate: "bg-sand text-navy",
        advanced:     "bg-crimson/10 text-crimson border border-crimson/20",
        started:      "bg-sand text-navy",
        completed:    "bg-primary-light text-primary-dark",
        mastered:     "bg-accent-light text-accent-dark",
        navy:         "bg-navy text-white",
        outline:      "border border-navy/30 text-navy bg-transparent",
        sand:         "bg-sand text-navy",
        success:      "bg-primary-light text-primary-dark",
        warning:      "bg-sand text-navy",
        danger:       "bg-crimson/10 text-crimson",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props}>
        {dot && (
          <span
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full",
              variant === "free" && "bg-primary",
              variant === "pro" && "bg-accent",
              variant === "completed" && "bg-primary",
              variant === "mastered" && "bg-accent",
              variant === "advanced" && "bg-crimson",
              (!variant || variant === "outline") && "bg-navy"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Plan badge helper
export function PlanBadge({ plan }: { plan: "FREE" | "PRO" }) {
  return (
    <Badge variant={plan === "PRO" ? "pro" : "free"} dot>
      {plan}
    </Badge>
  );
}

// Level badge helper
export function LevelBadge({ level }: { level: "Beginner" | "Intermediate" | "Advanced" }) {
  const variantMap = {
    Beginner: "beginner",
    Intermediate: "intermediate",
    Advanced: "advanced",
  } as const;
  return <Badge variant={variantMap[level]}>{level}</Badge>;
}

// Progress status badge
export function StatusBadge({ status }: { status: "Started" | "Completed" | "Mastered" }) {
  const variantMap = {
    Started: "started",
    Completed: "completed",
    Mastered: "mastered",
  } as const;
  return (
    <Badge variant={variantMap[status]} dot>
      {status === "Started" ? "Iniciado" : status === "Completed" ? "Concluído" : "Dominado"}
    </Badge>
  );
}

export { Badge, badgeVariants };
