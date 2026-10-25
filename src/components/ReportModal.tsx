import { CheckCircle2, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import type { FoundItem } from '../types'

export function ReportModal({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit: (item: FoundItem) => void
}) {
  const [kind, setKind] = useState<'Lost' | 'Found'>('Lost')
  const [name, setName] = useState('')
  const [category, setCategory] = useState<FoundItem['category']>('Accessories')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const getVisualIcon = (cat: FoundItem['category'], k: 'Lost' | 'Found') => {
    if (cat === 'Identity') return '▣'
    if (cat === 'Electronics') return '◖'
    if (cat === 'Accessories') return '◒'
    if (cat === 'Books') return '✎'
    return k === 'Lost' ? '?' : '✓'
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !location.trim()) return

    const newItem: FoundItem = {
      id: `report-${Date.now()}`,
      name: name.trim(),
      location: location.trim(),
      kind,
      category,
      date: 'Just now',
      description:
        description.trim() ||
        `${kind === 'Lost' ? 'Reported missing' : 'Spotted'} around campus. Connect to coordinate a safe handoff.`,
      visual: getVisualIcon(category, kind),
      contact: contact.trim() ? `Reported by ${contact.trim()}` : 'Reported by Student',
      status: 'Open',
      tags: [category, location.split(',')[0].trim()]
    }

    onSubmit(newItem)
    setSubmitted(true)
  }

  return (
    <div className="sheet-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <section className="report-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="sheet-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="report-success">
            <div className="success-icon-wrap">
              <CheckCircle2 size={46} />
            </div>
            <h2>it's out there ✨</h2>
            <p>
              Your {kind.toLowerCase()} report is now published on the live CampusConnect board.
              Fingers crossed for a swift reunion!
            </p>
            <button className="button-modal-primary" onClick={onClose}>
              View on Lost & Found Board
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="modal-eyebrow">
                <Sparkles size={13} /> campus reunions
              </span>
              <h2>report an item</h2>
              <p className="form-intro">
                Help reunite items with their owners. Keep descriptions clear and friendly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="report-form">
              <div className="toggle-pills" role="radiogroup" aria-label="Report type">
                <button
                  type="button"
                  className={`pill-btn ${kind === 'Lost' ? 'active-lost' : ''}`}
                  onClick={() => setKind('Lost')}
                >
                  ● I lost something
                </button>
                <button
                  type="button"
                  className={`pill-btn ${kind === 'Found' ? 'active-found' : ''}`}
                  onClick={() => setKind('Found')}
                >
                  ✓ I found something
                </button>
              </div>

              <div className="form-grid">
                <label className="form-label">
                  <span>What is the item? *</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Hydro Flask bottle, Blue lanyard ID..."
                    className="form-input"
                  />
                </label>

                <label className="form-label">
                  <span>Category</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FoundItem['category'])}
                    className="form-select"
                  >
                    <option value="Accessories">Accessories (Bottles, Keys, Glasses)</option>
                    <option value="Electronics">Electronics (Earbuds, Chargers, Laptops)</option>
                    <option value="Identity">Identity (Student ID, Wallet, Cards)</option>
                    <option value="Books">Books & Stationery</option>
                    <option value="Other">Other Miscellaneous</option>
                  </select>
                </label>

                <label className="form-label">
                  <span>Where was it seen or found? *</span>
                  <input
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Student Café window booth, CS Lab 2..."
                    className="form-input"
                  />
                </label>

                <label className="form-label">
                  <span>Helpful details / markings</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mention color, stickers, scratch marks, or where it is safely kept..."
                    className="form-textarea"
                  />
                </label>

                <label className="form-label">
                  <span>Your name or contact (optional)</span>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. Maya (Math Dept) or Library Front Desk"
                    className="form-input"
                  />
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="button-modal-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button className="button-modal-primary" type="submit">
                  Publish to Campus Board
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
