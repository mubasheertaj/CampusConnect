# CampusConnect

Everything happening on campus, in one place. CampusConnect is a mobile-first hackathon prototype with a grounded, deterministic Campus Assistant, so its main demo works without any external APIs or credentials.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To create a production build, run `npm run build`.

## Demo path

1. Start on Home and review today’s feed.
2. Open Events, filter to Tech, and save the hackathon.
3. Ask the Assistant: “Are there any coding events this week?”
4. Ask: “Where is the robotics lab?” and follow the location result.
5. Visit Finds and submit a lost-item report.
6. Discover and join a club.

## Architecture

- `src/data.ts`: typed campus seed data
- `src/assistant.ts`: intent matching and constrained, structured retrieval
- `src/components/`: reusable cards, navigation, assistant, and details sheet
- `src/App.tsx`: view composition plus small, local interaction state

The app deliberately uses local data and local UI state for a robust demo. Replacing `data.ts` with API data, or adding a server-side LLM refinement layer after retrieval, can be done without changing the feature UI.
