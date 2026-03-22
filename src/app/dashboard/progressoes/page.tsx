"use client";
import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { getChordNotes, NOTE_NAMES_EN, NOTE_NAMES_PT } from "@/lib/utils";

const THEORY = [
  {
    title: "O que é II-V-I?",
    text: "É a progressão harmônica mais importante da música tonal. Composta pelos acordes do II, V e I graus de uma tonalidade, ela cria tensão (II → V) e resolução (V → I), sendo base do jazz, MPB e música clássica.",
  },
  {
    title: "Por que ela funciona?",
    text: "O acorde V (dominante) cria forte tensão por conter o trítono — intervalo instável que 'quer' resolver. Quando o V vai para o I, o ouvinte sente completude. O II prepara o V de forma suave e natural.",
  },
  {
    title: "Variações comuns",
    text: "Em tom maior: IIm7 – V7 – Imaj7. Em tom menor: IIm7b5 – V7 – Im7. Substitutos de trítono, acordes secundários e reharmonizações ampliam as possibilidades.",
  },
];

// Progressões em todas as 12 tonalidades maiores
const ALL_KEYS = [
  { root: 0,  label: "C",  ii: "Dm7",  v: "G7",   i: "Cmaj7" },
  { root: 2,  label: "D",  ii: "Em7",  v: "A7",   i: "Dmaj7" },
  { root: 4,  label: "E",  ii: "F#m7", v: "B7",   i: "Emaj7" },
  { root: 5,  label: "F",  ii: "Gm7",  v: "C7",   i: "Fmaj7" },
  { root: 7,  label: "G",  ii: "Am7",  v: "D7",   i: "Gmaj7" },
  { root: 9,  label: "A",  ii: "Bm7",  v: "E7",   i: "Amaj7" },
  { root: 11, label: "B",  ii: "C#m7", v: "F#7",  i: "Bmaj7" },
  { root: 1,  label: "Db", ii: "Ebm7", v: "Ab7",  i: "Dbmaj7" },
  { root: 3,  label: "Eb", ii: "Fm7",  v: "Bb7",  i: "Ebmaj7" },
  { root: 6,  label: "F#", ii: "G#m7", v: "C#7",  i: "F#maj7" },
  { root: 8,  label: "Ab", ii: "Bbm7", v: "Eb7",  i: "Abmaj7" },
  { root: 10, label: "Bb", ii: "Cm7",  v: "F7",   i: "Bbmaj7" },
];

const CHORD_STEP_INFO = [
  { label: "II", color: "bg-sand", border: "border-sand-dark", text: "text-navy", role: "Subdominante", desc: "Prepara o V com suavidade." },
  { label: "V",  color: "bg-accent/20", border: "border-accent/50", text: "text-navy", role: "Dominante", desc: "Cria tensão máxima." },
  { label: "I",  color: "bg-primary/20", border: "border-primary/50", text: "text-navy", role: "Tônica", desc: "Resolve e dá repouso." },
];

type ChordStep = "ii" | "v" | "i";

