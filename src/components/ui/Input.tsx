"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy placeholder:text-navy/40",
              "transition-all duration-200 outline-none",
              "border-navy/20 hover:border-navy/40",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              error && "border-crimson focus:border-crimson focus:ring-crimson/20",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-navy-light",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-crimson">{error}</p>
        ) : hint ? (
          <p className="text-xs text-navy/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

// ── NPS Widget ───────────────────────────────────────────────────────────────

export interface NpsWidgetProps {
  onSubmit?: (score: number, feedback?: string) => void;
}

export function NpsWidget({ onSubmit }: NpsWidgetProps) {
  const [score, setScore] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (score === null) return;
    onSubmit?.(score, feedback);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-primary-light border border-primary/20 p-5 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-sm font-medium text-navy">Obrigado pelo feedback!</p>
        <p className="text-xs text-navy/60 mt-1">Sua opinião nos ajuda a melhorar o Piano space.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-navy-light p-5 flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-navy">De 0 a 10, quanto você recomendaria o Piano space?</p>
        <p className="text-xs text-navy/50 mt-0.5">0 = nunca recomendaria · 10 = com certeza recomendaria</p>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => setScore(i)}
            className={cn(
              "w-9 h-9 rounded-lg text-sm font-semibold transition-all",
              score === i
                ? "bg-primary text-white scale-110 shadow-sm"
                : i <= 6
                ? "bg-crimson/10 text-crimson hover:bg-crimson/20"
                : i <= 8
                ? "bg-sand text-navy hover:bg-sand-dark"
                : "bg-primary-light text-primary-dark hover:bg-primary/20"
            )}
          >
            {i}
          </button>
        ))}
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Sugestões de melhoria (opcional)..."
        rows={3}
        className={cn(
          "w-full rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy",
          "placeholder:text-navy/40 resize-none outline-none",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        )}
      />
      <button
        onClick={handleSubmit}
        disabled={score === null}
        className={cn(
          "w-full rounded-lg py-2.5 text-sm font-semibold transition-all",
          score !== null
            ? "bg-primary text-white hover:bg-primary-dark"
            : "bg-navy/10 text-navy/40 cursor-not-allowed"
        )}
      >
        Enviar feedback
      </button>
    </div>
  );
}

export { Input };
