import {
  ArrowRight,
  Bot,
  Compass,
  CornerDownLeft,
  LoaderCircle,
  MapPin,
  MessageSquareHeart,
  RotateCcw,
  Send,
  Sparkles,
  User
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { answerCampusQuestion } from '../assistant'
import { announcements, clubs, deadlines, events, foundItems, locations } from '../data'
import type { AssistantResult, View } from '../types'

const suggestedPrompts = [
  'Where is the robotics lab?',
  'What events are happening this week?',
  'I lost my ID card',
  'What coding clubs are there?',
  'What deadlines do I have soon?',
  'Where can I get good coffee on campus?',
  'When does the library close?'
]

type Message = {
  role: 'assistant' | 'user'
  text: string
  result?: AssistantResult
  time: string
}

function ResultCardItem({
  result,
  onNavigate,
  onDetail
}: {
  result: AssistantResult
  onNavigate: (view: View) => void
  onDetail?: (item: any) => void
}) {
  const getResources = () => {
    switch (result.type) {
      case 'event':
        return events
      case 'location':
        return locations
      case 'find':
        return foundItems
      case 'club':
        return clubs
      case 'deadline':
        return deadlines
      case 'announcement':
        return announcements
      default:
        return []
    }
  }

  const resources = getResources()
  const matchingRows = resources.filter((item) => result.ids.includes(item.id)).slice(0, 3)

  if (!matchingRows.length) return null

  return (
    <div className="assistant-cards-tray">
      <div className="tray-label">
        <span>Verified Campus Records ({matchingRows.length})</span>
      </div>

      <div className="tray-items">
        {matchingRows.map((row) => {
          const title = 'title' in row ? row.title : row.name
          const subtitle =
            'location' in row
              ? row.location
              : 'floor' in row
              ? `${row.building} · ${row.floor}`
              : 'dueLabel' in row
              ? row.dueLabel
              : 'meeting' in row
              ? row.meeting
              : 'Campus info'

          const iconSymbol =
            'visual' in row ? row.visual : 'icon' in row ? row.icon : 'mark' in row ? row.mark : '✦'

          return (
            <div
              className="assistant-card-chip"
              key={row.id}
              onClick={() => {
                if (onDetail) {
                  onDetail(row)
                } else {
                  onNavigate(result.view)
                }
              }}
              role="button"
              tabIndex={0}
              title="Click to view full details"
            >
              <div className="chip-symbol">{iconSymbol}</div>
              <div className="chip-info">
                <strong>{title}</strong>
                <span>{subtitle}</span>
              </div>
              <ArrowRight size={13} className="chip-arrow" />
            </div>
          )
        })}
      </div>

      <button className="tray-navigate-btn" onClick={() => onNavigate(result.view)}>
        <span>{result.label}</span>
        <Compass size={14} />
      </button>
    </div>
  )
}

export function CampusAssistant({
  onNavigate,
  onDetail
}: {
  onNavigate: (view: View) => void
  onDetail?: (item: any) => void
}) {
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  const initialGreeting: Message = {
    role: 'assistant',
    text: "Hey there! ✨ I'm your campus buddy. Ask me about classrooms, workshops, lost items, club meetups, or upcoming deadlines. Everything comes from verified campus data.",
    time: 'Just now'
  }

  const [messages, setMessages] = useState<Message[]>([initialGreeting])

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const handleAsk = (queryText: string) => {
    const clean = queryText.trim()
    if (!clean || isThinking) return

    const now = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(
      new Date()
    )

    setMessages((prev) => [...prev, { role: 'user', text: clean, time: now }])
    setInput('')
    setIsThinking(true)

    // Grounded deterministic delay to feel natural
    setTimeout(() => {
      const response = answerCampusQuestion(clean)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.answer,
          result: response,
          time: new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(
            new Date()
          )
        }
      ])
      setIsThinking(false)
    }, 280)
  }

  const handleResetChat = () => {
    setMessages([initialGreeting])
    setInput('')
    setIsThinking(false)
  }

  return (
    <section className="assistant-container">
      <div className="assistant-hero-card">
        <div className="assistant-avatar-orb">
          <Sparkles size={24} />
        </div>
        <div className="assistant-hero-text">
          <div className="assistant-status-row">
            <span className="live-pill">● Online & Grounded</span>
            <span className="assistant-version">CampusConnect AI v2</span>
          </div>
          <h2>Ask Campus ✨</h2>
          <p>
            Your friendly companion for navigating buildings, discovering student life, tracking
            assignments, and reuniting lost belongings.
          </p>
        </div>
        <button
          className="assistant-reset-btn"
          onClick={handleResetChat}
          title="Restart conversation"
          aria-label="Restart chat"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>

      <div className="assistant-prompts-scroller">
        <span className="prompts-title">Try asking:</span>
        <div className="prompts-list">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              className="prompt-pill"
              onClick={() => handleAsk(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="assistant-chat-stream" aria-live="polite">
        {messages.map((msg, index) => (
          <div className={`chat-row ${msg.role}`} key={`${msg.role}-${index}`}>
            <div className="chat-avatar-bubble">
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>

            <div className="chat-content-wrap">
              <div className="chat-meta">
                <span className="chat-sender-name">
                  {msg.role === 'assistant' ? 'Campus Buddy' : 'You'}
                </span>
                <span className="chat-timestamp">{msg.time}</span>
              </div>

              <div className="chat-bubble">
                <p>{msg.text}</p>
              </div>

              {msg.result && (
                <ResultCardItem
                  result={msg.result}
                  onNavigate={onNavigate}
                  onDetail={onDetail}
                />
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-row assistant">
            <div className="chat-avatar-bubble">
              <Bot size={16} />
            </div>
            <div className="chat-content-wrap">
              <div className="thinking-bubble">
                <LoaderCircle size={15} className="spinner-icon" />
                <span>Checking campus records…</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      <form
        className="assistant-form-bar"
        onSubmit={(e) => {
          e.preventDefault()
          handleAsk(input)
        }}
      >
        <div className="input-inner">
          <MessageSquareHeart size={18} className="input-icon" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rooms, events, lost items, deadlines..."
            aria-label="Ask campus assistant"
            className="chat-input"
          />
        </div>
        <button
          type="submit"
          className="send-button"
          disabled={!input.trim() || isThinking}
          aria-label="Send message"
        >
          <Send size={16} />
          <span>Ask</span>
        </button>
      </form>
    </section>
  )
}
