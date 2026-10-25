import {
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  Filter,
  MapPin,
  MessageSquareHeart,
  Plus,
  Search,
  Sparkles,
  Users2,
  X
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { announcements, clubs, deadlines, events, foundItems, locations } from '../data'
import type { Announcement, Club, EventItem, FoundItem, Location, View } from '../types'
import {
  AnnouncementCard,
  ClubCard,
  ClubPeek,
  DeadlineCard,
  EventCard,
  FindCard,
  LocationCard,
  SectionHeading
} from './Cards'

type Detail = EventItem | Announcement | FoundItem | Location | Club

type CoreProps = {
  onNavigate: (view: View) => void
  onDetail: (item: Detail) => void
  savedEvents: Set<string>
  toggleSaved: (id: string) => void
  registeredEvents: Set<string>
  toggleRegistration: (id: string) => void
  joinedClubs: Set<string>
  toggleJoin: (id: string) => void
  reminders: Set<string>
  toggleReminder: (id: string) => void
}

export function HomePage(props: CoreProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date())

  const featured = events[0]
  const upcomingEvents = events.slice(1, 4)

  const quickActions = [
    { icon: CalendarDays, label: 'Explore Events', view: 'events' as View, tone: 'peach', badge: '7 happening' },
    { icon: Search, label: 'Lost & Found', view: 'finds' as View, tone: 'sage', badge: '5 items' },
    { icon: Compass, label: 'Campus Map', view: 'campus' as View, tone: 'lavender', badge: 'Interactive' },
    { icon: Users2, label: 'Communities', view: 'clubs' as View, tone: 'blush', badge: '6 clubs' }
  ]

  return (
    <div className="page home-page">
      {/* 1. Hero Welcome Greeting */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="today-badge">
            <span className="sparkle-icon">✨</span>
            <span>{dateLabel}</span>
          </div>
          <h2 className="welcome-heading">
            {greeting}, campus <em>✦</em>
          </h2>
          <p className="welcome-subtext">
            Here's what is happening across your campus today. From upcoming hackathons to quiet
            library pods, everything is within reach.
          </p>

          <div className="welcome-stats-row">
            <div className="stat-chip">
              <span className="chip-dot-green" />
              <span>
                <strong>7</strong> events this week
              </span>
            </div>
            <div className="stat-chip">
              <span className="chip-dot-orange" />
              <span>
                <strong>2</strong> deadlines due soon
              </span>
            </div>
            <div className="stat-chip">
              <span className="chip-dot-purple" />
              <span>
                <strong>5</strong> lost items logged
              </span>
            </div>
          </div>
        </div>

        <div className="banner-decorations" aria-hidden="true">
          <div className="decor-blob blob-peach" />
          <div className="decor-blob blob-lavender" />
          <span className="floating-sparkle s1">✦</span>
          <span className="floating-sparkle s2">★</span>
          <span className="floating-sparkle s3">·</span>
        </div>
      </section>

      {/* 2. Quick Actions Grid */}
      <section className="quick-actions-section">
        <div className="quick-actions-grid">
          {quickActions.map(({ icon: Icon, label, view, tone, badge }) => (
            <button
              onClick={() => props.onNavigate(view)}
              key={label}
              className={`quick-tile ${tone}`}
            >
              <div className="tile-top">
                <span className="tile-icon-box">
                  <Icon size={19} strokeWidth={2} />
                </span>
                <span className="tile-badge">{badge}</span>
              </div>
              <span className="tile-label">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Today's Campus Board (Featured Spotlight + Urgent Side Stack) */}
      <section className="today-board-section">
        <div className="featured-column">
          <SectionHeading
            title="Featured Highlight"
            subtitle="Don't miss the biggest gathering this week"
            action="All events"
            onAction={() => props.onNavigate('events')}
          />
          <EventCard
            item={featured}
            featured
            saved={props.savedEvents.has(featured.id)}
            registered={props.registeredEvents.has(featured.id)}
            onOpen={() => props.onDetail(featured)}
            onSave={() => props.toggleSaved(featured.id)}
            onRegister={() => props.toggleRegistration(featured.id)}
          />
        </div>

        <aside className="side-column">
          <div className="cozy-panel notices-panel">
            <SectionHeading
              title="Urgent Notices"
              action="All updates"
              onAction={() => props.onNavigate('updates')}
            />
            <div className="announcements-stack">
              {announcements.slice(0, 2).map((item) => (
                <AnnouncementCard item={item} onOpen={() => props.onDetail(item)} key={item.id} />
              ))}
            </div>
          </div>

          <div className="cozy-panel deadlines-panel">
            <SectionHeading
              title="Due Soon"
              action="Deadlines"
              onAction={() => props.onNavigate('updates')}
            />
            <div className="deadlines-stack">
              {deadlines.slice(0, 2).map((item) => (
                <DeadlineCard
                  item={item}
                  key={item.id}
                  reminded={props.reminders.has(item.id)}
                  onToggle={() => props.toggleReminder(item.id)}
                />
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* 4. Upcoming Events + Buddy Interactive Prompt Split */}
      <section className="events-split-section">
        <div className="events-column">
          <SectionHeading
            title="Coming Up Next"
            subtitle="Workshops & meetups happening this week"
            action="View schedule"
            onAction={() => props.onNavigate('events')}
          />
          <div className="events-compact-grid">
            {upcomingEvents.map((item) => (
              <EventCard
                item={item}
                key={item.id}
                compact
                saved={props.savedEvents.has(item.id)}
                registered={props.registeredEvents.has(item.id)}
                onOpen={() => props.onDetail(item)}
                onSave={() => props.toggleSaved(item.id)}
                onRegister={() => props.toggleRegistration(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="buddy-column">
          <button
            className="buddy-banner-card"
            onClick={() => props.onNavigate('assistant')}
            aria-label="Ask Campus Assistant"
          >
            <div className="buddy-orb-badge">
              <Sparkles size={22} />
            </div>
            <span className="buddy-eyebrow">Your Campus Companion</span>
            <h3>Need help finding anything?</h3>
            <p>
              Ask where the robotics lab is, check when the library closes, or search for a lost
              water bottle.
            </p>
            <div className="buddy-cta-button">
              <span>Ask Campus Buddy</span>
              <ArrowRight size={15} />
            </div>
          </button>
        </div>
      </section>

      {/* 5. Communities / Clubs Peek */}
      <section className="clubs-peek-section">
        <SectionHeading
          title="Student Communities"
          subtitle="Find people who share your creative or technical curiosity"
          action="Explore all clubs"
          onAction={() => props.onNavigate('clubs')}
        />
        <div className="clubs-peek-grid">
          {clubs.slice(0, 4).map((item) => (
            <ClubPeek item={item} key={item.id} onOpen={() => props.onDetail(item)} />
          ))}
        </div>
      </section>

      {/* 6. Recently Spotted in Lost & Found */}
      <section className="finds-preview-section">
        <SectionHeading
          title="Recently Spotted & Lost"
          subtitle="Latest items turned in to campus desks"
          action="Lost & Found board"
          onAction={() => props.onNavigate('finds')}
        />
        <div className="finds-preview-grid">
          {foundItems.slice(0, 3).map((item) => (
            <FindCard item={item} key={item.id} onOpen={() => props.onDetail(item)} />
          ))}
        </div>
      </section>
    </div>
  )
}

export function EventsPage(props: CoreProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return events.filter((item) => {
      const matchesCat = category === 'All' || item.category === category
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.organizer.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      return matchesCat && matchesSearch
    })
  }, [category, search])

  return (
    <div className="page events-page">
      <section className="page-header-box">
        <div>
          <span className="header-eyebrow">
            <Sparkles size={13} /> This Week's Gatherings
          </span>
          <h2>Make your week a little more fun 🎨</h2>
          <p>
            Workshops, hackathons, acoustic sessions, and community sports worth showing up for.
          </p>
        </div>
        <div className="header-stat-badge">
          <strong>{events.length}</strong>
          <span>Events this month</span>
        </div>
      </section>

      <FilterBar
        search={search}
        setSearch={setSearch}
        categories={['All', 'Tech', 'Culture', 'Career', 'Sports', 'Community']}
        active={category}
        setActive={setCategory}
        placeholder="Search events, workshops, organizers..."
        resultCount={filtered.length}
      />

      <div className="event-grid">
        {filtered.map((item) => (
          <EventCard
            item={item}
            key={item.id}
            saved={props.savedEvents.has(item.id)}
            registered={props.registeredEvents.has(item.id)}
            onOpen={() => props.onDetail(item)}
            onSave={() => props.toggleSaved(item.id)}
            onRegister={() => props.toggleRegistration(item.id)}
          />
        ))}
      </div>

      {!filtered.length && (
        <EmptyState
          title="No events match your search 🌱"
          text="Try picking another category or clear your search terms."
          onReset={() => {
            setSearch('')
            setCategory('All')
          }}
        />
      )}
    </div>
  )
}

export function FindsPage(
  props: CoreProps & { items: FoundItem[]; onReport: () => void }
) {
  const [search, setSearch] = useState('')
  const [kindFilter, setKindFilter] = useState<'All' | 'Lost' | 'Found'>('All')

  const filtered = useMemo(() => {
    return props.items.filter((item) => {
      const matchesKind = kindFilter === 'All' || item.kind === kindFilter
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      return matchesKind && matchesSearch
    })
  }, [props.items, kindFilter, search])

  return (
    <div className="page finds-page">
      <section className="finds-hero-card">
        <div className="finds-hero-copy">
          <span className="header-eyebrow">
            <Sparkles size={13} /> Campus Reunions
          </span>
          <h2>Lost something? We've got your back.</h2>
          <p>
            Browse items found across libraries, labs, and cafeterias — or report an item in under
            a minute to alert student desks and security.
          </p>
          <button className="button-report-cta" onClick={props.onReport}>
            <Plus size={16} />
            <span>Report Lost or Found Item</span>
          </button>
        </div>

        <div className="finds-hero-badge" aria-hidden="true">
          <div className="hero-symbol-circle">
            <span>🔍</span>
          </div>
          <small>Reunited 24 items this month</small>
        </div>
      </section>

      <FilterBar
        search={search}
        setSearch={setSearch}
        categories={['All', 'Lost', 'Found']}
        active={kindFilter}
        setActive={(val) => setKindFilter(val as 'All' | 'Lost' | 'Found')}
        placeholder="Search for ID cards, water bottles, keys..."
        resultCount={filtered.length}
      />

      <div className="finds-grid">
        {filtered.map((item) => (
          <FindCard item={item} key={item.id} onOpen={() => props.onDetail(item)} />
        ))}
      </div>

      {!filtered.length && (
        <EmptyState
          title="No items found matching your filters 🌱"
          text="If you recently lost something, file a quick report and campus security will be notified!"
          onReset={() => {
            setSearch('')
            setKindFilter('All')
          }}
        />
      )}
    </div>
  )
}

export function CampusPage({ onDetail }: CoreProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return locations.filter((item) => {
      const matchesCat = category === 'All' || item.type === category
      const matchesBuilding = !selectedBuilding || item.building === selectedBuilding
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.building.toLowerCase().includes(query) ||
        item.floor.toLowerCase().includes(query) ||
        item.direction.toLowerCase().includes(query)
      return matchesCat && matchesBuilding && matchesSearch
    })
  }, [category, selectedBuilding, search])

  return (
    <div className="page campus-page">
      <section className="campus-hero-layout">
        <div className="campus-hero-text">
          <span className="header-eyebrow">
            <Compass size={13} /> Campus Directory & Navigation
          </span>
          <h2>Know exactly where you're going 🗺️</h2>
          <p>
            Find lecture halls, maker studios, silent study pods, specialty cafés, and athletic
            grounds with step-by-step walking directions.
          </p>

          <FilterBar
            search={search}
            setSearch={setSearch}
            categories={['All', 'Academic', 'Study', 'Food', 'Services', 'Sports']}
            active={category}
            setActive={setCategory}
            compact
            placeholder="Search B204, Robotics Lab, Café..."
            resultCount={filtered.length}
          />
        </div>

        {/* Interactive Stylized Campus Map */}
        <div className="interactive-campus-map" aria-label="Campus Interactive Map">
          <div className="map-ground" />
          <div className="map-walkway path-horizontal" />
          <div className="map-walkway path-diagonal" />

          {/* Building Nodes */}
          <button
            className={`map-node building-library ${selectedBuilding === 'Library Building' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) =>
                prev === 'Library Building' ? null : 'Library Building'
              )
            }
            title="Central Library"
          >
            <span className="node-icon">▤</span>
            <span className="node-label">Library</span>
            <span className="node-status-dot green" />
          </button>

          <button
            className={`map-node building-b-block ${selectedBuilding === 'B Block' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) => (prev === 'B Block' ? null : 'B Block'))
            }
            title="B Block (CS & Robotics)"
          >
            <span className="node-icon">⌘</span>
            <span className="node-label">B Block</span>
            <span className="node-status-dot green" />
          </button>

          <button
            className={`map-node building-student-center ${selectedBuilding === 'Student Centre' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) =>
                prev === 'Student Centre' ? null : 'Student Centre'
              )
            }
            title="Student Centre & Café"
          >
            <span className="node-icon">☕</span>
            <span className="node-label">Student Café</span>
            <span className="node-status-dot green" />
          </button>

          <button
            className={`map-node building-admin ${selectedBuilding === 'Admin Block A' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) =>
                prev === 'Admin Block A' ? null : 'Admin Block A'
              )
            }
            title="Admin Block A (Services)"
          >
            <span className="node-icon">◎</span>
            <span className="node-label">Admin A</span>
          </button>

          <button
            className={`map-node building-c-block ${selectedBuilding === 'C Block' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) => (prev === 'C Block' ? null : 'C Block'))
            }
            title="C Block (Makerspace & Design Studio)"
          >
            <span className="node-icon">✂</span>
            <span className="node-label">C Block</span>
            <span className="node-status-dot green" />
          </button>

          <button
            className={`map-node building-sports ${selectedBuilding === 'South Campus' ? 'active-node' : ''}`}
            onClick={() =>
              setSelectedBuilding((prev) =>
                prev === 'South Campus' ? null : 'South Campus'
              )
            }
            title="South Campus (Sports Ground & Track)"
          >
            <span className="node-icon">◉</span>
            <span className="node-label">Sports</span>
          </button>

          {/* User Current Location Pin */}
          <div className="user-map-pin" title="You are here (Quad Central)">
            <span className="pin-pulse" />
            <div className="pin-marker">✦</div>
            <span className="pin-tooltip">You are here</span>
          </div>

          {selectedBuilding && (
            <button
              className="map-filter-reset-btn"
              onClick={() => setSelectedBuilding(null)}
            >
              <span>Showing: {selectedBuilding}</span>
              <X size={12} />
            </button>
          )}
        </div>
      </section>

      <section className="locations-list-section">
        <SectionHeading
          title={search || category !== 'All' || selectedBuilding ? 'Matching Facilities' : 'Popular Campus Facilities'}
          subtitle="Tap any card to view step-by-step directions and opening hours"
        />

        <div className="location-grid">
          {filtered.map((item) => (
            <LocationCard item={item} key={item.id} onOpen={() => onDetail(item)} />
          ))}
        </div>

        {!filtered.length && (
          <EmptyState
            title="No campus facility matches your search 🌱"
            text="Try searching for another room number, building, or clear your filters."
            onReset={() => {
              setSearch('')
              setCategory('All')
              setSelectedBuilding(null)
            }}
          />
        )}
      </section>
    </div>
  )
}

export function ClubsPage(props: CoreProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return clubs.filter((item) => {
      const matchesCat = category === 'All' || item.category === category
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.vibe && item.vibe.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))
      return matchesCat && matchesSearch
    })
  }, [category, search])

  return (
    <div className="page clubs-page">
      <section className="clubs-hero-banner">
        <div className="clubs-hero-text">
          <span className="header-eyebrow">
            <Users2 size={13} /> Student Communities
          </span>
          <h2>There's a corner of campus waiting for you 🤝</h2>
          <p>
            Whether you want to build open source projects, develop 35mm film, play acoustic tunes,
            or tend to the organic greenhouse, discover welcoming communities.
          </p>
        </div>

        <div className="clubs-constellation-decor" aria-hidden="true">
          <span className="decor-orb o1">✦</span>
          <span className="decor-orb o2">◌</span>
          <span className="decor-orb o3">✿</span>
          <span className="decor-orb o4">&lt;/&gt;</span>
        </div>
      </section>

      <FilterBar
        search={search}
        setSearch={setSearch}
        categories={['All', 'Technology', 'Creative', 'Community']}
        active={category}
        setActive={setCategory}
        placeholder="Search clubs by name, passion, or vibe..."
        resultCount={filtered.length}
      />

      <div className="clubs-cards-list">
        {filtered.map((item) => (
          <ClubCard
            item={item}
            key={item.id}
            joined={props.joinedClubs.has(item.id)}
            onJoin={() => props.toggleJoin(item.id)}
            onOpen={() => props.onDetail(item)}
          />
        ))}
      </div>

      {!filtered.length && (
        <EmptyState
          title="No clubs match your criteria 🌱"
          text="Try searching another category or browse all communities."
          onReset={() => {
            setSearch('')
            setCategory('All')
          }}
        />
      )}
    </div>
  )
}

export function UpdatesPage({
  onDetail,
  reminders,
  toggleReminder
}: CoreProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCat = category === 'All' || item.category === category
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.body.toLowerCase().includes(query)
      return matchesCat && matchesSearch
    })
  }, [category, search])

  return (
    <div className="page updates-page">
      <section className="updates-hero-header">
        <div>
          <span className="header-eyebrow">
            <Sparkles size={13} /> Notices & Deadlines
          </span>
          <h2>Stay gently in the loop 📌</h2>
          <p>
            Verified administrative notices, exam alerts, and academic deadlines without noisy
            group chat spam.
          </p>
        </div>
        <div className="alert-priority-pill">
          <span className="priority-pulse" />
          <span>1 High-Priority Notice</span>
        </div>
      </section>

      <div className="updates-dual-layout">
        <div className="announcements-main-column">
          <SectionHeading
            title="Campus Announcements"
            subtitle="Official department updates and notices"
          />

          <FilterBar
            search={search}
            setSearch={setSearch}
            categories={['All', 'Exams', 'Academic', 'General', 'Administration', 'Clubs']}
            active={category}
            setActive={setCategory}
            compact
            placeholder="Search notices..."
            resultCount={filteredAnnouncements.length}
          />

          <div className="announcements-full-list">
            {filteredAnnouncements.map((item) => (
              <AnnouncementCard item={item} onOpen={() => onDetail(item)} key={item.id} />
            ))}
          </div>

          {!filteredAnnouncements.length && (
            <EmptyState
              title="No announcements match your search 🌱"
              text="You're all caught up with campus notices!"
              onReset={() => {
                setSearch('')
                setCategory('All')
              }}
            />
          )}
        </div>

        <aside className="deadlines-side-column">
          <div className="deadlines-sticky-box">
            <SectionHeading
              title="Your Deadlines"
              subtitle="Track submissions & reminders"
            />

            <div className="deadlines-list-container">
              {deadlines.map((item) => (
                <DeadlineCard
                  item={item}
                  key={item.id}
                  reminded={reminders.has(item.id)}
                  onToggle={() => toggleReminder(item.id)}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FilterBar({
  search,
  setSearch,
  categories,
  active,
  setActive,
  compact = false,
  placeholder = 'Search…',
  resultCount
}: {
  search: string
  setSearch: (value: string) => void
  categories: string[]
  active: string
  setActive: (value: string) => void
  compact?: boolean
  placeholder?: string
  resultCount?: number
}) {
  return (
    <div className={`filter-bar-wrap ${compact ? 'is-compact' : ''}`}>
      <label className="search-input-field">
        <Search size={15} className="search-icon" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          aria-label="Filter records"
        />
        {search && (
          <button
            className="clear-search-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search input"
          >
            <X size={13} />
          </button>
        )}
      </label>

      <div className="category-chips-list" role="tablist">
        {categories.map((item) => (
          <button
            className={`chip-button ${active === item ? 'active' : ''}`}
            onClick={() => setActive(item)}
            key={item}
            role="tab"
            aria-selected={active === item}
          >
            {item}
          </button>
        ))}
      </div>

      {resultCount !== undefined && (
        <div className="filter-results-count">
          <span>{resultCount} {resultCount === 1 ? 'item' : 'items'}</span>
        </div>
      )}
    </div>
  )
}

function EmptyState({
  title,
  text,
  onReset
}: {
  title: string
  text: string
  onReset?: () => void
}) {
  return (
    <div className="empty-state-box">
      <div className="empty-illustration">🌱</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-text">{text}</p>
      {onReset && (
        <button className="empty-reset-button" onClick={onReset}>
          Reset filters
        </button>
      )}
    </div>
  )
}
