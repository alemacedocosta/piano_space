"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const sideClasses: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, side = "top", delay = 200, ...props }, ref) => {
    const delayMs = delay;

    return (
      <div
        ref={ref}
        className="relative inline-flex group"
        {...props}
      >
        {children}
        <div
          className={cn(
            "absolute bg-navy text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 pointer-events-none",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            sideClasses[side]
          )}
          style={{
            transitionDelay: `${delayMs}ms`,
          }}
        >
          {content}
          <div
            className={cn(
              "absolute w-2 h-2 bg-navy",
              side === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45",
              side === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2 rotate-45",
              side === "left" && "right-[-4px] top-1/2 -translate-y-1/2 rotate-45",
              side === "right" && "left-[-4px] top-1/2 -translate-y-1/2 rotate-45"
            )}
          />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
