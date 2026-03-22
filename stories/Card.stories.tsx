import type { Meta, StoryObj } from "@storybook/react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  LessonCard, SongCard, StreakCard,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const meta: Meta = {
  title: "UI / Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cards do Piano space: genérico, LessonCard (lições), SongCard (músicas) e StreakCard (ofensiva de prática).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Generic: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Escala de Dó Maior</CardTitle>
        <CardDescription>A escala mais fundamental da música ocidental tonal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1.5 flex-wrap">
          {["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"].map((n) => (
            <Badge key={n} variant="outline" size="sm">{n}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Praticar</Button>
        <Button variant="ghost" size="sm">Detalhes</Button>
      </CardFooter>
    </Card>
  ),
};

export const Lesson: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <LessonCard
        order={1}
        title="Sua primeira escala em Dó Maior"
        description="Aprenda a tocar a escala de Dó Maior com as digitações corretas."
        level="Beginner"
        status="Completed"
        stars={3}
      />
      <LessonCard
        order={2}
        title="Modos Gregos: Dórico"
        description="Entenda o que faz o Modo Dórico soar diferente da escala menor natural."
        level="Intermediate"
        status="Started"
        stars={1}
      />
      <LessonCard
        order={3}
        title="Escalas Pentatônicas"
        description="A escala favorita do blues e do rock — e por quê ela funciona em qualquer música."
        level="Beginner"
      />
    </div>
  ),
};

export const Song: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <SongCard
        title="Für Elise"
        composer="Ludwig van Beethoven"
        difficultyRating={2}
        bpmSuggested={72}
        status="Started"
        accuracyScore={0.87}
      />
      <SongCard
        title="Clair de Lune"
        composer="Claude Debussy"
        difficultyRating={4}
        bpmSuggested={54}
        status="Mastered"
        accuracyScore={0.96}
      />
      <SongCard
        title="Nocturno Op.9 Nº2"
        composer="Frédéric Chopin"
        difficultyRating={5}
        bpmSuggested={66}
      />
    </div>
  ),
};

export const Streak: Story = {
  render: () => (
    <div className="max-w-sm">
      <StreakCard currentStreak={7} longestStreak={21} totalMinutes={490} />
    </div>
  ),
};

export const AllCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <LessonCard
        order={1}
        title="Sua primeira escala em Dó Maior"
        description="Aprenda a tocar a escala de Dó Maior."
        level="Beginner"
        status="Completed"
        stars={3}
      />
      <SongCard
        title="Für Elise"
        composer="Ludwig van Beethoven"
        difficultyRating={2}
        bpmSuggested={72}
        status="Started"
        accuracyScore={0.87}
      />
      <StreakCard currentStreak={7} longestStreak={21} totalMinutes={490} />
      <Card hover bordered>
        <CardHeader>
          <CardTitle>Ciclo das Quintas</CardTitle>
          <CardDescription>Explore as relações entre as 12 tonalidades.</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="pro" dot>PRO</Badge>
        </CardContent>
        <CardFooter>
          <Button variant="accent" size="sm" fullWidth>Desbloquear</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
