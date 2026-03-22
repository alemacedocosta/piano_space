"use client";
import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { getChordNotes, NOTE_NAMES_EN, NOTE_NAMES_PT } from "@/lib/utils";

const CHORD_TYPES = [
  { key: "major", label: "Maior", symbol: "", desc: "Alegre e estável. Base da música tonal." },
  { key: "minor", label: "Menor", symbol: "m", desc: "Melancólico e expressivo." },
  { key: "dominant7", label: "Dominante 7ª", symbol: "7", desc: "Tensão que resolve na tônica." },
  { key: "major7", label: "Maior 7ª", symbol: "maj7", desc: "Suave e sofisticado. Muito no jazz." },
  { key: "minor7", label: "Menor 7ª", symbol: "m7", desc: "Quente e jazzístico." },
  { key: "diminished", label: "Diminuto", symbol: "°", desc: "Tenso e instável. Cria suspense." },
  { key: "augmented", label: "Aumentado", symbol: "+", desc: "Misterioso e dissonante." },
  { key: "sus4", label: "Suspenso (sus4)", symbol: "sus4", desc: "Aberto, sem definir maior ou menor." },
];

const INTERVALS: Record<string, string[]> = {
  major: ["1", "3", "5"],
  minor: ["1", "b3", "5"],
  dominant7: ["1", "3", "5", "b7"],
  major7: ["1", "3", "5", "7"],
  minor7: ["1", "b3", "5", "b7"],
  diminished: ["1", "b3", "b5"],
  augmented: ["1", "3", "#5"],
  sus4: ["1", "4", "5"],
};

export default function AcordesPage() {
  const [root, setRoot] = useState(0);
  const [chordType, setChordType] = useState("major");

  const highlighted = getChordNotes(root, chordType as keyof typeof import("@/lib/utils").CHORDS);

  const selectedChordInfo = CHORD_TYPES.find((c) => c.key === chordType);
  const chordName = `${NOTE_NAMES_EN[root]}${selectedChordInfo?.symbol ?? ""}`;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎹</span>
          <h1 className="text-3xl font-bold text-navy">Dicionário de Acordes</h1>
        </div>
        <p className="text-navy/60 text-lg">
          Entenda como os acordes são formados e visualize-os no teclado.
        </p>
      </div>

      {/* Teoria rápida */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-navy/10 p-5">
          <h3 className="font-bold text-navy mb-2">O que é um acorde?</h3>
          <p className="text-navy/60 text-sm leading-relaxed">
            Um acorde é a combinação de 3 ou mais notas tocadas simultaneamente. Os acordes básicos
            (tríades) são formados por três notas separadas por intervalos de terça.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-navy/10 p-5">
          <h3 className="font-bold text-navy mb-2">Cifras e símbolos</h3>
          <p className="text-navy/60 text-sm leading-relaxed">
            Na cifra, <strong>C</strong> = Dó maior, <strong>Cm</strong> = Dó menor,{" "}
            <strong>C7</strong> = Dó com sétima dominante, <strong>Cmaj7</strong> = Dó com sétima
            maior. O símbolo vem sempre após a letra da nota raiz.
          </p>
        </div>
      </section>

      {/* Ferramenta interativa */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6 mb-8">
        <h2 className="text-lg font-bold text-navy mb-4">🎹 Explorar acordes</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {/* Seletor de nota raiz */}
          <div>
            <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-2">Nota raiz</label>
            <div className="flex flex-wrap gap-1">
              {NOTE_NAMES_EN.map((n, i) => (
                <button
                  key={i}
                  onClick={() => setRoot(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    root === i
                      ? "bg-primary text-white"
                      : "bg-sand-light text-navy hover:bg-sand"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seletor de tipo */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-2">Tipo de acorde</label>
          <div className="flex flex-wrap gap-2">
            {CHORD_TYPES.map((c) => (
              <button
                key={c.key}
                onClick={() => setChordType(c.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  chordType === c.key
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-navy border-navy/20 hover:border-primary/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resultado */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-sand-light rounded-xl px-5 py-3">
            <span className="text-2xl font-bold text-navy">{chordName}</span>
          </div>
          <div>
            <p className="text-sm text-navy/60">{selectedChordInfo?.desc}</p>
            <p className="text-xs text-navy/40 mt-1">
              Intervalos: {INTERVALS[chordType]?.join(" — ")}
            </p>
          </div>
        </div>

        <PianoKeyboard
          startOctave={4}
          numOctaves={2}
          highlightedNotes={highlighted}
          rootNote={root}
          size="md"
          labelMode="note"
        />
      </section>

      {/* Tabela de acordes */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">📋 Todos os tipos de acorde</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Nome</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Símbolo</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Intervalos</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Caráter</th>
              </tr>
            </thead>
            <tbody>
              {CHORD_TYPES.map((c) => (
                <tr
                  key={c.key}
                  className="border-b border-navy/5 hover:bg-sand-light/50 cursor-pointer transition-colors"
                  onClick={() => setChordType(c.key)}
                >
                  <td className="py-2.5 px-3 font-medium text-navy">{c.label}</td>
                  <td className="py-2.5 px-3 font-mono text-navy/70">
                    C{c.symbol}
                  </td>
                  <td className="py-2.5 px-3 text-navy/60 text-xs">{INTERVALS[c.key]?.join(" - ")}</td>
                  <td className="py-2.5 px-3 text-navy/60">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
