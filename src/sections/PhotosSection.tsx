import { SectionHeader } from "../components/SectionHeader";

export function PhotosSection() {
  return (
    <section id="fotos" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Fotos"
          title="Galeria em breve"
          description="Os primeiros encontros do Claude Code SP ainda vão acontecer. Depois de cada edição, esta área vai receber os registros da comunidade."
        />
        <div className="photo-placeholder reveal">
          <p>Nenhuma foto publicada ainda.</p>
          <p>
            Participe dos próximos eventos para aparecer nos highlights da
            comunidade.
          </p>
        </div>
      </div>
    </section>
  );
}
