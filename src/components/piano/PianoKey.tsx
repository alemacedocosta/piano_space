"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NOTE_NAMES_EN, NOTE_NAMES_PT, type NoteLabel } from "@/lib/utils";

export type KeyColor = "white" | "black";
export type KeyState = "default" | "highlighted" | "root" | "pressed";

export interface PianoKeyProps {
  noteIndex: number;          // 0-11 (chromatic index)
  octave?: number;            // visual reference
  keyColor: KeyColor;
  state?: KeyState;
  labelMode?: NoteLabel;
  showLabel?: boolean;
  onPress?: (noteIndex: number) => void;
  // Layout props (set by PianoKeyboard)
  style?: React.CSSProperties;
  className?: string;
}

// Is this chromatic index a black key?
const BLACK_KEY_INDICES = new Set([1, 3, 6, 8, 10]);
export const isBlackKey = (index: number) => BLACK_KEY_INDICES.has(((index % 12) + 12) % 12);

export const PianoKey = React.forwardRef<HTMLDivElement, PianoKeyProps>(
  ({
    noteIndex,
    octave,
    keyColor,
    state = "default",
    labelMode = "note",
    showLabel = true,
    onPress,
    style,
    className,
  }, ref) => {
    const [pressed, setPressed] = React.useState(false);
    const noteName = labelMode === "solfege"
      ? NOTE_NAMES_PT[((noteIndex % 12) + 12) % 12]
      : NOTE_NAMES_EN[((noteIndex % 12) + 12) % 12];
    const isActive = pressed || state === "pressed";

    const handleMouseDown = () => {
      setPressed(true);
      onPress?.(noteIndex);
    };
    const handleMouseUp = () => setPressed(false);

    if (keyColor === "white") {
      return (
        <div
          ref={ref}
          role="button"
          aria-label={`${noteName}${octave ?? ""}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          style={style}
          className={cn(
            "piano-white-key",
            state === "highlighted" && "piano-white-key highlighted",
            state === "root" && "piano-white-key root",
            isActive && "pressed",
            className
          )}
        >
          {showLabel && (
            <span
              className={cn(
                "absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold select-none leading-none",
                state === "default" && "text-navy/40",
                state === "highlighted" && "text-primary-dark",
                state === "root" && "text-accent-dark",
                isActive && "text-navy/60"
              )}
            >
              {noteName}
            </span>
          )}
        </div>
      );
    }

    // Black key
    return (
      <div
        ref={ref}
        role="button"
        aria-label={`${noteName}${octave ?? ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        style={style}
        className={cn(
          "piano-black-key",
          state === "highlighted" && "piano-black-key highlighted",
          state === "root" && "piano-black-key root",
          isActive && "pressed",
          className
        )}
      >
        {showLabel && (
          <span
            className={cn(
              "absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-semibold select-none leading-none text-white/60",
              state === "highlighted" && "text-white/90",
              state === "root" && "text-white"
            )}
          >
            {noteName}
          </span>
        )}
      </div>
    );
  }
);

PianoKey.displayName = "PianoKey";
