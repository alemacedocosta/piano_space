import type { Meta, StoryObj } from "@storybook/react";
import { Badge, PlanBadge, LevelBadge, StatusBadge } from "@/components/ui/Badge";

const meta: Meta<typeof Badge> = {
  title: "UI / Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badges do Piano space. Inclui variantes para planos (FREE/PRO), níveis de dificuldade e status de progresso.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "free", "pro", "beginner", "intermediate", "advanced",
        "started", "completed", "mastered", "navy", "outline", "sand",
        "success", "warning", "danger",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Badge", size: "md", dot: false },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: "outline", children: "Piano space" },
};

export const Plans: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <PlanBadge plan="FREE" />
      <PlanBadge plan="PRO" />
    </div>
  ),
};

export const Levels: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <LevelBadge level="Beginner" />
      <LevelBadge level="Intermediate" />
      <LevelBadge level="Advanced" />
    </div>
  ),
};

export const ProgressStatus: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <StatusBadge status="Started" />
      <StatusBadge status="Completed" />
      <StatusBadge status="Mastered" />
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge variant="free" dot>FREE</Badge>
      <Badge variant="pro" dot>PRO</Badge>
      <Badge variant="completed" dot>Concluído</Badge>
      <Badge variant="mastered" dot>Dominado</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(["free","pro","beginner","intermediate","advanced","started","completed","mastered","navy","outline","sand"] as const)
        .map(v => <Badge key={v} variant={v}>{v}</Badge>)}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Badge variant="pro" size="sm">PRO · sm</Badge>
      <Badge variant="pro" size="md">PRO · md</Badge>
      <Badge variant="pro" size="lg">PRO · lg</Badge>
    </div>
  ),
};
