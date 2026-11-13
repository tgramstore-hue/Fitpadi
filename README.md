# 🏋️ FitPadi — Full-Stack Fitness Web App

FitPadi is a health, fitness, and wellness web application built with **Next.js 16 (App Router)**. It features daily missions, guided programmes, evidence-based health education, community challenges, a looping workout video library, and reward distributions from the FitPadi Health Fund.

> Converted from a single-page HTML design into a **full multi-page Next.js application** with 31 routes.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (accessible on local network)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🗺️ Application Routes (31 total)

### 🌐 Public Marketing & Education Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, stats, Health Fund feature, blog highlights |
| `/programmes` | Catalog of 9 multi-week health programmes with filters |
| `/academy` | Evidence-based health courses with learning tracks |
| `/impact` | FitPadi Health Fund transparency page with live pool metrics |
| `/blog` | Health & fitness blog with search and category filters |
| `/blog/[slug]` | Individual article with Key Takeaways, ToC, author bio |
| `/about` | Mission statement and story behind FitPadi |
| `/contact` | Contact form with support channels |
| `/privacy` | Privacy Policy and data rights |
| `/terms` | Terms of Service |
| `/disclaimer` | Medical, fitness, and advertising disclaimer |

### 💪 Workout Library
| Route | Description |
|-------|-------------|
| `/workout` | Exercise library with looping `.mp4` animation guides, Previous/Next navigation, exercise selector, difficulty badges, and duration timers |

### 🔐 Authentication & Onboarding
| Route | Description |
|-------|-------------|
| `/login` | Sign in with password visibility toggle |
| `/signup` | Account creation with country selector |
| `/forgot` | Password recovery |
| `/verify` | 6-digit email confirmation with resend timer |
| `/setup` | 2-step onboarding wizard — goals, fitness level, daily time |

### 📱 In-App Dashboard (`/app/*`)
| Route | Description |
|-------|-------------|
| `/app` | Dashboard — KPIs, weekly activity chart, daily missions, leaderboard |
| `/app/programmes` | In-app programmes catalog |
| `/app/programmes/[id]` | Programme detail with weekly syllabus & lesson checklist |
| `/app/activities` | Walking history, step summary, 8-movement exercise library |
| `/app/workouts` | Routine builder with Workout Session Player (countdown, progress, audio chimes) |
| `/app/nutrition` | Hydration tracker, macro breakdown, meal logger |
| `/app/challenges` | Community challenges with progress tracking |
| `/app/academy` | In-app health courses |
| `/app/academy/[id]` | Interactive course with quiz and reward points |
| `/app/rewards` | Health Fund wallet, earnings, cash-out modal |
| `/app/referrals` | Referral link sharing and commission tracking |
| `/app/progress` | Analytics, streak badges, milestone achievements |
| `/app/notifications` | Notifications center with category filters |
| `/app/settings` | Theme, audio, units, data export, account deletion |
| `/app/profile` | User profile, tier badge, quick stats |

---

## 🎨 Design System

| Feature | Detail |
|---------|--------|
| **Typography** | Outfit (Google Fonts) · clamp-based responsive scale |
| **Theming** | Full Light / Dark mode via CSS custom properties |
| **Icons** | Built-in SVG catalog with 36+ custom icons |
| **State** | React Context (`AppContext`) — streaks, points, hydration, missions, theme |
| **Styling** | Custom CSS design system in `globals.css` · no Tailwind on existing pages |

---

## 🎬 Adding Workout Videos

Upload `.mp4` animation files to:

```
public/workouts/
```

| Exercise | Filename |
|----------|----------|
| Push-Ups | `push-ups.mp4` |
| Squats | `squats.mp4` |
| Plank | `plank.mp4` |
| Lunges | `lunges.mp4` |
| Jumping Jacks | `jumping-jacks.mp4` |
| Mountain Climbers | `mountain-climbers.mp4` |
| Burpees | `burpees.mp4` |
| Glute Bridges | `glute-bridges.mp4` |
| Bicycle Crunches | `bicycle-crunches.mp4` |
| High Knees | `high-knees.mp4` |

> `.mp4` files are excluded from git via `.gitignore`. Upload them separately to your hosting provider's static assets or a CDN.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.jsx        # Root layout (Header, Footer, AppProvider)
│   ├── page.jsx          # Homepage
│   ├── workout/
│   │   └── page.tsx      # Workout video library page
│   └── app/              # In-app dashboard routes
├── components/           # Shared React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── WorkoutPlayer.tsx # Looping video player component
│   └── ...
├── data/                 # Static data & content
│   ├── appData.js
│   ├── workouts.ts       # WorkoutExercise interface + WORKOUT_LIBRARY
│   └── ...
└── context/              # React Context providers
public/
├── workouts/             # Place .mp4 video files here
└── ...
```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** JavaScript (JSX) + TypeScript (TSX) for new modules
- **React:** 19.3
- **Styling:** Custom CSS design system (no framework dependency)
- **Font:** Outfit via Google Fonts

---

## 📄 License

© 2026 FitPadi. All rights reserved.
