/* =============================================================
   Life Dashboard — app.js
   Vanilla JavaScript. No frameworks. All data in localStorage.
   ============================================================= */

'use strict';

/* ── 1. Local Storage Helpers ────────────────────────────────── */

const KEYS = {
  theme:    'dashboard_theme',
  username: 'dashboard_username',
  pomodoro: 'dashboard_pomodoro_minutes',
  todos:    'dashboard_todos',
  links:    'dashboard_links',
};

function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Generate a simple unique ID */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ── 2. Theme Toggle ─────────────────────────────────────────── */

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon      = document.getElementById('theme-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

(function initTheme() {
  const saved = lsGet(KEYS.theme, 'light');
  applyTheme(saved);
})();

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  lsSet(KEYS.theme, next);
});

/* ── 3. Greeting & Custom Username ───────────────────────────── */

const greetingText    = document.getElementById('greeting-text');
const usernameDisplay = document.getElementById('username-display');
const editNameBtn     = document.getElementById('edit-name-btn');
const nameEditor      = document.getElementById('name-editor');
const nameInput       = document.getElementById('name-input');
const saveNameBtn     = document.getElementById('save-name-btn');

/** Returns greeting phrase based on current hour */
function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good Morning,';
  if (hour >= 12 && hour < 17) return 'Good Afternoon,';
  if (hour >= 17 && hour < 21) return 'Good Evening,';
  return 'Good Night,';
}

function renderUsername() {
  const name = lsGet(KEYS.username, 'Friend');
  usernameDisplay.textContent = name;
}

(function initUsername() {
  renderUsername();
})();

editNameBtn.addEventListener('click', () => {
  nameEditor.classList.toggle('hidden');
  if (!nameEditor.classList.contains('hidden')) {
    nameInput.value = lsGet(KEYS.username, '');
    nameInput.focus();
  }
});

saveNameBtn.addEventListener('click', saveName);
nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveName(); });

function saveName() {
  const trimmed = nameInput.value.trim();
  if (trimmed) {
    lsSet(KEYS.username, trimmed);
    renderUsername();
    nameEditor.classList.add('hidden');
    showToast(`Hello, ${trimmed}! 👋`);
  }
}

/* ── 4. Live Clock ───────────────────────────────────────────── */

const clockEl       = document.getElementById('clock');
const dateDisplayEl = document.getElementById('date-display');

