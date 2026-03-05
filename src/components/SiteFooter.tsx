import { communityEmail } from "../data/site";
import { type NavItem } from "../types/content";

interface SiteFooterProps {
  items: NavItem[];
}

export function SiteFooter({ items }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const aluraLogoSrc = `${import.meta.env.BASE_URL}images/alura-logo.svg`;

  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div>
          <p className="footer-title">Claude Code SP</p>
          <p>
            Comunidade de builders em São Paulo para projetos, protótipos e
            soluções com Claude Code.
          </p>
          <div className="footer-offering" aria-label="Oferecimento">
            <span className="footer-offering-label">Oferecimento:</span>
            <img className="alura-logo-image" src={aluraLogoSrc} alt="Logo Alura" />
          </div>
        </div>
        <div>
          <p className="footer-title">Navegação</p>
          <ul className="footer-links">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Contato</p>
          <a href={`mailto:${communityEmail}`}>{communityEmail}</a>
          <p>São Paulo, Brasil</p>
        </div>
      </div>
      <p className="footer-legal">
        © {year} Claude Code SP. Todos os direitos reservados.
      </p>
    </footer>
  );
}
