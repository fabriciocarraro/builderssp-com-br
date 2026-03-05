import { type EventCardProps } from "../types/content";

function formatDate(dateISO: string): string {
  const date = new Date(`${dateISO}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function EventCard({ event }: EventCardProps) {
  const hasCta = Boolean(event.ctaLabel && event.ctaHref);
  const isExternalLink = hasCta ? event.ctaHref!.startsWith("http") : false;
  const dateLabel = event.dateText ?? formatDate(event.dateISO);

  return (
    <article className="event-card reveal">
      <div className="event-head">
        <p className="event-date">{dateLabel}</p>
        <span className="status-chip">{event.status}</span>
      </div>
      <h3>{event.title}</h3>
      <p className="event-description">{event.description}</p>
      <dl className="event-meta">
        <div>
          <dt>Horário</dt>
          <dd>{event.time}</dd>
        </div>
        <div>
          <dt>Local</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>Palestrante</dt>
          <dd>{event.speaker}</dd>
        </div>
      </dl>
      {hasCta ? (
        <a
          className="event-link"
          href={event.ctaHref}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noreferrer" : undefined}
        >
          {event.ctaLabel}
        </a>
      ) : null}
    </article>
  );
}
