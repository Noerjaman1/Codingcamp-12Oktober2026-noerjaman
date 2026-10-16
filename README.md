# 📋 Todo List Life Dashboard

A personal productivity dashboard built with pure HTML, CSS, and Vanilla JavaScript.  
No frameworks. No backend. All data lives in your browser's Local Storage.

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser.
3. No install, no build step, no server needed.

---

## ✨ Features

### MVP Features
| Feature | Description |
|---|---|
| **Greeting** | Time-based greeting (Morning / Afternoon / Evening / Night) with live clock and date |
| **Focus Timer** | 25-minute Pomodoro countdown with Start, Stop, Reset controls |
| **To-Do List** | Add, edit, complete, and delete tasks — saved in Local Storage |
| **Quick Links** | Pill buttons that open your favorite sites in a new tab — saved in Local Storage |

### Optional Features (3 chosen)
| Feature | Description |
|---|---|
| **Light / Dark Mode** | Toggle themes — preference saved between sessions |
| **Custom Name in Greeting** | Click ✏️ next to your name to personalise the greeting |
| **Change Pomodoro Time** | Set any duration from 1–120 minutes |

### Bonus
- **Prevent Duplicate Tasks** — adding the same task twice shows a warning
- **Sort Tasks** — Default order, A→Z, or Active First
- Browser notification when the focus timer ends

---

## 📁 Project Structure

```
project-root/
├── index.html          ← Single HTML page
├── css/
│   └── style.css       ← All styles (CSS custom properties for themes)
├── js/
│   └── app.js          ← All JavaScript logic
└── .kiro/
    ├── requirements.md ← Functional & technical requirements
    ├── design.md       ← Visual design spec & component guide
    └── tasks.md        ← Implementation task checklist
```

---

## 🛠 Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — no frameworks or libraries
- **Local Storage API** — client-side persistence

---

## 🌐 Browser Support

Chrome · Firefox · Edge · Safari (all modern versions)
