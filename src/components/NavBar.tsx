import { useEffect, useState } from "react";
import { type NavItem, type SectionId } from "../types/content";

interface NavBarProps {
  items: NavItem[];
  activeSection: SectionId;
}

export function NavBar({ items, activeSection }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerLogoSrc = `${import.meta.env.BASE_URL}images/Builders%20SP%20Claude%20Code%20Logo.png`;

  useEffect(() => {
    setIsOpen(false);
  }, [activeSection]);

  return (
    <header className="site-header">
      <div className="shell header-shell">
        <a className="brand" href="#top" aria-label="Voltar para o topo">
          <img className="brand-logo" src={headerLogoSrc} alt="Logo Builders SP: Claude Code" />
          <span className="brand-text">
            <strong>Builders SP: Claude Code</strong>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="site-navigation"
          className={`site-nav ${isOpen ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${item.id === activeSection ? "is-active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
