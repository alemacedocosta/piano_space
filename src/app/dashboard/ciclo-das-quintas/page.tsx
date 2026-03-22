"use client";
import { useState } from "react";
import { CIRCLE_OF_FIFTHS, NOTE_NAMES_EN } from "@/lib/utils";

// Tons maiores no ciclo (12 posições)
const MAJOR_KEYS = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
const MINOR_KEYS = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "Eb m", "Bbm", "Fm", "Cm", "Gm", "Dm"];
const SHARPS_FLATS = ["0 ♮", "1 #", "2 #", "3 #", "4 #", "5 #", "6 #/6 b", "5 b", "4 b", "3 b", "2 b", "1 b"];

const THEORY = [
  {
    title: "O que é o ciclo das quintas?",
    text: "É um diagrama circular que organiza as 12 tonalidades musicais pela proximidade harmônica. Cada tonalidade está separada da seguinte por um intervalo de quinta justa (7 semitons).",
  },
  {
    title: "Tons relativos",
    text: "Cada tom maior tem um tom menor relativo que usa as mesmas notas (mesma armadura). Por exemplo, Dó maior e Lá menor compartilham todas as notas — apenas o centro tonal muda.",
  },
  {
    title: "Armaduras de clave",
    text: "À medida que você avança no sentido horário, adiciona-se um sustenido (#). No sentido anti-horário, adiciona-se um bemol (b). Isso ajuda a identificar a tonalidade de uma música na partitura.",
  },
];

export default function CicloDasQuintasPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const radius = 140;
  const innerRadius = 95;
  const cx = 200;
  const cy = 200;

  function getPosition(index: number, r: number) {
    const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">⭕</span>
          <h1 className="text-3xl font-bold text-navy">Ciclo das Quintas</h1>
        </div>
        <p className="text-navy/60 text-lg">
          Entenda as relações entre tonalidades e armaduras de clave.
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

      {/* Diagrama + info */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-6">🔵 Diagrama interativo</h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* SVG do ciclo */}
          <div className="flex-shrink-0">
            <svg width="400" height="400" viewBox="0 0 400 400">
              {/* Anel externo — tons maiores */}
              {MAJOR_KEYS.map((key, i) => {
                const pos = getPosition(i, radius);
                const isSelected = selected === i;
                return (
                  <g key={key} onClick={() => setSelected(i === selected ? null : i)} className="cursor-pointer">
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={26}
                      fill={isSelected ? "#75B390" : "#F0DDAA"}
                      stroke={isSelected ? "#75B390" : "#152B3C20"}
                      strokeWidth={2}
                      className="transition-all"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "white" : "#152B3C"}
                      fontSize={key.includes("/") ? "8" : "11"}
                      fontWeight="700"
                    >
                      {key}
                    </text>
                  </g>
                );
              })}

              {/* Anel interno — tons menores */}
              {MINOR_KEYS.map((key, i) => {
                const pos = getPosition(i, innerRadius);
                const isSelected = selected === i;
                return (
                  <g key={key} onClick={() => setSelected(i === selected ? null : i)} className="cursor-pointer">
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={20}
                      fill={isSelected ? "#152B3C" : "#152B3C10"}
                      stroke={isSelected ? "#152B3C" : "#152B3C20"}
                      strokeWidth={1.5}
                      className="transition-all"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "white" : "#152B3C90"}
                      fontSize="8"
                      fontWeight="600"
                    >
                      {key}
                    </text>
                  </g>
                );
              })}

              {/* Centro */}
              <circle cx={cx} cy={cy} r={45} fill="#F0DDAA40" stroke="#152B3C15" strokeWidth={1} />
              <text x={cx} y={cy - 6} textAnchor="middle" fill="#152B3C70" fontSize="9" fontWeight="600">CICLO</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fill="#152B3C70" fontSize="9">DAS</text>
              <text x={cx} y={cy + 20} textAnchor="middle" fill="#152B3C70" fontSize="9">QUINTAS</text>
            </svg>
          </div>

          {/* Painel de info */}
          <div className="flex-1">
            {selected !== null ? (
              <div className="bg-sand-light rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{MAJOR_KEYS[selected].replace("/", "")}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-xl">Tom de {MAJOR_KEYS[selected]}</h3>
                    <p className="text-navy/60 text-sm">Relativo menor: {MINOR_KEYS[selected]}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-navy/50 font-semibold uppercase tracking-wide mb-1">Armadura</p>
                    <p className="text-navy font-bold">{SHARPS_FLATS[selected]}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-navy/50 font-semibold uppercase tracking-wide mb-1">Posição</p>
                    <p className="text-navy font-bold">{selected + 1}ª posição</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-navy/40 py-8">
                <p className="text-4xl mb-3">☝️</p>
                <p className="font-medium">Clique em uma tonalidade no diagrama para ver os detalhes</p>
              </div>
            )}

            {/* Legenda */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-sand border border-navy/20"></div>
                <span className="text-sm text-navy/60">Tom maior (anel externo)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-navy/10 border border-navy/20"></div>
                <span className="text-sm text-navy/60">Tom menor relativo (anel interno)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section className="mt-8 bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">📋 Todas as tonalidades</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Tom maior</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Tom menor relativo</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Armadura de clave</th>
              </tr>
            </thead>
            <tbody>
              {MAJOR_KEYS.map((key, i) => (
                <tr key={key} className="border-b border-navy/5 hover:bg-sand-light/50 transition-colors">
                  <td className="py-2 px-3 font-bold text-navy">{key}</td>
                  <td className="py-2 px-3 text-navy/70">{MINOR_KEYS[i]}</td>
                  <td className="py-2 px-3 text-navy/60">{SHARPS_FLATS[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
