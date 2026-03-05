export function HeroSection() {
  const heroImageSrc = `${import.meta.env.BASE_URL}images/Builders%20SP%20Claude%20Code%20com%20BG.png`;

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">Comunidade de builders em São Paulo</p>
          <h1>Builders SP:<br />Claude Code</h1>
          <p className="hero-lead">
            A maior comunidade para pessoas que constroem projetos, produtos
            e soluções reais usando ferramentas modernas de Inteligência Artificial.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#agenda">
              Ver agenda
            </a>
            <a className="btn btn-ghost" href="#contato">
              QUero ser speaker
            </a>
            <a
              className="btn btn-primary"
              href="https://chat.whatsapp.com/EfVfBSX78VP15KtSkNMbgm?mode=gi_t"
              target="_blank"
              rel="noreferrer"
            >
              Entrar no grupo de Whatsapp
            </a>
          </div>
        </div>

        <aside className="hero-brand-card reveal" aria-label="Imagem destaque do evento">
          <img
            className="hero-brand-image"
            src={heroImageSrc}
            alt="Arte do Builders SP para a identidade visual do evento"
          />
        </aside>
      </div>
    </section>
  );
}