const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const s    = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}:${s}`;

  // Update greeting based on hour
  greetingText.textContent = getGreeting(now.getHours());

  // Format date string
  const dayName   = DAY_NAMES[now.getDay()];
  const monthName = MONTH_NAMES[now.getMonth()];
  const date      = now.getDate();
  const year      = now.getFullYear();
  dateDisplayEl.textContent = `${dayName}, ${monthName} ${date}, ${year}`;
}

updateClock();
setInterval(updateClock, 1000);

/* ── 5. Focus Timer (Pomodoro) ───────────────────────────────── */

const timerDisplay  = document.getElementById('timer-display');
const timerRing     = document.getElementById('timer-ring');
const timerStartBtn = document.getElementById('timer-start');
const timerStopBtn  = document.getElementById('timer-stop');
const timerResetBtn = document.getElementById('timer-reset');
const pomodoroInput = document.getElementById('pomodoro-input');
const pomodoroSetBtn= document.getElementById('pomodoro-set-btn');

let timerInterval   = null;
let timerRunning    = false;
let totalSeconds    = lsGet(KEYS.pomodoro, 25) * 60;
let remainingSeconds= totalSeconds;

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function setTimerState(running) {
  timerRunning = running;
  timerRing.classList.toggle('running', running);
  timerRing.classList.remove('finished');
  timerStartBtn.disabled = running;
  timerStopBtn.disabled  = !running;
}

// Initialise display
pomodoroInput.value = lsGet(KEYS.pomodoro, 25);
renderTimer();

timerStartBtn.addEventListener('click', () => {
  if (timerRunning || remainingSeconds <= 0) return;
  setTimerState(true);

  timerInterval = setInterval(() => {
    remainingSeconds--;
    renderTimer();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerRing.classList.remove('running');
      timerRing.classList.add('finished');
      timerStartBtn.disabled = false;
      timerStopBtn.disabled  = true;
      showToast('⏰ Time is up! Great focus session!');
      // Browser notification (if permitted)
      if (Notification.permission === 'granted') {
        new Notification('Life Dashboard', { body: '⏰ Focus session complete! Take a break.' });
      }
    }
  }, 1000);
});

timerStopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  setTimerState(false);
  timerStartBtn.disabled = false;
});

timerResetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  remainingSeconds = totalSeconds;
  setTimerState(false);
  timerRing.classList.remove('finished');
  timerStartBtn.disabled = false;
  renderTimer();
});

pomodoroSetBtn.addEventListener('click', () => {
  const mins = parseInt(pomodoroInput.value, 10);
  if (!mins || mins < 1 || mins > 120) {
    showToast('Please enter a value between 1 and 120 minutes.');
    return;
  }
  // Stop any running timer first
  clearInterval(timerInterval);
  totalSeconds     = mins * 60;
  remainingSeconds = totalSeconds;
  setTimerState(false);
  timerRing.classList.remove('finished');
  timerStartBtn.disabled = false;
  renderTimer();
  lsSet(KEYS.pomodoro, mins);
  showToast(`Timer set to ${mins} minute${mins > 1 ? 's' : ''} ⏱`);
});

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

/* ── 6. To-Do List ───────────────────────────────────────────── */

const todoInput   = document.getElementById('todo-input');
const todoAddBtn  = document.getElementById('todo-add-btn');
const todoListEl  = document.getElementById('todo-list');
const todoEmptyEl = document.getElementById('todo-empty');
const sortSelect  = document.getElementById('sort-select');

let todos = lsGet(KEYS.todos, []);

function saveTodos() { lsSet(KEYS.todos, todos); }

/** Return todos sorted according to the current sort option */
function getSortedTodos() {
  const mode = sortSelect.value;
  const copy = [...todos];
  if (mode === 'az') {
    copy.sort((a, b) => a.text.localeCompare(b.text));
  } else if (mode === 'active') {
    copy.sort((a, b) => Number(a.done) - Number(b.done));
  }
  // 'default' keeps insertion order (as stored)
  return copy;
}

function renderTodos() {
  todoListEl.innerHTML = '';
  const sorted = getSortedTodos();

  if (sorted.length === 0) {
    todoEmptyEl.classList.remove('hidden');
    return;
  }
  todoEmptyEl.classList.add('hidden');

  sorted.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.done ? ' done' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.done ? 'checked' : ''}
             aria-label="Mark task as ${todo.done ? 'undone' : 'done'}" />
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <div class="todo-actions">
        <button class="icon-btn edit-task-btn" title="Edit task" aria-label="Edit task">✏️</button>
        <button class="btn-danger delete-task-btn" title="Delete task" aria-label="Delete task">🗑</button>
      </div>
    `;

    // Checkbox toggle
    li.querySelector('.todo-checkbox').addEventListener('change', () => {
      const t = todos.find(x => x.id === todo.id);
      if (t) { t.done = !t.done; saveTodos(); renderTodos(); }
    });

    // Edit button
    li.querySelector('.edit-task-btn').addEventListener('click', () => {
      openTaskModal(todo.id, todo.text);
    });

    // Delete button
    li.querySelector('.delete-task-btn').addEventListener('click', () => {
      todos = todos.filter(x => x.id !== todo.id);
      saveTodos();
      renderTodos();
      showToast('Task deleted 🗑');
    });

    todoListEl.appendChild(li);
  });
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  // Prevent duplicate tasks (case-insensitive)
  const duplicate = todos.some(t => t.text.toLowerCase() === trimmed.toLowerCase());
  if (duplicate) {
    showToast('⚠️ That task already exists!');
    return;
  }

  todos.push({ id: uid(), text: trimmed, done: false, createdAt: Date.now() });
  saveTodos();
  renderTodos();
  todoInput.value = '';
  showToast('Task added ✅');
}

todoAddBtn.addEventListener('click', () => addTodo(todoInput.value));
todoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(todoInput.value); });
sortSelect.addEventListener('change', renderTodos);

renderTodos();

/* ── 7. Task Edit Modal ──────────────────────────────────────── */

const taskModal        = document.getElementById('task-modal');
const taskEditInput    = document.getElementById('task-edit-input');
const taskModalCancel  = document.getElementById('task-modal-cancel');
const taskModalSave    = document.getElementById('task-modal-save');
let   editingTaskId    = null;

function openTaskModal(id, currentText) {
  editingTaskId            = id;
  taskEditInput.value      = currentText;
  taskModal.classList.remove('hidden');
  taskEditInput.focus();
}

function closeTaskModal() {
  taskModal.classList.add('hidden');
  editingTaskId = null;
}

taskModalCancel.addEventListener('click', closeTaskModal);

