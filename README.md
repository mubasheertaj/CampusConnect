# CampusConnect

**Everything happening on campus, in one place.**

CampusConnect is a mobile-first campus information platform designed to bring campus activities, events, clubs, and useful information together in one place.

🚀 **[Live Demo](https://campusconnectversion1.netlify.app/)**

## ✨ Features

* **Campus Feed:** Review campus updates and activities.
* **Events:** Explore events, filter by category, and save events.
* **Campus Assistant:** Ask questions about campus events and locations using a deterministic, local-data-based assistant.
* **Campus Locations:** Find places on campus, such as the robotics lab.
* **Lost & Found:** Submit reports for lost items.
* **Clubs:** Discover and join campus clubs.
* **Mobile-First Design:** An interface designed with mobile usability in mind.

## 🛠️ Technologies

* React
* TypeScript
* Vite
* npm

The demo uses local data and local UI state. Its core demonstration does not require external APIs or credentials.

## 💻 Run Locally

### Prerequisites

* Node.js
* npm

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/mubasheertaj/CampusConnect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CampusConnect
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite in your browser.

### Production Build

To create a production build, run:

```bash
npm run build
```

## 🏗️ Project Structure

```text
src/
├── data.ts          # Typed campus seed data
├── assistant.ts     # Assistant intent matching and retrieval
├── components/     # Reusable UI components
└── App.tsx          # Main view composition and local UI state
```

## 🧭 Demo Walkthrough

Try the following flow in the live demo:

1. Open Home and review the campus feed.
2. Visit Events, filter by Tech, and save a hackathon.
3. Ask the Campus Assistant: "Are there any coding events this week?"
4. Ask: "Where is the robotics lab?"
5. Visit Finds and submit a lost-item report.
6. Discover and join a club.

## 🔍 Architecture

CampusConnect uses local seed data and local interface state to provide a predictable demonstration experience.

* `src/data.ts` contains the typed campus data.
* `src/assistant.ts` handles intent matching and structured retrieval.
* `src/components/` contains reusable interface components.
* `src/App.tsx` composes the views and manages local interaction state.

The architecture can be extended in the future to use an external data source or a server-side AI layer.

## 📚 Learning & Development

CampusConnect is a project I built while exploring web development and learning how to turn an idea into a working application.

I'm continuing to improve my programming fundamentals, understand the codebase, and develop my skills as a Computer Science student.

---

**Built as a campus-focused web development project.**
