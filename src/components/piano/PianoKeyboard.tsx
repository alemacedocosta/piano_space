"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { isBlackKey, PianoKey, type KeyState } from "./PianoKey";
import type { NoteLabel } from "@/lib/utils";

// ── Layout constants ─────────────────────────────────────────────────────────
const WHITE_KEY_WIDTH = 44;  // px
const WHITE_KEY_HEIGHT = 140; // px
const BLACK_KEY_WIDTH = 28;   // px
const BLACK_KEY_HEIGHT = 90;  // px

// Offset of black keys within each octave (relative to white key starts)
// Pattern: C C# D D# E F F# G G# A A# B
// White keys: C D E F G A B  (7 per octave)
// Black keys offset from white key left edge:
const BLACK_KEY_OFFSETS: Record<number, number> = {
  1:  WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,       // C# after C
  3:  WHITE_KEY_WIDTH * 2 - BLACK_KEY_WIDTH / 2,   // D# after D
  6:  WHITE_KEY_WIDTH * 4 - BLACK_KEY_WIDTH / 2,   // F# after F
  8:  WHITE_KEY_WIDTH * 5 - BLACK_KEY_WIDTH / 2,   // G# after G
  10: WHITE_KEY_WIDTH * 6 - BLACK_KEY_WIDTH / 2,   // A# after A
};

export interface PianoKeyboardProps {
  /** Chromatic indices (0-based from C0) of highlighted notes */
  highlightedNotes?: number[];
  /** Chromatic index of the root note (rendered differently) */
  rootNote?: number;
  /** Number of octaves to show */
  octaves?: number;
  /** Starting octave (0-8) */
  startOctave?: number;
  /** Whether to show note labels */
  showLabels?: boolean;
  labelMode?: NoteLabel;
  onNotePress?: (noteIndex: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_SCALES = { sm: 0.7, md: 1, lg: 1.3 };

export function PianoKeyboard({
  highlightedNotes = [],
  rootNote,
  octaves = 2,
  startOctave = 4,
  showLabels = true,
  labelMode = "note",
  onNotePress,
  className,
  size = "md",
}: PianoKeyboardProps) {
  const scale = SIZE_SCALES[size];
  const wkW = WHITE_KEY_WIDTH * scale;
  const wkH = WHITE_KEY_HEIGHT * scale;
  const bkW = BLACK_KEY_WIDTH * scale;
  const bkH = BLACK_KEY_HEIGHT * scale;

  // Build the list of all notes to render
  const totalNotes = octaves * 12;
  const startNote = startOctave * 12;

  // Collect white and black keys separately
  const whiteKeys: Array<{ noteIndex: number; x: number }> = [];
  const blackKeys: Array<{ noteIndex: number; x: number }> = [];

  let whiteCount = 0;
  for (let i = 0; i < totalNotes; i++) {
    const noteIndex = startNote + i;
    const chromatic = i % 12;
    if (!isBlackKey(chromatic)) {
      whiteKeys.push({ noteIndex, x: whiteCount * wkW });
      whiteCount++;
    } else {
      // Find the previous white key's x
      const prevWhiteCount = whiteKeys.length;
      const octaveStart = Math.floor(i / 12) * 7 * wkW;
      const inOctaveOffset = (BLACK_KEY_OFFSETS[chromatic] ?? 0) * scale;
      const octaveIndex = Math.floor(i / 12);
      blackKeys.push({
        noteIndex,
        x: octaveIndex * 7 * wkW + inOctaveOffset,
      });
    }
  }

  const totalWidth = whiteCount * wkW;
  const highlightSet = new Set(
    highlightedNotes.map((n) => ((n % 12) + 12) % 12)
  );
  const rootMod = rootNote !== undefined ? ((rootNote % 12) + 12) % 12 : -1;

  const getState = (noteIndex: number): KeyState => {
    const mod = ((noteIndex % 12) + 12) % 12;
    if (mod === rootMod) return "root";
    if (highlightSet.has(mod)) return "highlighted";
    return "default";
  };

  return (
    <div
      className={cn("relative overflow-x-auto", className)}
      style={{ width: "100%" }}
    >
      <div
        className="relative mx-auto"
        style={{ width: totalWidth, height: wkH }}
      >
        {/* White keys */}
        {whiteKeys.map(({ noteIndex, x }) => (
          <PianoKey
            key={`w-${noteIndex}`}
            noteIndex={noteIndex}
            keyColor="white"
            state={getState(noteIndex)}
            labelMode={labelMode}
            showLabel={showLabels}
            onPress={onNotePress}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: wkW - 2,
              height: wkH,
            }}
          />
        ))}
        {/* Black keys — rendered on top */}
        {blackKeys.map(({ noteIndex, x }) => (
          <PianoKey
            key={`b-${noteIndex}`}
            noteIndex={noteIndex}
            keyColor="black"
            state={getState(noteIndex)}
            labelMode={labelMode}
            showLabel={showLabels}
            onPress={onNotePress}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: bkW,
              height: bkH,
            }}
          />
        ))}
      </div>
    </div>
  );
}
