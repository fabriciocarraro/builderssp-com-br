import { type SectionHeaderProps } from "../types/content";

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="section-heading reveal">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  );
}

