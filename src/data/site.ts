import { type NavItem, type SpeakerCta } from "../types/content";

export const navItems: NavItem[] = [
  { id: "sobre", label: "Sobre" },
  { id: "agenda", label: "Agenda" },
  { id: "fotos", label: "Fotos" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" },
];

export const speakerCta: SpeakerCta = {
  label: "Quero ser speaker",
  href: "https://docs.google.com/forms/d/e/1FAIpQLSfnpA6hHkvX7Zyq3rOUekiTwFt58rVDViUDvqWZlx_kNu_uDA/viewform?usp=publish-editor",
  external: true,
};

export const communityEmail = "contato@claudecodesp.com.br";
