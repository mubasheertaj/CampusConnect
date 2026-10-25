export type View = 'home' | 'events' | 'finds' | 'campus' | 'clubs' | 'assistant' | 'updates'

export type EventItem = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  category: 'Tech' | 'Culture' | 'Career' | 'Sports' | 'Community'
  visual: string
  accent: 'coral' | 'peach' | 'lavender' | 'sage' | 'blush' | 'violet' | 'blue' | 'orange' | 'pink' | 'green' | 'lime'
  spots: string
  spotsLeft?: number
  isFree?: boolean
  tags?: string[]
  featuredBadge?: string
}

export type Announcement = {
  id: string
  title: string
  body: string
  category: 'Academic' | 'Exams' | 'Administration' | 'Events' | 'Clubs' | 'Emergency' | 'General'
  priority: 'High' | 'Normal' | 'Info'
  published: string
  urgent?: boolean
  author?: string
}

export type FoundItem = {
  id: string
  name: string
  description: string
  category: 'Identity' | 'Electronics' | 'Accessories' | 'Books' | 'Other'
  kind: 'Lost' | 'Found'
  location: string
  date: string
  visual: string
  contact: string
  status?: 'Open' | 'Claimed'
  tags?: string[]
}

export type Location = {
  id: string
  name: string
  type: 'Academic' | 'Food' | 'Services' | 'Sports' | 'Study'
  building: string
  floor: string
  description: string
  hours: string
  direction: string
  icon: string
  status?: string
  amenities?: string[]
  mapCoords?: { x: number; y: number }
}

export type Club = {
  id: string
  name: string
  category: 'Technology' | 'Creative' | 'Community' | 'Sports' | 'Academic'
  description: string
  meeting: string
  activity: string
  members: number
  mark: string
  color: 'violet' | 'orange' | 'blue' | 'green' | 'pink' | 'coral' | 'sage'
  tags?: string[]
  lead?: string
  vibe?: string
}

export type Deadline = {
  id: string
  title: string
  type: 'Academic' | 'Registration' | 'Event' | 'Financial'
  due: string
  dueLabel: string
  detail: string
  urgency: 'Today' | 'Soon' | 'Upcoming'
  courseCode?: string
}

export type AssistantResult = {
  answer: string
  view: View
  label: string
  type: 'event' | 'location' | 'find' | 'club' | 'deadline' | 'announcement' | 'none'
  ids: string[]
  suggestedAction?: {
    label: string
    view: View
    targetId?: string
  }
}
