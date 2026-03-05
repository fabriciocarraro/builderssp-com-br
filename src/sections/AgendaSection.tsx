import type { CSSProperties } from "react";
import { EventCard } from "../components/EventCard";
import { SectionHeader } from "../components/SectionHeader";
import { type EventItem } from "../types/content";

interface AgendaSectionProps {
  events: EventItem[];
}

export function AgendaSection({ events }: AgendaSectionProps) {
  return (
    <section id="agenda" className="section section-sand">
      <div className="shell">
        <SectionHeader
          eyebrow="Agenda"
          title="Próximos encontros"
          description="A agenda é atualizada com novas edições ao longo do ano. Comece pelos eventos com inscrições abertas."
        />
        {events.length > 0 ? (
          <div className="agenda-grid">
            {events.map((event, index) => (
              <div
                key={event.id}
                style={{ "--delay": `${120 + index * 80}ms` } as CSSProperties}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state reveal">
            Nenhum evento publicado ainda. Volte em breve para ver a agenda
            atualizada.
          </p>
        )}
      </div>
    </section>
  );
}
