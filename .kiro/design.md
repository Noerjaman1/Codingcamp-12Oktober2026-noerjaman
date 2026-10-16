# Design — Todo List Life Dashboard

## Overview

A single-page personal productivity dashboard built with plain HTML, CSS, and Vanilla JavaScript. Everything runs in the browser with no server dependency. All user data persists via the Local Storage API.

---

## Page Layout

```
┌─────────────────────────────────────────────────┐
│  HEADER: Greeting + Date/Time        [🌙 Toggle] │
├──────────────────┬──────────────────────────────┤
│                  │                               │
│  FOCUS TIMER     │        TO-DO LIST             │
│  ──────────────  │  ───────────────────────────  │
│  [  25:00  ]     │  [ Add task input... ] [+]    │
│  [▶] [⏹] [↺]   │  ☐ Task 1                     │
│  [⚙ Set time]   │  ☑ Task 2 (done)              │
│                  │  ☐ Task 3                     │
│                  │  [Sort ▾]                     │
├──────────────────┴──────────────────────────────┤
│  QUICK LINKS                                     │
│  [Google] [YouTube] [GitHub] [+] [...]          │
└─────────────────────────────────────────────────┘
```

Layout is **CSS Grid** on desktop, stacks to single column on mobile (≤ 768px).

---

## Color System

### Light Theme
| Token           | Value     | Usage                  |
|-----------------|-----------|------------------------|
| `--bg`          | `#f0f2f5` | Page background        |
| `--surface`     | `#ffffff` | Card background        |
| `--primary`     | `#6c63ff` | Accent / buttons       |
| `--primary-hover`| `#574fd6`| Button hover state     |
| `--text`        | `#1a1a2e` | Body text              |
| `--text-muted`  | `#6b7280` | Secondary text         |
| `--border`      | `#e5e7eb` | Card borders           |
| `--done-text`   | `#9ca3af` | Strikethrough task text|

### Dark Theme
| Token           | Value     |
|-----------------|-----------|
| `--bg`          | `#0f0f1a` |
| `--surface`     | `#1a1a2e` |
| `--primary`     | `#7c73ff` |
| `--primary-hover`| `#6c63ff`|
| `--text`        | `#e5e7eb` |
| `--text-muted`  | `#9ca3af` |
| `--border`      | `#2d2d44` |

---

## Typography
- Font family: `'Inter', sans-serif` (Google Fonts)
- Base size: `16px`
- Timer display: `4rem`, bold, monospace
- Section headings: `1.1rem`, semibold
- Task text: `1rem`

---

## Component Design

### Greeting Card
- Full-width header spanning the top
- Left: greeting string + user name (editable inline with a pencil icon)
- Center: current time (`HH:MM:SS`) updated every second
- Right: date string + theme toggle button

### Focus Timer Card
- Large countdown display (`MM:SS`)
- Three control buttons: Start ▶, Stop ⏹, Reset ↺
- A settings row with an input for custom minutes
- Animated ring or pulsing border when timer is running
- Alert / notification when timer hits 00:00

### To-Do List Card
- Input bar at top with an Add (+) button
- Each task row shows: checkbox, text, edit ✏ icon, delete 🗑 icon
- Completed tasks show strikethrough text
- Sort dropdown: Default (insertion order) | A→Z | Active first

### Quick Links Card
- Horizontal scrollable row of pill-shaped link buttons
- Each link opens in a new tab
- "Add Link" modal: name + URL inputs
- Hover reveals a small delete (×) badge on each pill

---

## Interaction States
- Buttons have `cursor: pointer` + hover color shift
- Inputs have focus ring using `--primary` color
- Cards have subtle `box-shadow`
- Transitions: `0.2s ease` on color/background changes
- Dark mode toggle animates with a smooth fade

---

## Local Storage Schema

```json
{
  "dashboard_theme": "dark",
  "dashboard_username": "Noerjaman",
  "dashboard_pomodoro_minutes": 25,
  "dashboard_todos": [
    { "id": "uuid", "text": "Buy groceries", "done": false, "createdAt": 1700000000000 }
  ],
  "dashboard_links": [
    { "id": "uuid", "name": "Google", "url": "https://google.com" }
  ]
}
```

---

## File Structure

```
project-root/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── .kiro/
    ├── requirements.md
    ├── design.md
    └── tasks.md
```
