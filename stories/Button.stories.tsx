import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";
import { Music, ChevronRight, Star } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI / Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Botão principal do Piano space. Disponível em 7 variantes, 5 tamanhos e suporte a ícones e estado de loading.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "ghost", "outline", "danger", "sand"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "icon", "icon-sm"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Começar agora",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Stories ──────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", children: "Assinar PRO · R$ 1/mês" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Ver detalhes" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "Continuar praticando" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Cancelar" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Explorar escalas" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Cancelar assinatura" },
};

export const Sand: Story = {
  args: { variant: "sand", children: "Ver progresso" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Salvando..." },
};

export const WithLeftIcon: Story = {
  args: {
    variant: "primary",
    leftIcon: <Music className="w-4 h-4" />,
    children: "Praticar agora",
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: "outline",
    rightIcon: <ChevronRight className="w-4 h-4" />,
    children: "Próxima lição",
  },
};

export const FullWidth: Story = {
  args: { variant: "primary", fullWidth: true, children: "Criar conta gratuita" },
  parameters: { layout: "padded" },
};

export const SizeSM: Story = {
  args: { variant: "primary", size: "sm", children: "PRO" },
};

export const SizeLG: Story = {
  args: { variant: "primary", size: "lg", children: "Começar 7 dias grátis" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="sand">Sand</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon"><Star className="w-4 h-4" /></Button>
    </div>
  ),
};
