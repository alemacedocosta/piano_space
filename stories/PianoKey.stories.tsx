import type { Meta, StoryObj } from "@storybook/react";
import { PianoKey } from "@/components/piano/PianoKey";

const meta: Meta<typeof PianoKey> = {
  title: "Piano / PianoKey",
  component: PianoKey,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tecla individual do teclado virtual. Pode ser branca ou preta, com estados: default, highlighted (escala), root (tônica) e pressed (tocando).",
      },
    },
  },
  argTypes: {
    keyColor: { control: "select", options: ["white", "black"] },
    state: { control: "select", options: ["default", "highlighted", "root", "pressed"] },
    labelMode: { control: "select", options: ["note", "solfege"] },
    showLabel: { control: "boolean" },
    noteIndex: { control: { type: "range", min: 0, max: 11 } },
  },
  args: {
    noteIndex: 0,
    keyColor: "white",
    state: "default",
    showLabel: true,
    labelMode: "note",
    style: { position: "relative", width: 44, height: 140 },
  },
};

export default meta;
type Story = StoryObj<typeof PianoKey>;

export const WhiteDefault: Story = {
  args: { noteIndex: 0, keyColor: "white", state: "default" },
};

export const WhiteHighlighted: Story = {
  args: { noteIndex: 0, keyColor: "white", state: "highlighted" },
};

export const WhiteRoot: Story = {
  args: { noteIndex: 0, keyColor: "white", state: "root" },
};

export const BlackDefault: Story = {
  args: { noteIndex: 1, keyColor: "black", state: "default", style: { position: "relative", width: 28, height: 90 } },
};

export const BlackHighlighted: Story = {
  args: { noteIndex: 1, keyColor: "black", state: "highlighted", style: { position: "relative", width: 28, height: 90 } },
};

export const BlackRoot: Story = {
  args: { noteIndex: 1, keyColor: "black", state: "root", style: { position: "relative", width: 28, height: 90 } },
};

export const Solfege: Story = {
  args: { noteIndex: 0, keyColor: "white", state: "highlighted", labelMode: "solfege" },
};

export const KeyStates: Story = {
  render: () => (
    <div className="flex gap-2 items-end">
      {(["default", "highlighted", "root", "pressed"] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <PianoKey noteIndex={0} keyColor="white" state={state} showLabel style={{ position: "relative", width: 44, height: 140 }} />
          <span className="text-xs text-navy/60 capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
};
