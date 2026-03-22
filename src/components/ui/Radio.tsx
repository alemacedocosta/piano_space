"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  value: string;
  name: string;
  disabled?: boolean;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      description,
      checked,
      onChange,
      value,
      name,
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id ?? `${name}-${value}`;

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-[18px] h-[18px] rounded-full border-2 border-navy/20 transition-all duration-200 flex items-center justify-center",
              "cursor-pointer",
              checked && "border-primary",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !disabled && onChange(true)}
          >
            {checked && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={radioId}
                className={cn(
                  "text-sm font-medium text-navy cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn("text-xs text-navy/60", disabled && "opacity-50")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export interface RadioGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  options: RadioGroupOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      orientation = "vertical",
      disabled = false,
      name = "radio-group",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2" ref={ref} {...props}>
        {label && (
          <label className="text-sm font-medium text-navy">{label}</label>
        )}
        <div
          className={cn(
            "flex gap-4",
            orientation === "vertical" && "flex-col",
            orientation === "horizontal" && "flex-row flex-wrap"
          )}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              name={name}
              value={option.value}
              label={option.label}
              description={option.description}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled || option.disabled}
            />
          ))}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { Radio, RadioGroup };
