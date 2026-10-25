import {
  BellRing,
  CalendarCheck2,
  ChevronRight,
  Clock3,
  Compass,
  MapPin,
  Sparkles,
  Users,
  Check
} from 'lucide-react'
import type { Announcement, Club, Deadline, EventItem, FoundItem, Location } from '../types'

export function SectionHeading({
  title,
  subtitle,
  action,
  onAction
}: {
  title: string
  subtitle?: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && (
        <button className="heading-action" onClick={onAction}>
          <span>{action}</span>
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  )
}

export function EventCard({
  item,
  compact = false,
  featured = false,
  saved,
  registered,
  onOpen,
  onSave,
  onRegister
}: {
  item: EventItem
  compact?: boolean
  featured?: boolean
  saved?: boolean
  registered?: boolean
  onOpen: () => void
  onSave?: () => void
  onRegister?: () => void
}) {
  const when = `${new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(
    new Date(`${item.date}T12:00:00`)
  )} · ${item.time}`

  return (
    <article
      className={`event-card ${compact ? 'compact' : ''} ${featured ? 'featured' : ''} ${
        registered ? 'is-registered' : ''
      }`}
    >
      <button
        className={`event-visual ${item.accent}`}
        onClick={onOpen}
        aria-label={`Open event details for ${item.title}`}
      >
        <div className="visual-top">
          <span className="category-pill">{item.category}</span>
          {item.featuredBadge && <span className="featured-badge">★ {item.featuredBadge}</span>}
        </div>
        <span className="visual-emoji" aria-hidden="true">
          {item.visual}
        </span>
        <div className="visual-bottom">
          <span className="spots-pill">{item.spots}</span>
        </div>
      </button>

      <div className="event-content">
        <div className="event-date">
          <CalendarCheck2 size={13} />
          <span>{when}</span>
        </div>

        <h3 onClick={onOpen} className="event-title">
          {item.title}
        </h3>

        {!compact && <p className="event-desc">{item.description}</p>}

        <div className="event-meta">
          <span className="meta-item">
            <MapPin size={13} />
            {item.location}
          </span>
          <span className="meta-item organizer">By {item.organizer}</span>
        </div>

        {item.tags && item.tags.length > 0 && !compact && (
          <div className="event-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions">
          {onRegister && (
            <button
              className={`button-register ${registered ? 'registered' : 'primary'}`}
              onClick={(e) => {
                e.stopPropagation()
                onRegister()
              }}
            >
              {registered ? (
                <>
                  <Check size={14} /> you're in
                </>
              ) : (
                <>
                  <Sparkles size={13} /> i'm in
                </>
              )}
            </button>
          )}

          {onSave && (
            <button
              className={`icon-button ${saved ? 'saved' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                onSave()
              }}
              title={saved ? 'Saved in your events' : 'Save event for later'}
              aria-label="Save event"
            >
              <BellRing size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function AnnouncementCard({ item, onOpen }: { item: Announcement; onOpen: () => void }) {
  const isHigh = item.priority === 'High'
  return (
    <article
      className={`announcement-card ${isHigh ? 'high-priority' : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && onOpen()}
    >
      <div className="announcement-header">
        <div className="announcement-meta">
          <span className={`priority-tag ${item.priority.toLowerCase()}`}>
            {item.priority === 'High' ? '⚡ Urgent' : item.category}
          </span>
          {item.author && <span className="author-tag">{item.author}</span>}
        </div>
        <time className="publish-time">{item.published}</time>
      </div>

      <h3 className="announcement-title">{item.title}</h3>
      <p className="announcement-body">{item.body}</p>
    </article>
  )
}

export function DeadlineCard({
  item,
  reminded,
  onToggle
}: {
  item: Deadline
  reminded?: boolean
  onToggle: () => void
}) {
  return (
    <article className={`deadline-card ${item.urgency.toLowerCase()}`}>
      <div className={`deadline-icon-wrapper ${item.urgency.toLowerCase()}`}>
        <Clock3 size={15} />
      </div>

      <div className="deadline-body">
        <div className="deadline-topline">
          {item.courseCode && <span className="course-chip">{item.courseCode}</span>}
          <span className={`urgency-badge ${item.urgency.toLowerCase()}`}>{item.urgency}</span>
        </div>
        <h3 className="deadline-title">{item.title}</h3>
        <p className="deadline-label">{item.dueLabel}</p>
      </div>

      <button
        className={`reminder-button ${reminded ? 'reminded' : ''}`}
        onClick={onToggle}
        aria-label="Toggle deadline reminder"
      >
        {reminded ? (
          <>
            <Check size={12} /> saved
          </>
        ) : (
          'remind me'
        )}
      </button>
    </article>
  )
}

export function FindCard({ item, onOpen }: { item: FoundItem; onOpen: () => void }) {
  const isLost = item.kind === 'Lost'
  return (
    <article
      className={`find-card ${isLost ? 'lost-item' : 'found-item'}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && onOpen()}
    >
      <div className={`find-visual ${isLost ? 'lost' : 'found'}`}>
        <span className="find-symbol">{item.visual}</span>
      </div>

      <div className="find-details">
        <div className="find-status-row">
          <span className={`status-pill ${isLost ? 'lost' : 'found'}`}>
            {isLost ? '● LOST' : '✓ FOUND'}
          </span>
          <time className="find-time">{item.date}</time>
        </div>

        <h3 className="find-name">{item.name}</h3>

        <div className="find-location">
          <MapPin size={12} />
          <span>{item.location}</span>
        </div>

        {item.contact && <div className="find-contact">{item.contact}</div>}
      </div>
    </article>
  )
}

export function LocationCard({ item, onOpen }: { item: Location; onOpen: () => void }) {
  return (
    <article
      className="location-card"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && onOpen()}
    >
      <div className="location-icon-block">
        <span className="location-icon">{item.icon}</span>
      </div>

      <div className="location-info">
        <div className="location-header-row">
          <span className="type-pill">{item.type}</span>
          {item.status && <span className="status-indicator">{item.status}</span>}
        </div>

        <h3 className="location-name">{item.name}</h3>
        <p className="location-spot">
          {item.building} · {item.floor}
        </p>

        {item.amenities && item.amenities.length > 0 && (
          <div className="amenities-row">
            {item.amenities.slice(0, 2).map((amenity) => (
              <span key={amenity} className="amenity-chip">
                {amenity}
              </span>
            ))}
            {item.amenities.length > 2 && (
              <span className="amenity-more">+{item.amenities.length - 2}</span>
            )}
          </div>
        )}
      </div>

      <div className="location-arrow">
        <Compass size={17} />
      </div>
    </article>
  )
}

export function ClubCard({
  item,
  joined,
  onJoin,
  onOpen
}: {
  item: Club
  joined?: boolean
  onJoin: () => void
  onOpen: () => void
}) {
  return (
    <article className="club-card">
      <button
        className={`club-mark ${item.color}`}
        onClick={onOpen}
        aria-label={`View ${item.name} club profile`}
      >
        <span>{item.mark}</span>
      </button>

      <div className="club-copy">
        <div className="club-topline">
          <span className="category-pill">{item.category}</span>
          {item.vibe && <span className="vibe-tag">“{item.vibe}”</span>}
        </div>

        <h3 className="club-name" onClick={onOpen}>
          {item.name}
        </h3>
        <p className="club-desc">{item.description}</p>

        <div className="club-meta-strip">
          <span className="club-stat">
            <Users size={12} /> {item.members} members
          </span>
          <span className="club-meeting-time">✦ {item.meeting}</span>
        </div>

        {item.tags && (
          <div className="club-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        className={`button-join ${joined ? 'joined' : 'primary'}`}
        onClick={(e) => {
          e.stopPropagation()
          onJoin()
        }}
      >
        {joined ? (
          <>
            <Check size={14} /> joined
          </>
        ) : (
          '+ join'
        )}
      </button>
    </article>
  )
}

export function ClubPeek({ item, onOpen }: { item: Club; onOpen: () => void }) {
  return (
    <button className="club-peek" onClick={onOpen}>
      <span className={`club-mark mini ${item.color}`}>{item.mark}</span>
      <div className="club-peek-text">
        <strong>{item.name}</strong>
        <span>{item.category}</span>
      </div>
      <span className="club-peek-count">{item.members} members</span>
    </button>
  )
}
