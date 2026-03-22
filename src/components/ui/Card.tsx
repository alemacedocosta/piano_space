"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Base Card ────────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  selected?: boolean;
  bordered?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, selected = false, bordered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white shadow-card transition-all duration-200",
        hover && "hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
        selected && "ring-2 ring-primary ring-offset-1",
        bordered && "border border-navy-light",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-5 pb-3", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold text-navy text-base leading-snug", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-navy/60 leading-relaxed", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 pb-3", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center px-5 py-3 pt-2 border-t border-navy-light gap-3", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// ── Lesson Card ──────────────────────────────────────────────────────────────

import { Badge, LevelBadge, StatusBadge } from "./Badge";
import { BookOpen, Music, Star } from "lucide-react";

export interface LessonCardProps {
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status?: "Started" | "Completed" | "Mastered";
  order?: number;
  stars?: number;
  onClick?: () => void;
}

export function LessonCard({
  title, description, level, status, order, stars, onClick,
}: LessonCardProps) {
  return (
    <Card hover={!!onClick} onClick={onClick} className="flex flex-col gap-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {order !== undefined && (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-light text-navy text-xs font-bold flex items-center justify-center">
                {order}
              </span>
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          <LevelBadge level={level} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {(status || stars !== undefined) && (
        <CardFooter>
          {status && <StatusBadge status={status} />}
          {stars !== undefined && (
            <div className="ml-auto flex items-center gap-0.5">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    "w-4 h-4",
                    s <= stars ? "fill-accent text-accent" : "text-navy/20"
                  )}
                />
              ))}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

// ── Song Card ────────────────────────────────────────────────────────────────

export interface SongCardProps {
  title: string;
  composer: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  bpmSuggested?: number;
  status?: "Started" | "Completed" | "Mastered";
  accuracyScore?: number;
  onClick?: () => void;
}

const DIFFICULTY_LABELS = ["", "Muito fácil", "Fácil", "Médio", "Difícil", "Muito difícil"];

export function SongCard({
  title, composer, difficultyRating, bpmSuggested, status, accuracyScore, onClick,
}: SongCardProps) {
  return (
    <Card hover={!!onClick} onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-light flex items-center justify-center flex-shrink-0">
              <Music className="w-4 h-4 text-navy" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <p className="text-xs text-navy/50 mt-0.5">{composer}</p>
            </div>
          </div>
          <Badge variant="outline" size="sm">
            {DIFFICULTY_LABELS[difficultyRating]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs text-navy/60">
          {bpmSuggested && (
            <span className="flex items-center gap-1">
              ♩ {bpmSuggested} BPM
            </span>
          )}
          {accuracyScore !== undefined && (
            <span className="flex items-center gap-1">
              🎯 {Math.round(accuracyScore * 100)}% precisão
            </span>
          )}
        </div>
      </CardContent>
      {status && (
        <CardFooter>
          <StatusBadge status={status} />
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i < difficultyRating ? "bg-accent" : "bg-navy/10"
                )}
              />
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// ── Streak Card ──────────────────────────────────────────────────────────────

export interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
}

export function StreakCard({ currentStreak, longestStreak, totalMinutes }: StreakCardProps) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return (
    <Card className="bg-gradient-to-br from-navy to-navy-medium text-white border-0">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white/70">Sua ofensiva</span>
          <span className="text-3xl">🔥</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-3xl font-bold text-white">{currentStreak}</p>
            <p className="text-xs text-white/60 mt-0.5">dias seguidos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-light">{longestStreak}</p>
            <p className="text-xs text-white/60 mt-0.5">recorde</p>
          </div>
          <div>
            <p className="text-xl font-bold text-sand">
              {hours > 0 ? `${hours}h${mins > 0 ? `${mins}m` : ""}` : `${mins}m`}
            </p>
            <p className="text-xs text-white/60 mt-0.5">total praticado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
