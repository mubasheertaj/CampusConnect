import { Check, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { foundItems } from './data'
import { CampusAssistant } from './components/CampusAssistant'
import { DetailSheet } from './components/DetailSheet'
import { DesktopNav, MobileNav, Topbar } from './components/Navigation'
import {
  CampusPage,
  ClubsPage,
  EventsPage,
  FindsPage,
  HomePage,
  UpdatesPage
} from './components/Pages'
import { ReportModal } from './components/ReportModal'
import type { Announcement, Club, EventItem, FoundItem, Location, View } from './types'

type Detail = EventItem | Announcement | FoundItem | Location | Club

type ToastNotification = {
  id: number
  message: string
  icon?: string
}

const toggleId = (current: Set<string>, id: string) => {
  const next = new Set(current)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  return next
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('home')
  const [detail, setDetail] = useState<Detail | null>(null)
  const [reporting, setReporting] = useState(false)
  const [items, setItems] = useState<FoundItem[]>(foundItems)
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set(['e1']))
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set())
  const [joinedClubs, setJoinedClubs] = useState<Set<string>>(new Set(['c1']))
  const [reminders, setReminders] = useState<Set<string>>(new Set(['d1']))
  const [toast, setToast] = useState<ToastNotification | null>(null)

  const showToast = (message: string, icon = '✨') => {
    const id = Date.now()
    setToast({ id, message, icon })
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr))
    }, 3200)
  }

  const navigate = (view: View) => {
    setActiveView(view)
    setDetail(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleSaved = (id: string) => {
    setSavedEvents((curr) => {
      const isCurrentlySaved = curr.has(id)
      showToast(
        isCurrentlySaved ? 'Removed from saved events' : 'Saved to your campus bookmarks ⭐',
        isCurrentlySaved ? '✕' : '⭐'
      )
      return toggleId(curr, id)
    })
  }

  const handleToggleRegistration = (id: string) => {
    setRegisteredEvents((curr) => {
      const isRegistered = curr.has(id)
      showToast(
        isRegistered ? 'RSVP cancelled' : "You're registered! Added to your schedule 🎉",
        isRegistered ? '✕' : '🎉'
      )
      return toggleId(curr, id)
    })
  }

  const handleToggleJoin = (id: string) => {
    setJoinedClubs((curr) => {
      const isJoined = curr.has(id)
      showToast(
        isJoined ? 'Left community' : "Welcome! You're now a club member 🤝",
        isJoined ? '✕' : '🤝'
      )
      return toggleId(curr, id)
    })
  }

  const handleToggleReminder = (id: string) => {
    setReminders((curr) => {
      const hasReminder = curr.has(id)
      showToast(
        hasReminder ? 'Reminder removed' : "Reminder set! We'll alert you before it's due ⏰",
        hasReminder ? '✕' : '⏰'
      )
      return toggleId(curr, id)
    })
  }

  const handleDetailAction = (type: string, id: string) => {
    if (detail && 'spots' in detail) {
      handleToggleRegistration(detail.id)
    } else if (detail && 'members' in detail) {
      handleToggleJoin(detail.id)
    }
  }

  const handleNewReport = (newItem: FoundItem) => {
    setItems((curr) => [newItem, ...curr])
    showToast("Report published! We've notified campus desks ✨", '🔍')
  }

  const commonProps = {
    onNavigate: navigate,
    onDetail: setDetail,
    savedEvents,
    toggleSaved: handleToggleSaved,
    registeredEvents,
    toggleRegistration: handleToggleRegistration,
    joinedClubs,
    toggleJoin: handleToggleJoin,
    reminders,
    toggleReminder: handleToggleReminder
  }

  return (
    <div className="app-shell">
      <DesktopNav activeView={activeView} onNavigate={navigate} />

      <main className="main-content">
        <Topbar activeView={activeView} onNavigate={navigate} />

        <div className="page-transition-wrap">
          {activeView === 'home' && <HomePage {...commonProps} />}
          {activeView === 'events' && <EventsPage {...commonProps} />}
          {activeView === 'finds' && (
            <FindsPage {...commonProps} items={items} onReport={() => setReporting(true)} />
          )}
          {activeView === 'campus' && <CampusPage {...commonProps} />}
          {activeView === 'clubs' && <ClubsPage {...commonProps} />}
          {activeView === 'updates' && <UpdatesPage {...commonProps} />}
          {activeView === 'assistant' && (
            <div className="page assistant-page">
              <CampusAssistant onNavigate={navigate} onDetail={setDetail} />
            </div>
          )}
        </div>
      </main>

      {/* Floating Ask Campus Buddy Action Button */}
      {activeView !== 'assistant' && (
        <button
          className="floating-assistant-btn"
          onClick={() => navigate('assistant')}
          aria-label="Open Ask Campus Assistant"
        >
          <span className="floating-assistant-icon">
            <Sparkles size={16} />
          </span>
          <span className="floating-assistant-label">Ask campus ✨</span>
        </button>
      )}

      {/* Floating Delight Toast Notification */}
      {toast && (
        <div className="floating-toast" role="status" aria-live="polite">
          <span className="toast-icon">{toast.icon}</span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)} aria-label="Dismiss notification">
            <X size={13} />
          </button>
        </div>
      )}

      <MobileNav activeView={activeView} onNavigate={navigate} />

      <DetailSheet
        detail={detail}
        onClose={() => setDetail(null)}
        onAction={handleDetailAction}
      />

      {reporting && (
        <ReportModal
          onClose={() => setReporting(false)}
          onSubmit={handleNewReport}
        />
      )}
    </div>
  )
}
