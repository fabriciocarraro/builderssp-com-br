export type SectionId =
  | "sobre"
  | "agenda"
  | "fotos"
  | "faq"
  | "contato";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface EventItem {
  id: string;
  title: string;
  dateISO: string;
  dateText?: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  status: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SpeakerCta {
  label: string;
  href: string;
  external: boolean;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface EventCardProps {
  event: EventItem;
}

export interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  onNavigate: (sectionId: SectionId) => void;
}
