import { announcements, clubs, deadlines, events, foundItems, locations } from './data'
import type { AssistantResult } from './types'

const includesAny = (text: string, terms: string[]) => terms.some((term) => text.includes(term.toLowerCase()))

export function answerCampusQuestion(question: string): AssistantResult {
  const q = question.toLowerCase().trim()

  // 1. Lost & Found Queries
  const lostTerms = ['lost', 'found', 'missing', 'id card', 'id', 'earbuds', 'airpods', 'calculator', 'bottle', 'pouch', 'item', 'reunion', 'turnstiles']
  if (includesAny(q, lostTerms)) {
    const isId = includesAny(q, ['id', 'card', 'id card'])
    const isAudio = includesAny(q, ['earbuds', 'airpods', 'headphones', 'case'])
    const isBottle = includesAny(q, ['bottle', 'water', 'hydro flask'])
    const isCalc = includesAny(q, ['calculator', 'ti-84', 'scientific'])
    const isPouch = includesAny(q, ['pouch', 'pencil', 'stationery', 'pens'])

    const matched = foundItems.filter((item) => {
      if (isId && item.category === 'Identity') return true
      if (isAudio && (item.category === 'Electronics' || item.name.toLowerCase().includes('earbuds'))) return true
      if (isBottle && (item.category === 'Accessories' || item.name.toLowerCase().includes('bottle'))) return true
      if (isCalc && item.name.toLowerCase().includes('calculator')) return true
      if (isPouch && (item.category === 'Books' || item.name.toLowerCase().includes('pencil'))) return true
      return true
    })

    const targetItems = matched.length ? matched : foundItems
    const first = targetItems[0]

    if (isId) {
      return {
        answer: `I found a matching report: "${first.name}" found near ${first.location}. It's currently kept safely at the ${first.contact}. You can claim it with proof of enrollment!`,
        view: 'finds',
        label: 'View Lost & Found report',
        type: 'find',
        ids: [first.id],
        suggestedAction: { label: 'See all items', view: 'finds', targetId: first.id }
      }
    }

    if (isBottle) {
      const bottle = targetItems.find((i) => i.name.toLowerCase().includes('bottle')) || targetItems[0]
      return {
        answer: `A "${bottle.name}" was recently reported lost near ${bottle.location}. Check the details below or file a new report if yours is different!`,
        view: 'finds',
        label: 'View bottle listing',
        type: 'find',
        ids: [bottle.id],
        suggestedAction: { label: 'Open Lost & Found', view: 'finds' }
      }
    }

    return {
      answer: targetItems.length
        ? `I found ${targetItems.length} matching item${targetItems.length > 1 ? 's' : ''} reported on campus recently. If your item isn't listed, you can file a quick report in under 30 seconds!`
        : `No exact match was found in the recent log. Tap below to submit a 30-second lost item report so security and students can assist!`,
      view: 'finds',
      label: 'Open Lost & Found',
      type: 'find',
      ids: targetItems.map((item) => item.id),
      suggestedAction: { label: 'Report an item', view: 'finds' }
    }
  }

  // 2. Deadlines & Exams
  const deadlineTerms = ['deadline', 'due', 'assignment', 'exam', 'assessment', 'scholarship', 'submission', 'test', 'schedule']
  if (includesAny(q, deadlineTerms)) {
    const isExams = includesAny(q, ['exam', 'assessment', 'mid-sem', 'mid-semester'])
    const isToday = includesAny(q, ['today', 'tomorrow', 'urgent'])
    const sorted = [...deadlines].sort((a, b) => (a.urgency === 'Today' ? -1 : 1))

    if (isExams) {
      const examDeadline = deadlines.find((d) => d.id === 'd5') || deadlines[0]
      return {
        answer: `Mid-semester assessments begin Oct 1. The official department timetable and room seating plans are already published on the student portal.`,
        view: 'updates',
        label: 'View exam updates',
        type: 'deadline',
        ids: [examDeadline.id],
        suggestedAction: { label: 'Check announcements', view: 'updates' }
      }
    }

    const urgent = sorted.filter((d) => d.urgency === 'Today' || d.urgency === 'Soon')
    return {
      answer: `You have ${deadlines.length} upcoming deadlines on your radar. The most urgent is "${sorted[0].title}" (${sorted[0].dueLabel.toLowerCase()}). Don't forget to submit!`,
      view: 'updates',
      label: 'View all deadlines',
      type: 'deadline',
      ids: (urgent.length ? urgent : sorted).map((d) => d.id),
      suggestedAction: { label: 'Set reminders', view: 'updates' }
    }
  }

  // 3. Campus Locations & Study Spaces
  const placeTerms = ['where', 'location', 'room', 'lab', 'library', 'cafe', 'cafeteria', 'coffee', 'food', 'snack', 'b204', 'b112', 'c108', 'a006', 'building', 'map', 'directions', 'study spot', 'quiet', 'eat', 'sports']
  if (includesAny(q, placeTerms)) {
    let matchedPlaces = locations.filter((loc) => {
      if (includesAny(q, ['robot', 'robotics']) && loc.name.toLowerCase().includes('robotics')) return true
      if (includesAny(q, ['library', 'books', 'quiet', 'study']) && (loc.name.toLowerCase().includes('library') || loc.type === 'Study')) return true
      if (includesAny(q, ['cs lab', 'b204', 'computer']) && loc.name.toLowerCase().includes('cs lab')) return true
      if (includesAny(q, ['b112']) && loc.floor.toLowerCase().includes('b112')) return true
      if (includesAny(q, ['cafe', 'coffee', 'food', 'snack', 'matcha', 'eat']) && loc.type === 'Food') return true
      if (includesAny(q, ['services', 'registry', 'id replacement', 'a006', 'admin']) && loc.type === 'Services') return true
      if (includesAny(q, ['sport', 'ground', 'football', 'turf', 'track']) && loc.type === 'Sports') return true
      if (includesAny(q, ['maker', 'design', 'c108', 'studio']) && loc.id === 'l7') return true
      return false
    })

    if (!matchedPlaces.length) {
      matchedPlaces = locations
    }

    const first = matchedPlaces[0]
    return {
      answer: `${first.name} is in ${first.building}, ${first.floor}. Directions: ${first.direction} (${first.status || first.hours}).`,
      view: 'campus',
      label: `Navigate to ${first.name}`,
      type: 'location',
      ids: matchedPlaces.map((l) => l.id),
      suggestedAction: { label: 'Open campus map', view: 'campus', targetId: first.id }
    }
  }

  // 4. Clubs & Communities
  const clubTerms = ['club', 'society', 'community', 'join', 'coding club', 'photography', 'design', 'verse', 'garden', 'green', 'people']
  if (includesAny(q, clubTerms)) {
    const isCoding = includesAny(q, ['coding', 'code', 'tech', 'software', 'programming', 'hackathon'])
    const isCreative = includesAny(q, ['photo', 'film', 'camera', 'verse', 'poetry', 'music', 'design', 'art'])
    const isGreen = includesAny(q, ['green', 'garden', 'eco', 'plant', 'sustainability'])

    const matchedClubs = clubs.filter((c) => {
      if (isCoding && c.category === 'Technology') return true
      if (isCreative && c.category === 'Creative') return true
      if (isGreen && c.category === 'Community') return true
      return true
    })

    const top = matchedClubs.slice(0, 3)
    return {
      answer: `Found ${matchedClubs.length} vibrant campus communities! ${top[0].name} meets ${top[0].meeting} and welcomes new members anytime.`,
      view: 'clubs',
      label: 'Explore all clubs',
      type: 'club',
      ids: top.map((c) => c.id),
      suggestedAction: { label: 'Join a club', view: 'clubs' }
    }
  }

  // 5. Announcements
  const announcementTerms = ['announcement', 'notice', 'alert', 'water', 'news', 'update']
  if (includesAny(q, announcementTerms)) {
    return {
      answer: `There are ${announcements.length} active notices on campus. Top update: "${announcements[0].title}" (${announcements[0].published}).`,
      view: 'updates',
      label: 'Read announcements',
      type: 'announcement',
      ids: announcements.map((a) => a.id),
      suggestedAction: { label: 'See all updates', view: 'updates' }
    }
  }

  // 6. Events & Happenings (Default grounded lookup)
  const isTech = includesAny(q, ['tech', 'hackathon', 'ai', 'code', 'workshop'])
  const isToday = includesAny(q, ['today', 'tonight', 'now'])
  const matchedEvents = isTech ? events.filter((e) => e.category === 'Tech') : events

  return {
    answer: isToday
      ? `Here is what's happening on campus: "${events[0].title}" is taking place at ${events[0].location}, plus ${events.length - 1} other workshops and cultural meetups this week!`
      : `There are ${matchedEvents.length} events scheduled this week, including the "${matchedEvents[0].title}" (${matchedEvents[0].time} at ${matchedEvents[0].location}).`,
    view: 'events',
    label: 'Browse all events',
    type: 'event',
    ids: matchedEvents.map((e) => e.id),
    suggestedAction: { label: 'Explore events', view: 'events' }
  }
}
