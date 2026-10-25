import type { Announcement, Club, Deadline, EventItem, FoundItem, Location } from './types'

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Build for Better Hackathon',
    description: 'A friendly 24-hour sprint crafting ideas that make student life cozy and delightful. Bring a team or find friendly teammates at check-in. Free snacks & boba provided!',
    date: '2026-09-25',
    time: '5:00 PM',
    location: 'Innovation Hub, A Block',
    organizer: 'CodeCircle',
    category: 'Tech',
    visual: '⚡',
    accent: 'violet',
    spots: '42 spots left',
    spotsLeft: 42,
    isFree: true,
    tags: ['Hackathon', 'Collab', 'Snacks'],
    featuredBadge: 'Featured of the Week'
  },
  {
    id: 'e2',
    title: 'Intro to Applied AI & LLMs',
    description: 'A hands-on, beginner-friendly workshop on prompt engineering, agent prototypes, and responsible AI. No prior ML math required!',
    date: '2026-09-22',
    time: '3:30 PM',
    location: 'CS Lab 2, B Block',
    organizer: 'AI Society',
    category: 'Tech',
    visual: '✦',
    accent: 'blue',
    spots: '18 spots left',
    spotsLeft: 18,
    isFree: true,
    tags: ['Workshop', 'Hands-on', 'AI']
  },
  {
    id: 'e3',
    title: 'Portfolio That Gets Noticed',
    description: 'Senior product designers and alumni share raw feedback on making your GitHub, Figma, and case studies genuinely stand out.',
    date: '2026-09-24',
    time: '12:30 PM',
    location: 'Seminar Hall, Admin Block',
    organizer: 'Career Cell',
    category: 'Career',
    visual: '↗',
    accent: 'orange',
    spots: 'Open to all students',
    isFree: true,
    tags: ['Career', 'Design', 'Mentorship']
  },
  {
    id: 'e4',
    title: 'Campus Open Mic & Chai Evening',
    description: 'An easygoing acoustic evening of indie poetry, acoustic guitar, stand-up comedy, and warm chai. Everyone is welcome to perform or just listen.',
    date: '2026-09-26',
    time: '6:00 PM',
    location: 'Amphitheatre (under fairy lights)',
    organizer: 'The Verse Society',
    category: 'Culture',
    visual: '♫',
    accent: 'pink',
    spots: 'Register to perform or attend',
    isFree: true,
    tags: ['Live Music', 'Poetry', 'Chai']
  },
  {
    id: 'e5',
    title: 'Sunset Clay & Pottery Workshop',
    description: 'Unwind from assignment stress with clay throwing, hand-sculpting, and ceramic glazing. Take home your own coffee mug!',
    date: '2026-09-27',
    time: '4:00 PM',
    location: 'Arts Studio, C Block Level 1',
    organizer: 'Design Collective',
    category: 'Culture',
    visual: '✿',
    accent: 'peach',
    spots: '12 spots left',
    spotsLeft: 12,
    isFree: true,
    tags: ['Craft', 'Mindful', 'Take-home']
  },
  {
    id: 'e6',
    title: 'Interdepartmental Football Derby',
    description: 'Cheer on your branch at the opening cup match! CS vs Mechanical. Live commentary, team merch, and food trucks on site.',
    date: '2026-09-27',
    time: '8:00 AM',
    location: 'Main Sports Ground',
    organizer: 'Sports Council',
    category: 'Sports',
    visual: '◉',
    accent: 'green',
    spots: 'Spectators welcome',
    isFree: true,
    tags: ['Derby', 'Match Day', 'Outdoor']
  },
  {
    id: 'e7',
    title: 'Community Garden Morning',
    description: 'Plant wildflower seeds, refresh the community herb garden, and grab iced matcha with fellow plant lovers.',
    date: '2026-09-28',
    time: '9:00 AM',
    location: 'East Lawn, Botanical Corner',
    organizer: 'Green Campus',
    category: 'Community',
    visual: '🌱',
    accent: 'lime',
    spots: 'Tools provided',
    isFree: true,
    tags: ['Gardening', 'Eco', 'Relaxing']
  }
]

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Mid-semester assessment schedule is live',
    body: 'Department-wise room allocations, seating matrices, and reporting windows are published on the portal. Please verify your course codes before arrival.',
    category: 'Exams',
    priority: 'High',
    published: '2h ago',
    urgent: true,
    author: 'Examination Cell'
  },
  {
    id: 'a2',
    title: 'Library stays open until 10 PM this week',
    body: 'Extended study hours with reserved silent pods on Level 2 & 3. Free filter coffee station open at 8 PM. Student ID required past 7 PM.',
    category: 'Academic',
    priority: 'Normal',
    published: 'Today, 10:30 AM',
    author: 'Library Administration'
  },
  {
    id: 'a3',
    title: 'Free matcha & filter coffee at Student Café',
    body: 'Student Union is hosting a finals prep welcome table today between 2 PM and 4 PM. Bring your reusable mug for bonus cookies!',
    category: 'General',
    priority: 'Normal',
    published: 'Today, 8:45 AM',
    author: 'Student Union'
  },
  {
    id: 'a4',
    title: 'Water supply maintenance — C Block',
    body: 'Scheduled plumbing maintenance will pause water service in C Block from 11:00 AM to 1:00 PM on Tuesday. Restrooms in B Block remain fully accessible.',
    category: 'Administration',
    priority: 'Info',
    published: 'Yesterday',
    author: 'Campus Facilities'
  },
  {
    id: 'a5',
    title: 'Auditions open for the Annual Cultural Showcase',
    body: 'Solo music acts, acoustic duos, poetry readings, and dance troupes: submit your 1-minute rehearsal video by Thursday 6 PM.',
    category: 'Clubs',
    priority: 'Normal',
    published: 'Yesterday',
    author: 'Cultural Council'
  }
]

