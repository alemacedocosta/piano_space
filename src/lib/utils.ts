import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Piano / Music utils ────────────────────────────────────────────────────

export const NOTE_NAMES_EN = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const NOTE_NAMES_PT = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];

export type NoteLabel = "solfege" | "note";

export function getNoteName(index: number, mode: NoteLabel = "note"): string {
  const i = ((index % 12) + 12) % 12;
  return mode === "solfege" ? NOTE_NAMES_PT[i] : NOTE_NAMES_EN[i];
}

// Scale intervals (semitones from root)
export const SCALES = {
  major:            [0, 2, 4, 5, 7, 9, 11],
  minor_natural:    [0, 2, 3, 5, 7, 8, 10],
  minor_harmonic:   [0, 2, 3, 5, 7, 8, 11],
  minor_melodic:    [0, 2, 3, 5, 7, 9, 11],
  pentatonic_major: [0, 2, 4, 7, 9],
  pentatonic_minor: [0, 3, 5, 7, 10],
  // Greek modes
  ionian:           [0, 2, 4, 5, 7, 9, 11],
  dorian:           [0, 2, 3, 5, 7, 9, 10],
  phrygian:         [0, 1, 3, 5, 7, 8, 10],
  lydian:           [0, 2, 4, 6, 7, 9, 11],
  mixolydian:       [0, 2, 4, 5, 7, 9, 10],
  aeolian:          [0, 2, 3, 5, 7, 8, 10],
  locrian:          [0, 1, 3, 5, 6, 8, 10],
} as const;

export type ScaleType = keyof typeof SCALES;

export function getScaleNotes(rootIndex: number, scale: ScaleType): number[] {
  return SCALES[scale].map((interval) => rootIndex + interval);
}

// Chord intervals
export const CHORDS = {
  major:         [0, 4, 7],
  minor:         [0, 3, 7],
  diminished:    [0, 3, 6],
  augmented:     [0, 4, 8],
  major7:        [0, 4, 7, 11],
  minor7:        [0, 3, 7, 10],
  dominant7:     [0, 4, 7, 10],
  halfdiminished:[0, 3, 6, 10],
} as const;

export type ChordType = keyof typeof CHORDS;

export function getChordNotes(rootIndex: number, chord: ChordType): number[] {
  return CHORDS[chord].map((interval) => rootIndex + interval);
}

// Circle of fifths order
export const CIRCLE_OF_FIFTHS = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];

// II-V-I (251) for a given root
export function get251(rootIndex: number) {
  return {
    ii: getChordNotes(rootIndex + 2, "minor7"),
    V: getChordNotes(rootIndex + 7, "dominant7"),
    I: getChordNotes(rootIndex, "major7"),
  };
}
