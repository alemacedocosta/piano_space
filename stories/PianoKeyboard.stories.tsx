import type { Meta, StoryObj } from "@storybook/react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { getScaleNotes, getChordNotes } from "@/lib/utils";

const meta: Meta<typeof PianoKeyboard> = {
  title: "Piano / PianoKeyboard",
  component: PianoKeyboard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Teclado de piano virtual completo. Suporta destaque de notas de escalas e acordes, seleção de tônica, modo de label (cifra/solfejo) e tamanhos sm/md/lg.",
      },
    },
  },
  argTypes: {
    octaves: { control: { type: "range", min: 1, max: 4 } },
    startOctave: { control: { type: "range", min: 2, max: 6 } },
    showLabels: { control: "boolean" },
    labelMode: { control: "select", options: ["note", "solfege"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    octaves: 2,
    startOctave: 4,
    showLabels: true,
    labelMode: "note",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof PianoKeyboard>;

// ── Stories ──────────────────────────────────────────────────────────────────

export const Empty: Story = {
  args: { highlightedNotes: [], rootNote: undefined },
};

export const CMajorScale: Story = {
  name: "Escala de Dó Maior (C Major)",
  args: {
    highlightedNotes: getScaleNotes(0, "major"),
    rootNote: 0,
  },
};

export const AMinorNatural: Story = {
  name: "Escala de Lá Menor Natural",
  args: {
    highlightedNotes: getScaleNotes(9, "minor_natural"),
    rootNote: 9,
  },
};

export const DDorian: Story = {
  name: "Modo Dórico em Ré",
  args: {
    highlightedNotes: getScaleNotes(2, "dorian"),
    rootNote: 2,
  },
};

export const EPhrygian: Story = {
  name: "Modo Frígio em Mi",
  args: {
    highlightedNotes: getScaleNotes(4, "phrygian"),
    rootNote: 4,
  },
};

export const CPentatonicMajor: Story = {
  name: "Pentatônica Maior em Dó",
  args: {
    highlightedNotes: getScaleNotes(0, "pentatonic_major"),
    rootNote: 0,
  },
};

export const CMajorChord: Story = {
  name: "Acorde de Dó Maior",
  args: {
    highlightedNotes: getChordNotes(0, "major"),
    rootNote: 0,
    octaves: 1,
  },
};

export const Dominant7Chord: Story = {
  name: "Acorde G7 (Sol com sétima dominante)",
  args: {
    highlightedNotes: getChordNotes(7, "dominant7"),
    rootNote: 7,
    octaves: 2,
  },
};

export const Solfege: Story = {
  name: "Com solfejo (Dó, Ré, Mi...)",
  args: {
    highlightedNotes: getScaleNotes(0, "major"),
    rootNote: 0,
    labelMode: "solfege",
  },
};

export const SmallSize: Story = {
  name: "Tamanho Small",
  args: {
    highlightedNotes: getScaleNotes(0, "major"),
    rootNote: 0,
    size: "sm",
  },
};

export const LargeSize: Story = {
  name: "Tamanho Large",
  args: {
    highlightedNotes: getScaleNotes(0, "major"),
    rootNote: 0,
    size: "lg",
  },
};

export const ThreeOctaves: Story = {
  name: "3 Oitavas",
  args: {
    highlightedNotes: getScaleNotes(0, "major"),
    rootNote: 0,
    octaves: 3,
    size: "sm",
  },
};