export const foundItems: FoundItem[] = [
  {
    id: 'f1',
    name: 'Blue student ID card',
    description: 'Found near the north entrance turnstiles. Initials S. K. visible on the reverse magnetic strip.',
    category: 'Identity',
    kind: 'Found',
    location: 'North Gate Turnstiles',
    date: 'Today, 9:15 AM',
    visual: '▣',
    contact: 'Security Desk (Ext 401)',
    status: 'Open',
    tags: ['ID', 'North Gate']
  },
  {
    id: 'f2',
    name: 'Matte black wireless earbuds case',
    description: 'Compact AirPods Pro style case with subtle scratch near the hinge. Please verify the device name to claim.',
    category: 'Electronics',
    kind: 'Found',
    location: 'Central Library, Level 1 Desk',
    date: 'Yesterday, 4:20 PM',
    visual: '◖',
    contact: 'Library Help Desk',
    status: 'Open',
    tags: ['Audio', 'Library']
  },
  {
    id: 'f3',
    name: 'Silver insulated water bottle',
    description: '24oz Hydro Flask with a small planet sticker and a holographic cat sticker near the base.',
    category: 'Accessories',
    kind: 'Lost',
    location: 'CS Lab 2 (Row 3)',
    date: 'Yesterday, 1:15 PM',
    visual: '◒',
    contact: 'Reported by Riya (CS Year 2)',
    status: 'Open',
    tags: ['Bottle', 'CS Lab']
  },
  {
    id: 'f4',
    name: 'TI-84 Plus scientific calculator',
    description: 'Grey graphing calculator in a navy protective hard sleeve with a gold name sticker on back.',
    category: 'Electronics',
    kind: 'Lost',
    location: 'B204 / B Block Lecture Hall',
    date: 'Sep 18, 5:00 PM',
    visual: '⌗',
    contact: 'Reported by Arjun (Maths Dept)',
    status: 'Open',
    tags: ['Calculator', 'B204']
  },
  {
    id: 'f5',
    name: 'Muji canvas pencil pouch & pastel pens',
    description: 'Beige zippered pencil case containing zebra mildliners and sticky notes left behind after study group.',
    category: 'Books',
    kind: 'Found',
    location: 'Student Café, Window Booth 4',
    date: 'Sep 19, 11:30 AM',
    visual: '✎',
    contact: 'Café Barista Counter',
    status: 'Open',
    tags: ['Stationery', 'Café']
  }
]

