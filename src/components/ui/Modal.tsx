"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalSizeVariants = cva("", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ModalProps extends VariantProps<typeof modalSizeVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    { open, onClose, title, children, footer, size = "md", ...props },
    ref
  ) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "auto";
      };
    }, [open, onClose]);

    if (!open) return null;

    return (
      <>
        <div
          className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-50"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            ref={ref}
            className={cn(
              "w-full bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]",
              modalSizeVariants({ size })
            )}
            {...props}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-light">
                <h2 className="text-lg font-semibold text-navy">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-navy/60 hover:text-navy transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>
            {footer && (
              <div className="border-t border-navy-light px-6 py-4 flex gap-3 justify-end">
                {footer}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = "Modal";

export { Modal };
