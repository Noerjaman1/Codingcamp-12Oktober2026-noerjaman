# Requirements — Todo List Life Dashboard

## Technical Constraints

### TC-1: Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript (no frameworks like React, Vue, etc.)
- No backend server required

### TC-2: Data Storage
- Use browser Local Storage API
- All data stored client-side only

### TC-3: Browser Compatibility
- Must work in modern browsers (Chrome, Firefox, Edge, Safari)
- Can be used as standalone web app or browser extension

---

## Non-Functional Requirements

### NFR-1: Simplicity
- Clean, minimal interface
- Easy to understand and use
- No complex setup required
- No test setup required

### NFR-2: Performance
- Fast load time
- Responsive UI interactions
- No noticeable lag when updating data

### NFR-3: Visual Design
- User-friendly aesthetic
- Clear visual hierarchy
- Readable typography

---

## Functional Requirements (MVP)

### FR-1: Greeting
- Show current time and date
- Show a greeting based on the time of day (Good Morning / Afternoon / Evening / Night)

### FR-2: Focus Timer (Pomodoro)
- 25-minute countdown timer (default)
- Start, Stop, and Reset buttons
- Visual feedback when timer runs out

### FR-3: To-Do List
- Add tasks
- Edit existing tasks
- Mark tasks as done (toggle)
- Delete tasks
- Save all tasks using Local Storage

### FR-4: Quick Links
- Buttons that open favorite websites in a new tab
- Add new links with a name and URL
- Links saved in Local Storage
- Delete links

---

## Optional Features (3 of 5 chosen)

### OPT-1: Light / Dark Mode ✅
- Toggle between light and dark themes
- Preference saved in Local Storage

### OPT-2: Custom Name in Greeting ✅
- User can input their name
- Name displayed in the greeting message
- Saved in Local Storage

### OPT-3: Change Pomodoro Time ✅
- User can customize the timer duration (minutes)
- Setting saved in Local Storage

---

## Folder Rules
- One CSS file inside `css/`
- One JavaScript file inside `js/`
- Code must be clean and readable