export default function ProgressoesPage() {
  const [selectedKey, setSelectedKey] = useState(0); // index in ALL_KEYS
  const [activeStep, setActiveStep] = useState<ChordStep>("ii");

  const key = ALL_KEYS[selectedKey];

  // Map chord names to root + type for keyboard display
  const chordMap: Record<ChordStep, { root: number; type: string }> = {
    ii: { root: (key.root + 2) % 12, type: "minor7" },
    v:  { root: (key.root + 7) % 12, type: "dominant7" },
    i:  { root: key.root, type: "major7" },
  };

  const activeChord = chordMap[activeStep];
  const highlighted = getChordNotes(activeChord.root, activeChord.type as keyof typeof import("@/lib/utils").CHORDS);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎶</span>
          <h1 className="text-3xl font-bold text-navy">Progressões (II-V-I)</h1>
        </div>
        <p className="text-navy/60 text-lg">
          A progressão harmônica mais usada no jazz, MPB e música clássica.
        </p>
      </div>

      {/* Teoria */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {THEORY.map((t) => (
          <div key={t.title} className="bg-white rounded-2xl border border-navy/10 p-5">
            <h3 className="font-bold text-navy mb-2">{t.title}</h3>
            <p className="text-navy/60 text-sm leading-relaxed">{t.text}</p>
          </div>
        ))}
      </section>

      {/* Ferramenta interativa */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6 mb-8">
        <h2 className="text-lg font-bold text-navy mb-4">🎹 Explorar II-V-I</h2>

        {/* Seletor de tonalidade */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-2">
            Tonalidade
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_KEYS.map((k, i) => (
              <button
                key={k.label}
                onClick={() => setSelectedKey(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedKey === i
                    ? "bg-primary text-white"
                    : "bg-sand-light text-navy hover:bg-sand"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        {/* Os 3 acordes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["ii", "v", "i"] as ChordStep[]).map((step, idx) => {
            const info = CHORD_STEP_INFO[idx];
            const chordName = key[step];
            const isActive = activeStep === step;
            return (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`rounded-xl border-2 p-4 text-center transition-all ${
                  isActive
                    ? `${info.color} ${info.border} shadow-md scale-105`
                    : "bg-sand-light border-navy/10 hover:border-navy/30"
                }`}
              >
                <div className="text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1">
                  {info.label} grau — {info.role}
                </div>
                <div className="text-2xl font-bold text-navy mb-1">{chordName}</div>
                <div className="text-xs text-navy/50">{info.desc}</div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-navy/40 mb-4 text-center">
          Clique em um acorde para ver as notas no teclado
        </p>

        <PianoKeyboard
          startOctave={4}
          octaves={2}
          highlightedNotes={highlighted}
          rootNote={activeChord.root}
          size="md"
          labelMode="note"
        />
      </section>

      {/* Tabela de todas as tonalidades */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6 mb-8">
        <h2 className="text-lg font-bold text-navy mb-4">📋 II-V-I em todas as tonalidades</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Tom</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">II (Subdominante)</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">V (Dominante)</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">I (Tônica)</th>
              </tr>
            </thead>
            <tbody>
              {ALL_KEYS.map((k, i) => (
                <tr
                  key={k.label}
                  className={`border-b border-navy/5 cursor-pointer transition-colors ${
                    selectedKey === i ? "bg-primary/10" : "hover:bg-sand-light/50"
                  }`}
                  onClick={() => setSelectedKey(i)}
                >
                  <td className="py-2.5 px-3 font-bold text-navy">{k.label} maior</td>
                  <td className="py-2.5 px-3 font-medium text-navy/70">{k.ii}</td>
                  <td className="py-2.5 px-3 font-medium text-navy/70">{k.v}</td>
                  <td className="py-2.5 px-3 font-medium text-navy/70">{k.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Outros padrões */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">🎼 Outras progressões clássicas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "I – IV – V – I", context: "Blues, rock, folk", desc: "A base de incontáveis músicas populares. Simples, poderosa e universalmente reconhecida." },
            { name: "I – V – VI – IV", context: "Pop moderno", desc: "Usada em centenas de hits. Cria sensação de movimento e otimismo." },
            { name: "I – VI – II – V", context: "Jazz, standards", desc: "Ciclo de dominantes secundários. Flui naturalmente e prepara o II-V-I." },
            { name: "IIm7b5 – V7 – Im7", context: "Menor, jazz", desc: "Versão em tom menor. O IIm7b5 (semidiminuto) dá caráter mais tenso e dramático." },
          ].map((prog) => (
            <div key={prog.name} className="bg-sand-light rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-navy font-mono">{prog.name}</span>
                <span className="text-xs bg-white text-navy/60 px-2 py-0.5 rounded-full border border-navy/10">{prog.context}</span>
              </div>
              <p className="text-navy/60 text-sm">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
