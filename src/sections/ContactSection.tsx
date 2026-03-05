import { SectionHeader } from "../components/SectionHeader";
import { speakerCta } from "../data/site";

export function ContactSection() {
  return (
    <section id="contato" className="section section-contact">
      <div className="shell">
        <SectionHeader
          eyebrow="Contato"
          title="Quer palestrar no Builders SP: Claude Code?"
          description="Envie sua proposta no formulário oficial e a organização entra em contato."
        />
        <div className="contact-action reveal">
          <a
            className="btn btn-primary"
            href={speakerCta.href}
            target={speakerCta.external ? "_blank" : undefined}
            rel={speakerCta.external ? "noreferrer" : undefined}
          >
            {speakerCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
