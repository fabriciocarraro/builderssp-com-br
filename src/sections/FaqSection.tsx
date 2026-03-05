import type { CSSProperties } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { faqItems } from "../data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="FAQ"
          title="Perguntas frequentes"
          description="Dúvidas comuns sobre inscrição, formato e participação nos encontros da comunidade Builders SP."
        />
        <div className="faq-grid">
          {faqItems.map((item, index) => (
            <article
              key={item.id}
              className="faq-card reveal"
              style={{ "--delay": `${120 + index * 70}ms` } as CSSProperties}
            >
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
