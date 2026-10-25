import {
  Bell,
  CalendarDays,
  Compass,
  GraduationCap,
  Home,
  MessageSquareHeart,
  Search,
  Sparkles,
  Users2
} from 'lucide-react'
import type { View } from '../types'

type Props = { activeView: View; onNavigate: (view: View) => void }

const desktopItems: { view: View; label: string; icon: typeof Home; count?: string }[] = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'events', label: 'Events & Fun', icon: CalendarDays, count: '7' },
  { view: 'finds', label: 'Lost & Found', icon: Search, count: '5' },
  { view: 'campus', label: 'Campus Map', icon: Compass },
  { view: 'clubs', label: 'Communities', icon: Users2, count: '6' },
  { view: 'updates', label: 'Notices & Deadlines', icon: Bell, count: '5' },
  { view: 'assistant', label: 'Ask Campus', icon: MessageSquareHeart },
]

const mobileItems: { view: View; label: string; icon: typeof Home }[] = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'events', label: 'Events', icon: CalendarDays },
  { view: 'finds', label: 'Finds', icon: Search },
  { view: 'campus', label: 'Campus', icon: Compass },
  { view: 'assistant', label: 'Buddy', icon: Sparkles },
]

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button className="brand" onClick={onClick} aria-label="CampusConnect home">
      <span className="brand-mark">
        <GraduationCap size={18} />
      </span>
      <div className="wordmark-wrap">
        <span className="wordmark">
          campus<span>connect</span>
        </span>
        <span className="brand-tagline">student life, simplified</span>
      </div>
    </button>
  )
}

export function DesktopNav({ activeView, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <Brand onClick={() => onNavigate('home')} />

      <nav className="side-nav" aria-label="Primary navigation">
        {desktopItems.map(({ view, label, icon: Icon, count }) => (
          <button
            className={`nav-button ${activeView === view ? 'active' : ''}`}
            onClick={() => onNavigate(view)}
            key={view}
          >
            <Icon size={18} strokeWidth={activeView === view ? 2.2 : 1.8} />
            <span className="nav-label">{label}</span>
            {count && <span className="nav-counter">{count}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-cozy-card">
        <div className="cozy-header">
          <span className="cozy-icon">✦</span>
          <strong>campus buddy</strong>
        </div>
        <p>Looking for a room, a lost Hydro Flask, or tech workshops?</p>
        <button className="cozy-action" onClick={() => onNavigate('assistant')}>
          ask a quick question →
        </button>
      </div>

      <div className="profile-mini" onClick={() => onNavigate('updates')} role="button" tabIndex={0}>
        <div className="avatar">S</div>
        <div className="profile-copy">
          <strong>Student Profile</strong>
          <span className="status-pill-mini">CS '27 · Studying</span>
        </div>
        <button
          className="notification-bell-btn"
          aria-label="View notifications"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('updates')
          }}
        >
          <Bell size={16} />
          <span className="bell-dot" />
        </button>
      </div>
    </aside>
  )
}

export function Topbar({ activeView, onNavigate }: Props) {
  const titles: Record<View, { subtitle: string; title: string }> = {
    home: { subtitle: 'Campus Operating System', title: 'Good vibes & campus life ✨' },
    events: { subtitle: 'Discover workshops & socials', title: 'Things worth showing up for 🎨' },
    finds: { subtitle: 'Community Lost & Found', title: 'Lost, found & reunited 🔍' },
    campus: { subtitle: 'Interactive Directory & Nav', title: 'Find your way around 🗺️' },
    clubs: { subtitle: 'Student Communities', title: 'Find your people on campus 🤝' },
    assistant: { subtitle: 'Grounded AI Companion', title: 'Ask Campus — Your Buddy 💬' },
    updates: { subtitle: 'Notices, deadlines & alerts', title: 'The important bits 📌' },
  }

  const current = titles[activeView] || titles.home

  return (
    <header className="topbar">
      <div className="mobile-brand">
        <Brand onClick={() => onNavigate('home')} />
      </div>

      <div className="title-block">
        <span className="title-eyebrow">{current.subtitle}</span>
        <h1 className="title-heading">{current.title}</h1>
      </div>

      <div className="top-actions">
        <div className="campus-vibe-pill">
          <span className="pulse-dot" />
          <span>Midterms Prep · Sunny 22°C</span>
        </div>

        <button
          className="updates-button"
          onClick={() => onNavigate('updates')}
          aria-label="View notifications"
        >
          <Bell size={16} />
          <span className="updates-text">updates</span>
          <b className="updates-count">3</b>
        </button>

        <div className="avatar-wrap" title="Student Profile">
          <div className="avatar">S</div>
        </div>
      </div>
    </header>
  )
}

export function MobileNav({ activeView, onNavigate }: Props) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {mobileItems.map(({ view, label, icon: Icon }) => (
        <button
          className={`mobile-tab ${activeView === view ? 'active' : ''}`}
          onClick={() => onNavigate(view)}
          key={view}
        >
          <Icon size={19} strokeWidth={activeView === view ? 2.2 : 1.7} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
