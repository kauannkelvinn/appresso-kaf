# Appresso Kaf 

A personal life operating system powered by Artificial Intelligence and WhatsApp automation. Inspired by the Neo-Brutalist aesthetic of Slava Design, this project embraces "raw performance" and radical simplicity.

---

## Current Features

*   **WhatsApp Webhook:** Instant logging of habits and tasks via text messages (e.g., "drink water", "training today").
*   **AI Command Center:** Intelligent processing using Gemini 1.5 to extract user intent from informal messages and convert them into structured data.
*   **Habit Tracker:** Interactive habit grid featuring daily consistency visualization and percentage-based progress tracking.
*   **Activity Evolution:** Minimalist real-time productivity graph integrated directly with the Prisma/Supabase database.
*   **Hero Stats:** Dramatic visualization of Key Performance Indicators (KPIs) such as *Tasks Created*, *Time Saved*, and *Habit Score* using high-impact typography.

---

## Tech Stack

*   **Frontend:** Next.js 15 (App Router) + Tailwind CSS
*   **Backend:** Server Actions + Route Handlers (Webhooks)
*   **Database:** PostgreSQL via Supabase + Prisma ORM
*   **AI:** Google Gemini API
*   **Infrastructure:** Vercel for continuous deployment and environment variable synchronization

---

## Design Principles (V2)

Currently undergoing a redesign phase to achieve a level of visual excellence based on the Slava Design style:

*   **Typography:** KH Teka Trial (Bold/Black) with sizes up to 80px for immediate visual impact.
*   **Bento Grid:** Asymmetrical organization of cards featuring solid borders (`stroke 14%`) and rounded corners (`radius 18`).
*   **Color Palette:**
    *   **Background:** `#B8ACA9` (Neutral Gray)
    *   **Cards:** `#C6BFB7` (Normal Card) & `#F83100` (Alert/Red Card)
    *   **Text:** `#000000` (Absolute Black) & `#7F7C77` (Subtitles/Medium opacity)

---

## Design Roadmap

- [x] **01. Global Dashboard** — 360º View of Life, Training, and Finances.
- [ ] **02. Deep Focus (Habits)** — Daily execution, consistency, and streaks.
- [ ] **03. Performance (Training/Diet)** — Logbook for weights and macro counting via photo.
- [ ] **04. Wealth (Finances)** — Cash flow management and investment organization.

---

## Getting Started Locally

Follow these steps to run the project on your local machine.

**1. Clone the repository:**
\`\`\`bash
git clone https://github.com/kauannkelvinn/appresso-kaf.git
\`\`\`

**2. Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**3. Configure environment variables:** 
Create a `.env` file in the root directory and add the following keys:
\`\`\`env
DATABASE_URL=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=
GOOGLE_GENERATIVE_AI_API_KEY=
\`\`\`

**4. Run Prisma migrations:**
\`\`\`bash
npx prisma migrate dev
\`\`\`

**5. Start the development server:**
\`\`\`bash
npm run dev
\`\`\`
