"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva("", {
  variants: {
    variant: {
      default: "border-b border-navy-light",
      pills: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsTriggerVariants = cva(
  "px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer outline-none",
  {
    variants: {
      variant: {
        default: "border-b-2 border-transparent text-navy/60 hover:text-navy data-[state=active]:border-primary data-[state=active]:text-primary",
        pills: "rounded-lg text-navy hover:bg-navy-light data-[state=active]:bg-primary data-[state=active]:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsContextType {
  value: string;
  variant: "default" | "pills";
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs component must be used within Tabs");
  }
  return context;
};

interface TabsProps extends VariantProps<typeof tabsVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(controlledValue ?? defaultValue ?? "");

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (controlledValue === undefined) {
          setValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange]
    );

    const contextValue = {
      value: controlledValue ?? value,
      variant: variant as "default" | "pills",
      onValueChange: handleValueChange,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(tabsVariants({ variant }))}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTabsContext();
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          "flex items-center",
          variant === "default" && "gap-0",
          variant === "pills" && "gap-2 p-1 bg-navy-light rounded-lg w-fit"
        )}
        {...props}
      />
    );
  }
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, children, ...props }, ref) => {
    const { value: activeValue, variant, onValueChange } = useTabsContext();

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={activeValue === value}
        data-state={activeValue === value ? "active" : "inactive"}
        className={cn(tabsTriggerVariants({ variant }), className)}
        onClick={(e) => {
          onValueChange(value);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();

    if (activeValue !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn("mt-4", className)}
        {...props}
      />
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
