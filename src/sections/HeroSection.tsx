export function HeroSection() {
  const heroImageSrc = `${import.meta.env.BASE_URL}images/Claude%20Code.png`;

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">Comunidade de builders em São Paulo</p>
          <h1>Claude Code SP</h1>
          <p className="hero-lead">
            O maior evento para pessoas que constroem projetos, protótipos e
            soluções reais usando Claude Code da Anthropic.
          </p>
          <p>
            Encontros práticos para experimentar, trocar arquitetura, testar
            ideias e acelerar a entrega de produtos.
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
            alt="Arte do Claude Code para a identidade visual do evento"
          />
        </aside>
      </div>
    </section>
  );
}
