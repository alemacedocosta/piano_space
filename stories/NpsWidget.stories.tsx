import type { Meta, StoryObj } from "@storybook/react";
import { NpsWidget } from "@/components/ui/Input";

const meta: Meta<typeof NpsWidget> = {
  title: "UI / NpsWidget",
  component: NpsWidget,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Widget de NPS (Net Promoter Score) in-app com campo de sugestões aberto. Exibido ao final de sessões de prática para coleta de feedback contínuo.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NpsWidget>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <NpsWidget onSubmit={(score, feedback) => console.log({ score, feedback })} />
    </div>
  ),
};
