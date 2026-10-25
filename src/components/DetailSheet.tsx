import {
  CalendarDays,
  Check,
  Clock,
  Compass,
  MapPin,
  Share2,
  Sparkles,
  Users,
  X
} from 'lucide-react'
import { useState } from 'react'
import type { Announcement, Club, EventItem, FoundItem, Location } from '../types'

type Detail = EventItem | Announcement | FoundItem | Location | Club

export function DetailSheet({
  detail,
  onClose,
  onAction
}: {
  detail: Detail | null
  onClose: () => void
  onAction?: (type: string, id: string) => void
}) {
  const [actionDone, setActionDone] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!detail) return null

  const isEvent = 'spots' in detail
  const isFound = 'kind' in detail
  const isLocation = 'hours' in detail
  const isClub = 'members' in detail
  const isAnnouncement = 'priority' in detail

  const title = 'title' in detail ? detail.title : detail.name
  const description = 'description' in detail ? detail.description : detail.body

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - CampusConnect`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrimaryAction = () => {
    setActionDone(true)
    if (onAction) {
      onAction(detail.id, detail.id)
    }
  }

  return (
    <div className="sheet-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <aside className="detail-sheet" onMouseDown={(e) => e.stopPropagation()}>
        <div className="sheet-top-controls">
          <button
            className="sheet-icon-btn"
            onClick={handleShare}
            aria-label="Share item"
            title="Copy link"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
          </button>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close sheet">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-hero-badge">
          {'visual' in detail ? (
            <span className="sheet-symbol">{detail.visual}</span>
          ) : 'icon' in detail ? (
            <span className="sheet-symbol">{detail.icon}</span>
          ) : 'mark' in detail ? (
            <span className="sheet-symbol">{detail.mark}</span>
          ) : (
            <span className="sheet-symbol">📢</span>
          )}
        </div>

        <div className="sheet-header">
          <div className="sheet-tags-row">
            {'category' in detail && <span className="sheet-pill category">{detail.category}</span>}
            {'type' in detail && <span className="sheet-pill type">{detail.type}</span>}
            {isAnnouncement && (
              <span className={`sheet-pill priority ${detail.priority.toLowerCase()}`}>
                {detail.priority} Priority
              </span>
            )}
            {isFound && (
              <span className={`sheet-pill status ${detail.kind.toLowerCase()}`}>
                {detail.kind === 'Lost' ? 'Reported Lost' : 'Found Item'}
              </span>
            )}
            {isLocation && detail.status && (
              <span className="sheet-pill open-status">{detail.status}</span>
            )}
          </div>

          <h2 className="sheet-title">{title}</h2>
          <p className="sheet-desc">{description}</p>
        </div>

        <div className="sheet-meta-grid">
          {isEvent && (
            <>
              <div className="meta-box">
                <CalendarDays size={16} className="meta-box-icon" />
                <div>
                  <strong>Date & Time</strong>
                  <span>
                    {detail.date} · {detail.time}
                  </span>
                </div>
              </div>

              <div className="meta-box">
                <MapPin size={16} className="meta-box-icon" />
                <div>
                  <strong>Location</strong>
                  <span>{detail.location}</span>
                </div>
              </div>

              <div className="meta-box">
                <Sparkles size={16} className="meta-box-icon" />
                <div>
                  <strong>Organizer & Spots</strong>
                  <span>
                    {detail.organizer} · {detail.spots}
                  </span>
                </div>
              </div>
            </>
          )}

          {isLocation && (
            <>
              <div className="meta-box">
                <MapPin size={16} className="meta-box-icon" />
                <div>
                  <strong>Building & Floor</strong>
                  <span>
                    {detail.building} · {detail.floor}
                  </span>
                </div>
              </div>

              <div className="meta-box">
                <Clock size={16} className="meta-box-icon" />
                <div>
                  <strong>Opening Hours</strong>
                  <span>{detail.hours}</span>
                </div>
              </div>

              <div className="meta-box full-width">
                <Compass size={16} className="meta-box-icon" />
                <div>
                  <strong>Directions from Main Quad</strong>
                  <p className="direction-text">{detail.direction}</p>
                </div>
              </div>

              {detail.amenities && (
                <div className="sheet-amenities-wrap">
                  <strong>Available Amenities</strong>
                  <div className="amenities-tags">
                    {detail.amenities.map((a) => (
                      <span key={a} className="amenity-chip">
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {isClub && (
            <>
              <div className="meta-box">
                <CalendarDays size={16} className="meta-box-icon" />
                <div>
                  <strong>Weekly Meetups</strong>
                  <span>{detail.meeting}</span>
                </div>
              </div>

              <div className="meta-box">
                <Users size={16} className="meta-box-icon" />
                <div>
                  <strong>Community Size</strong>
                  <span>{detail.members} active students</span>
                </div>
              </div>

              <div className="meta-box full-width">
                <Sparkles size={16} className="meta-box-icon" />
                <div>
                  <strong>Current Project / Activity</strong>
                  <span>{detail.activity}</span>
                </div>
              </div>
            </>
          )}

          {isFound && (
            <>
              <div className="meta-box">
                <MapPin size={16} className="meta-box-icon" />
                <div>
                  <strong>Reported Location</strong>
                  <span>{detail.location}</span>
                </div>
              </div>

              <div className="meta-box">
                <Clock size={16} className="meta-box-icon" />
                <div>
                  <strong>Date & Time</strong>
                  <span>{detail.date}</span>
                </div>
              </div>

              <div className="meta-box full-width">
                <Users size={16} className="meta-box-icon" />
                <div>
                  <strong>Contact & Claim Desk</strong>
                  <span>{detail.contact}</span>
                </div>
              </div>
            </>
          )}

          {isAnnouncement && (
            <div className="meta-box full-width">
              <Clock size={16} className="meta-box-icon" />
              <div>
                <strong>Published</strong>
                <span>
                  {detail.published} {detail.author ? `by ${detail.author}` : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="sheet-bottom-actions">
          {isEvent && (
            <button
              className={`button-sheet-action ${actionDone ? 'completed' : 'primary'}`}
              onClick={handlePrimaryAction}
            >
              {actionDone ? (
                <>
                  <Check size={16} /> registered for event!
                </>
              ) : (
                'RSVP / Register for Event'
              )}
            </button>
          )}

          {isClub && (
            <button
              className={`button-sheet-action ${actionDone ? 'completed' : 'primary'}`}
              onClick={handlePrimaryAction}
            >
              {actionDone ? (
                <>
                  <Check size={16} /> joined community!
                </>
              ) : (
                'Join this Club'
              )}
            </button>
          )}

          {isFound && (
            <button
              className="button-sheet-action primary"
              onClick={() => {
                alert(`Please visit ${detail.contact} with proof of identity to claim this item.`)
              }}
            >
              How to Claim / Coordinate
            </button>
          )}

          {isLocation && (
            <button className="button-sheet-action primary" onClick={onClose}>
              Done looking
            </button>
          )}

          {isAnnouncement && (
            <button className="button-sheet-action primary" onClick={onClose}>
              Understood
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}
