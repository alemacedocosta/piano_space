"use client";

import * as React from "react";
import { cn, getScaleNotes, NOTE_NAMES_EN, NOTE_NAMES_PT, type ScaleType, type NoteLabel } from "@/lib/utils";
import { PianoKeyboard } from "./PianoKeyboard";

const SCALE_LABELS: Record<ScaleType, string> = {
  major:            "Maior",
  minor_natural:    "Menor Natural",
  minor_harmonic:   "Menor Harmônica",
  minor_melodic:    "Menor Melódica",
  pentatonic_major: "Pentatônica Maior",
  pentatonic_minor: "Pentatônica Menor",
  ionian:           "Modo Jônio",
  dorian:           "Modo Dórico",
  phrygian:         "Modo Frígio",
  lydian:           "Modo Lídio",
  mixolydian:       "Modo Mixolídio",
  aeolian:          "Modo Eólio",
  locrian:          "Modo Lócrio",
};

export interface ScaleDisplayProps {
  rootNote?: number;         // 0-11
  scaleType?: ScaleType;
  labelMode?: NoteLabel;
  showKeyboard?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ScaleDisplay({
  rootNote = 0,
  scaleType = "major",
  labelMode = "note",
  showKeyboard = true,
  size = "md",
}: ScaleDisplayProps) {
  const [selectedRoot, setSelectedRoot] = React.useState(rootNote);
  const [selectedScale, setSelectedScale] = React.useState<ScaleType>(scaleType);
  const [mode, setMode] = React.useState<NoteLabel>(labelMode);

  const scaleNotes = getScaleNotes(selectedRoot, selectedScale);
  const noteNames = mode === "solfege" ? NOTE_NAMES_PT : NOTE_NAMES_EN;
  const rootName = noteNames[selectedRoot];

  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl border border-navy-light p-4 shadow-card">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end">
        {/* Root note selector */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/60 uppercase tracking-wide">Tônica</label>
          <select
            value={selectedRoot}
            onChange={(e) => setSelectedRoot(Number(e.target.value))}
            className="rounded-lg border border-navy/20 px-2.5 py-1.5 text-sm text-navy bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {(mode === "solfege" ? NOTE_NAMES_PT : NOTE_NAMES_EN)
              .filter((_, i) => i < 12)
              .map((name, i) => (
                <option key={i} value={i}>{name}</option>
              ))}
          </select>
        </div>

        {/* Scale type selector */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy/60 uppercase tracking-wide">Escala</label>
          <select
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value as ScaleType)}
            className="rounded-lg border border-navy/20 px-2.5 py-1.5 text-sm text-navy bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {(Object.keys(SCALE_LABELS) as ScaleType[]).map((key) => (
              <option key={key} value={key}>{SCALE_LABELS[key]}</option>
            ))}
          </select>
        </div>

        {/* Label mode */}
        <div className="flex gap-1 rounded-lg border border-navy/20 p-0.5">
          {(["note", "solfege"] as NoteLabel[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                mode === m
                  ? "bg-primary text-white shadow-sm"
                  : "text-navy/60 hover:text-navy"
              )}
            >
              {m === "note" ? "C D E" : "Dó Ré Mi"}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="flex items-baseline gap-2">
        <h3 className="text-lg font-bold text-navy">{rootName} {SCALE_LABELS[selectedScale]}</h3>
        <span className="text-xs text-navy/40">{scaleNotes.length} notas</span>
      </div>

      {/* Note pills */}
      <div className="flex flex-wrap gap-2">
        {scaleNotes.map((note, i) => {
          const noteMod = ((note % 12) + 12) % 12;
          const name = noteNames[noteMod];
          const isRoot = noteMod === selectedRoot;
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center rounded-lg px-3 py-1.5 text-center min-w-[44px]",
                isRoot
                  ? "bg-accent text-white shadow-sm"
                  : "bg-primary-light text-primary-dark"
              )}
            >
              <span className="text-xs text-current/60 font-medium">{i + 1}</span>
              <span className="text-sm font-bold leading-tight">{name}</span>
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      {showKeyboard && (
        <div className="overflow-x-auto">
          <PianoKeyboard
            highlightedNotes={scaleNotes}
            rootNote={selectedRoot}
            octaves={2}
            startOctave={4}
            showLabels={true}
            labelMode={mode}
            size={size}
          />
        </div>
      )}
    </div>
  );
}
