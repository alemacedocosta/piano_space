"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex items-center justify-center font-semibold text-white overflow-hidden flex-shrink-0",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-14 h-14 text-lg",
        xl: "w-18 h-18 text-2xl",
      },
      variant: {
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "circle",
    },
  }
);

const bgColors = [
  "bg-primary",
  "bg-accent",
  "bg-sand",
  "bg-navy-medium",
  "bg-primary-dark",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorByName(name: string): string {
  const charCode = name.charCodeAt(0);
  return bgColors[charCode % bgColors.length];
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: React.ReactNode;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = "md",
      variant = "circle",
      src,
      alt,
      name,
      fallback,
      ...props
    },
    ref
  ) => {
    if (src) {
      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ size, variant, className }))}
          {...props}
        >
          <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
        </div>
      );
    }

    if (name) {
      const initials = getInitials(name);
      const bgColor = getColorByName(name);

      return (
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size, variant, className }),
            bgColor
          )}
          title={name}
          {...props}
        >
          {initials}
        </div>
      );
    }

    if (fallback) {
      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ size, variant, className }), "bg-navy-light")}
          {...props}
        >
          {fallback}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, variant, className }), "bg-navy-light")}
        {...props}
      >
        <svg
          className="w-1/2 h-1/2 text-navy"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export interface AvatarGroupProps {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, ...props }, ref) => {
    const visibleChildren = max ? children.slice(0, max) : children;
    const hiddenCount = max && children.length > max ? children.length - max : 0;

    return (
      <div ref={ref} className="flex items-center" {...props}>
        {visibleChildren.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            className: cn(child.props.className, "-ml-2 ring-2 ring-white"),
          })
        )}
        {hiddenCount > 0 && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-navy-light text-navy text-sm font-semibold -ml-2 ring-2 ring-white">
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