taskModalSave.addEventListener('click', () => {
  const newText = taskEditInput.value.trim();
  if (!newText) return;

  // Prevent duplicate (ignore self)
  const duplicate = todos.some(t => t.id !== editingTaskId && t.text.toLowerCase() === newText.toLowerCase());
  if (duplicate) {
    showToast('⚠️ Another task with that name already exists!');
    return;
  }

  const t = todos.find(x => x.id === editingTaskId);
  if (t) { t.text = newText; saveTodos(); renderTodos(); }
  closeTaskModal();
  showToast('Task updated ✏️');
});

taskEditInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') taskModalSave.click(); });

// Close modal on overlay click
taskModal.addEventListener('click', (e) => { if (e.target === taskModal) closeTaskModal(); });

/* ── 8. Quick Links ──────────────────────────────────────────── */

const linksGrid    = document.getElementById('links-grid');
const linksEmptyEl = document.getElementById('links-empty');
const addLinkBtn   = document.getElementById('add-link-btn');

let links = lsGet(KEYS.links, getDefaultLinks());

function getDefaultLinks() {
  return [
    { id: uid(), name: 'Google',    url: 'https://google.com'    },
    { id: uid(), name: 'YouTube',   url: 'https://youtube.com'   },
    { id: uid(), name: 'GitHub',    url: 'https://github.com'    },
    { id: uid(), name: 'Wikipedia', url: 'https://wikipedia.org' },
  ];
}

function saveLinks() { lsSet(KEYS.links, links); }

function renderLinks() {
  linksGrid.innerHTML = '';

  if (links.length === 0) {
    linksEmptyEl.classList.remove('hidden');
    return;
  }
  linksEmptyEl.classList.add('hidden');

  links.forEach((link) => {
    // Wrapper div for the delete badge positioning
    const wrapper = document.createElement('div');
    wrapper.className = 'link-pill-wrapper';

    const a = document.createElement('a');
    a.className  = 'link-pill';
    a.href       = link.url;
    a.target     = '_blank';
    a.rel        = 'noopener noreferrer';
    a.textContent= link.name;
    a.title      = link.url;

    const delBtn = document.createElement('button');
    delBtn.className   = 'link-pill-delete';
    delBtn.textContent = '×';
    delBtn.title       = 'Remove link';
    delBtn.setAttribute('aria-label', `Remove ${link.name}`);

    delBtn.addEventListener('click', (e) => {
      e.preventDefault(); // don't navigate
      e.stopPropagation();
      links = links.filter(x => x.id !== link.id);
      saveLinks();
      renderLinks();
      showToast(`Removed "${link.name}" 🗑`);
    });

    wrapper.appendChild(a);
    wrapper.appendChild(delBtn);
    linksGrid.appendChild(wrapper);
  });
}

renderLinks();

/* ── 9. Add Link Modal ───────────────────────────────────────── */

const linkModal       = document.getElementById('link-modal');
const linkNameInput   = document.getElementById('link-name-input');
const linkUrlInput    = document.getElementById('link-url-input');
const linkModalCancel = document.getElementById('link-modal-cancel');
const linkModalSave   = document.getElementById('link-modal-save');

addLinkBtn.addEventListener('click', () => {
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  linkModal.classList.remove('hidden');
  linkNameInput.focus();
});

linkModalCancel.addEventListener('click', () => linkModal.classList.add('hidden'));

linkModalSave.addEventListener('click', () => {
  const name = linkNameInput.value.trim();
  let   url  = linkUrlInput.value.trim();

  if (!name || !url) {
    showToast('Please fill in both fields.');
    return;
  }

  // Auto-prepend https:// if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  // Basic URL validation
  try { new URL(url); } catch {
    showToast('Please enter a valid URL.');
    return;
  }

  links.push({ id: uid(), name, url });
  saveLinks();
  renderLinks();
  linkModal.classList.add('hidden');
  showToast(`Added "${name}" 🔗`);
});

linkUrlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') linkModalSave.click(); });
linkNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') linkUrlInput.focus(); });

// Close on overlay click
linkModal.addEventListener('click', (e) => { if (e.target === linkModal) linkModal.classList.add('hidden'); });

/* ── 10. Toast Notifications ─────────────────────────────────── */

const toastEl = document.getElementById('toast');
let   toastTimer = null;

function showToast(message, duration = 2500) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, duration);
}

/* ── 11. Utility: HTML Escape ────────────────────────────────── */

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
}

/* ── 12. Keyboard Accessibility ──────────────────────────────── */

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    linkModal.classList.add('hidden');
    closeTaskModal();
    nameEditor.classList.add('hidden');
  }
});