export const locations: Location[] = [
  {
    id: 'l1',
    name: 'Robotics Lab',
    type: 'Academic',
    building: 'B Block',
    floor: 'Level 1 · Room B112',
    description: 'Robotics workbenches, 3D printers, ROS workstations, and the autonomous rover testing pen.',
    hours: '9:00 AM – 7:00 PM',
    direction: 'Enter B Block main arch → take the left corridor past the faculty board → first double door on your right.',
    icon: '⚙',
    status: 'Open now · closes 7 PM',
    amenities: ['3D Printers', 'Soldering Bay', 'Autonomous Rover Arena', 'Fast Wi-Fi']
  },
  {
    id: 'l2',
    name: 'Central Library',
    type: 'Study',
    building: 'Library Building',
    floor: 'Levels 1–3',
    description: 'Spacious quiet study areas, bookable group project pods, charging tables, and academic course reserves.',
    hours: '8:00 AM – 10:00 PM (Extended this week)',
    direction: 'Across the central quad green, right behind the marble fountain.',
    icon: '▤',
    status: 'Open now · extended to 10 PM',
    amenities: ['Silent Study Pods', 'Power Outlets at every desk', 'Book Scanner', 'Free Coffee at 8 PM']
  },
  {
    id: 'l3',
    name: 'CS Lab 2',
    type: 'Academic',
    building: 'B Block',
    floor: 'Level 2 · Room B204',
    description: 'Dual-monitor computing lab equipped with Linux workstations, Docker setups, and AI development GPUs.',
    hours: '9:00 AM – 6:00 PM',
    direction: 'Enter B Block → climb central wooden stairs to Level 2 → turn right down hallway; second room on right.',
    icon: '⌘',
    status: 'Open now · closes 6 PM',
    amenities: ['Dual Monitors', 'GPU Workstations', 'Whiteboards', 'AC']
  },
  {
    id: 'l4',
    name: 'Student Café & Social Hub',
    type: 'Food',
    building: 'Student Centre',
    floor: 'Ground Floor',
    description: 'Artisanal espresso, matcha lattes, fresh bakery, grilled toasties, and cozy booth seating with warm lighting.',
    hours: '8:00 AM – 8:00 PM',
    direction: 'Follow the flower-lined walkway from the main quad into the glass rotunda.',
    icon: '☕',
    status: 'Open now · hot food until 7:30 PM',
    amenities: ['Specialty Coffee', 'Vegan Options', 'Lounge Booths', 'Card Payments']
  },
  {
    id: 'l5',
    name: 'Student Services & Registry',
    type: 'Services',
    building: 'Admin Block A',
    floor: 'Ground Floor · Room A006',
    description: 'Student ID card reissuance, bonafide certificates, transcript requests, fee waivers, and campus concierge.',
    hours: '10:00 AM – 4:00 PM',
    direction: 'Main entrance of Admin Block A, immediately to the right of the visitor reception desk.',
    icon: '◎',
    status: 'Open now · closes 4 PM',
    amenities: ['Instant ID Replacement', 'Official Attestation', 'Lost Property Registry']
  },
  {
    id: 'l6',
    name: 'Main Sports Ground & Track',
    type: 'Sports',
    building: 'South Campus',
    floor: 'Outdoor Grounds',
    description: 'Full-size football turf, 400m synthetic running track, badminton courts, and shaded spectator bleachers.',
    hours: '6:00 AM – 8:00 PM',
    direction: 'Walk past the Student Centre and continue down the stone path toward the South Gate.',
    icon: '◉',
    status: 'Open now · floodlights from 6 PM',
    amenities: ['Floodlit Turf', 'Locker Rooms', 'Water Refill Stations', 'Equipment Rental']
  },
  {
    id: 'l7',
    name: 'Design & Makerspace Studio',
    type: 'Study',
    building: 'C Block',
    floor: 'Level 1 · Room C108',
    description: 'Open creative studio with laser cutters, drawing tablets, risograph printer, and drafting tables.',
    hours: '10:00 AM – 6:00 PM',
    direction: 'Enter C Block east wing → take hallway to the left of the elevators.',
    icon: '✂',
    status: 'Open now · closes 6 PM',
    amenities: ['Laser Cutter', 'Drawing Tablets', 'Craft Supplies', 'Cutting Mats']
  }
]

