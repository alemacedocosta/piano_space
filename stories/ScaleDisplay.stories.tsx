import type { Meta, StoryObj } from "@storybook/react";
import { ScaleDisplay } from "@/components/piano/ScaleDisplay";

const meta: Meta<typeof ScaleDisplay> = {
  title: "Piano / ScaleDisplay",
  component: ScaleDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente completo de visualização de escalas. Combina seletores de tônica e tipo de escala, pílulas de notas e o teclado virtual interativo.",
      },
    },
  },
  argTypes: {
    rootNote: { control: { type: "range", min: 0, max: 11 } },
    scaleType: {
      control: "select",
      options: [
        "major", "minor_natural", "minor_harmonic", "minor_melodic",
        "pentatonic_major", "pentatonic_minor",
        "ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian",
      ],
    },
    labelMode: { control: "select", options: ["note", "solfege"] },
    showKeyboard: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    rootNote: 0,
    scaleType: "major",
    labelMode: "note",
    showKeyboard: true,
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof ScaleDisplay>;

export const CMajor: Story = {
  name: "Dó Maior",
  args: { rootNote: 0, scaleType: "major" },
};

export const AMinor: Story = {
  name: "Lá Menor Natural",
  args: { rootNote: 9, scaleType: "minor_natural" },
};

export const GDorian: Story = {
  name: "Modo Dórico em Sol",
  args: { rootNote: 7, scaleType: "dorian" },
};

export const FPentatonic: Story = {
  name: "Pentatônica Maior em Fá",
  args: { rootNote: 5, scaleType: "pentatonic_major" },
};

export const WithSolfege: Story = {
  name: "Com solfejo",
  args: { rootNote: 0, scaleType: "major", labelMode: "solfege" },
};

export const NoKeyboard: Story = {
  name: "Sem teclado",
  args: { rootNote: 0, scaleType: "major", showKeyboard: false },
};
