"use client";
import { ScaleDisplay } from "@/components/piano/ScaleDisplay";
import { NOTE_NAMES_EN, SCALES } from "@/lib/utils";

const theory = [
  {
    title: "O que é uma escala?",
    text: "Uma escala é uma sequência de notas organizadas em ordem crescente ou decrescente, separadas por intervalos específicos. Esses intervalos definem o caráter da escala — alegre, triste, exótico, etc.",
  },
  {
    title: "Tons e semitons",
    text: "A distância mínima entre duas notas é o semitom (meio tom). Dois semitons formam um tom. A escala maior usa o padrão: T T ST T T T ST (onde T = tom e ST = semitom).",
  },
  {
    title: "Por que estudar escalas?",
    text: "Escalas formam a base de melodias, acordes e harmonias. Saber a escala de uma tonalidade permite improvisar, criar melodias e entender quais acordes 'pertencem' a uma música.",
  },
];

export default function EscalasPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎵</span>
          <h1 className="text-3xl font-bold text-navy">Escalas Musicais</h1>
        </div>
        <p className="text-navy/60 text-lg">
          Explore as escalas mais usadas na música ocidental com visualização interativa.
        </p>
      </div>

      {/* Conteúdo teórico */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {theory.map((t) => (
          <div key={t.title} className="bg-white rounded-2xl border border-navy/10 p-5">
            <h3 className="font-bold text-navy mb-2">{t.title}</h3>
            <p className="text-navy/60 text-sm leading-relaxed">{t.text}</p>
          </div>
        ))}
      </section>

      {/* Ferramenta interativa */}
      <section className="bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-1">🎹 Explorar escalas</h2>
        <p className="text-navy/60 text-sm mb-6">
          Escolha a nota raiz e o tipo de escala para ver as notas destacadas no teclado.
        </p>
        <ScaleDisplay rootNote={0} scaleType="major" labelMode="note" size="md" />
      </section>

      {/* Tabela de escalas */}
      <section className="mt-8 bg-white rounded-2xl border border-navy/10 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">📋 Padrões de intervalos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Escala</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Padrão (T = tom, ST = semitom)</th>
                <th className="text-left py-2 px-3 text-navy/60 font-semibold">Notas (em Dó)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Maior (Jônia)", pattern: "T T ST T T T ST", notes: "C D E F G A B" },
                { name: "Menor Natural (Eólia)", pattern: "T ST T T ST T T", notes: "C D Eb F G Ab Bb" },
                { name: "Menor Harmônica", pattern: "T ST T T ST 1½T ST", notes: "C D Eb F G Ab B" },
                { name: "Pentatônica Maior", pattern: "T T 1½T T 1½T", notes: "C D E G A" },
                { name: "Pentatônica Menor", pattern: "1½T T T 1½T T", notes: "C Eb F G Bb" },
                { name: "Blues", pattern: "1½T T ST ST 1½T T", notes: "C Eb F F# G Bb" },
                { name: "Dórica", pattern: "T ST T T T ST T", notes: "C D Eb F G A Bb" },
                { name: "Frígia", pattern: "ST T T T ST T T", notes: "C Db Eb F G Ab Bb" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-navy/5 hover:bg-sand-light/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-navy">{row.name}</td>
                  <td className="py-2.5 px-3 text-navy/60 font-mono text-xs">{row.pattern}</td>
                  <td className="py-2.5 px-3 text-navy/60">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
