import type { CSSProperties } from "react";
import { SectionHeader } from "../components/SectionHeader";

const pillars = [
  {
    title: "Para quem é",
    description:
      "Builders, devs, PMs, founders e pessoas curiosas em criar com Claude Code no mundo real.",
  },
  {
    title: "Como funciona",
    description:
      "Agenda com talks curtas, demos práticas e networking orientado à colaboração e projetos.",
  },
  {
    title: "O que você ganha",
    description:
      "Aprendizado aplicado, feedback de pares e conexões para tirar ideias do papel com mais velocidade.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Sobre"
          title="Um ponto de encontro para construir com qualidade"
          description="Claude Code SP organiza encontros recorrentes para quem quer transformar experimentação em produtos e protótipos consistentes."
        />
        <div className="feature-grid">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="feature-card reveal"
              style={{ "--delay": `${120 + index * 120}ms` } as CSSProperties}
            >
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