export const clubs: Club[] = [
  {
    id: 'c1',
    name: 'CodeCircle',
    category: 'Technology',
    description: 'A welcoming, supportive community for coders, builders, open-source contributors, and curious beginners.',
    meeting: 'Fridays · 4:00 PM · Innovation Hub',
    activity: 'Build for Better Hackathon (Sep 25)',
    members: 428,
    mark: '</>',
    color: 'violet',
    tags: ['Web Dev', 'Hackathons', 'Open Source'],
    lead: 'Alex & Maya',
    vibe: 'Late night builds & fun projects'
  },
  {
    id: 'c2',
    name: 'AI Society',
    category: 'Technology',
    description: 'Explore neural nets, generative media, agentic workflows, and the societal implications of artificial intelligence.',
    meeting: 'Tuesdays · 3:30 PM · CS Lab 2',
    activity: 'Intro to Applied AI workshop',
    members: 296,
    mark: '✦',
    color: 'blue',
    tags: ['AI/ML', 'Workshops', 'Research'],
    lead: 'Dr. Evelyn & Sam',
    vibe: 'Curious minds & hands-on prototypes'
  },
  {
    id: 'c3',
    name: 'Shutter Society',
    category: 'Creative',
    description: 'Capture the soul of campus life through 35mm film walks, golden-hour photo tours, and darkroom printing sessions.',
    meeting: 'Wednesdays · 5:00 PM · Media Room',
    activity: 'Campus Golden Hour photowalk',
    members: 167,
    mark: '◌',
    color: 'orange',
    tags: ['Photography', 'Film', 'Exhibitions'],
    lead: 'Aarav & Lin',
    vibe: 'Warm light & visual storytelling'
  },
  {
    id: 'c4',
    name: 'Green Campus Initiative',
    category: 'Community',
    description: 'Small, mindful actions creating a greener, more sustainable campus: composting, botanical tags, and community garden mornings.',
    meeting: 'Sundays · 9:00 AM · East Lawn Garden',
    activity: 'Wildflower planting & organic composting',
    members: 93,
    mark: '✿',
    color: 'green',
    tags: ['Ecology', 'Gardening', 'Action'],
    lead: 'Tara',
    vibe: 'Coffee, soil, and good sunshine'
  },
  {
    id: 'c5',
    name: 'The Verse Society',
    category: 'Creative',
    description: 'For readers, poets, songwriters, acoustic strummers, and anyone with a story or lyric waiting to be heard.',
    meeting: 'Thursdays · 5:00 PM · Amphitheatre',
    activity: 'Under-the-Stars Open Mic & Chai',
    members: 141,
    mark: '“',
    color: 'pink',
    tags: ['Poetry', 'Acoustic', 'Storytelling'],
    lead: 'Kabir & Zoe',
    vibe: 'Soulful words, acoustic strings & chai'
  },
  {
    id: 'c6',
    name: 'Design Collective',
    category: 'Creative',
    description: 'Product designers, UI/UX illustrators, graphic artists, and ceramic enthusiasts collaborating on campus identity and personal portfolios.',
    meeting: 'Mondays · 4:30 PM · Studio C108',
    activity: 'Sunset Clay Workshop & Portfolio Crit',
    members: 215,
    mark: '✎',
    color: 'coral',
    tags: ['UI/UX', 'Ceramics', 'Branding'],
    lead: 'Nia',
    vibe: 'Aesthetics, good coffee & Figma magic'
  }
]

export const deadlines: Deadline[] = [
  {
    id: 'd1',
    title: 'Data Structures Problem Set 3',
    type: 'Academic',
    due: '2026-09-21',
    dueLabel: 'Due tomorrow · 11:59 PM',
    detail: 'Submit your solution via the course GitLab. Late submissions deduct 10% per 24h.',
    urgency: 'Today',
    courseCode: 'CS201'
  },
  {
    id: 'd2',
    title: 'Hackathon Team Registration Deadline',
    type: 'Registration',
    due: '2026-09-23',
    dueLabel: 'Due in 3 days · Sep 23',
    detail: 'Finalize teams of 2 to 4 students. Solo signups will be matched automatically.',
    urgency: 'Soon',
    courseCode: 'Campus'
  },
  {
    id: 'd3',
    title: 'Course Add/Drop Petition Window',
    type: 'Academic',
    due: '2026-09-25',
    dueLabel: 'Due in 5 days · Sep 25',
    detail: 'Last day to change electives without transcript notation via Student Services.',
    urgency: 'Soon',
    courseCode: 'Registrar'
  },
  {
    id: 'd4',
    title: 'Merit Scholarship Document Verification',
    type: 'Financial',
    due: '2026-09-30',
    dueLabel: 'Due Sep 30 · 5:00 PM',
    detail: 'Upload attested income certificates & prior semester grade cards to the portal.',
    urgency: 'Upcoming',
    courseCode: 'Aid'
  },
  {
    id: 'd5',
    title: 'Mid-Semester Examinations Kickoff',
    type: 'Academic',
    due: '2026-10-01',
    dueLabel: 'Starts Oct 1',
    detail: 'Refer to the published exam timetable for individual classroom and hall allocations.',
    urgency: 'Upcoming',
    courseCode: 'Exams'
  }
]
