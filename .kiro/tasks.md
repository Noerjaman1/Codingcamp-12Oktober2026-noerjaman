# Tasks — Todo List Life Dashboard

## Phase 1: Project Setup
- [x] Create folder structure (`css/`, `js/`, `.kiro/`)
- [x] Write `requirements.md`
- [x] Write `design.md`
- [x] Write `tasks.md`

## Phase 2: HTML Structure (`index.html`)
- [x] Base HTML5 boilerplate + meta tags
- [x] Link Google Fonts (Inter)
- [x] Link `css/style.css`
- [x] Header section: greeting, time, date, theme toggle
- [x] Focus Timer section: display, controls, settings
- [x] To-Do List section: input, task list, sort control
- [x] Quick Links section: link pills, add button
- [x] Modal for adding quick links
- [x] Modal for editing tasks
- [x] Defer `js/app.js` script

## Phase 3: CSS Styling (`css/style.css`)
- [x] CSS custom properties for both themes
- [x] Base reset and body styles
- [x] Header / greeting card styles
- [x] Timer card styles (large countdown, buttons)
- [x] Todo list card styles (task rows, checkbox, actions)
- [x] Quick links card styles (pill buttons)
- [x] Modal overlay styles
- [x] Responsive grid layout (desktop → mobile)
- [x] Animations: pulse on active timer, fade on theme toggle
- [x] Dark mode via `[data-theme="dark"]` on `<body>`

## Phase 4: JavaScript Logic (`js/app.js`)
- [x] Local Storage helpers (get / set / remove)
- [x] Theme toggle (light/dark) + persist
- [x] Custom username in greeting + persist
- [x] Live clock: update every second
- [x] Time-based greeting (Morning / Afternoon / Evening / Night)
- [x] Pomodoro timer: countdown logic, start/stop/reset
- [x] Custom Pomodoro duration + persist
- [x] Browser notification on timer end
- [x] To-Do: add task (with duplicate prevention)
- [x] To-Do: render task list from storage
- [x] To-Do: toggle done / edit / delete
- [x] To-Do: sort (default / A→Z / active first)
- [x] Quick Links: add link, render, delete
- [x] Quick Links: open link in new tab

## Phase 5: Polish & Verification
- [x] Test all features work end-to-end
- [x] Verify Local Storage persistence on page reload
- [x] Check responsive layout at 768px and below
- [x] Validate no JavaScript errors in console
- [x] Review code readability and comments
