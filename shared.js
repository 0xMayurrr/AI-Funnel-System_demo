// shared.js - Shared Controller for Team Overseas Simulation Prototype

// Default Student Data (From Build Guide)
const DEFAULT_STUDENT = {
  name: "Arun Kumar",
  phone: "9876543221",
  email: "arun.kumar@gmail.com",
  country: "UK",
  qualification: "B.Tech IT",
  year: "2026",
  ielts: "Not taken",
  budget: "₹15–20 lakhs",
  intake: "September 2027",
  branch: "Coimbatore",
  selectedSlot: "Tomorrow, 3:00 PM"
};

// Data persistence
function getStudentData() {
  try {
    const saved = localStorage.getItem('teamOverseas_student');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { ...DEFAULT_STUDENT };
}

function saveStudentData(data) {
  try {
    const current = getStudentData();
    const updated = { ...current, ...data };
    localStorage.setItem('teamOverseas_student', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return data;
  }
}

function resetStudentData() {
  try {
    localStorage.removeItem('teamOverseas_student');
  } catch (e) {}
}

// Web Audio API Sound Generator
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playWhatsAppTone() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(820, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (e) {}
}

function playClickSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

// Global Nav Bar Injection with Official Buildicy Logo
function renderLoomNavbar(activeScreenNumber) {
  const navContainer = document.getElementById('loom-navbar-container');
  if (!navContainer) return;

  const screens = [
    { num: 1, file: 'screen1.html', label: '1. Form' },
    { num: 2, file: 'screen2.html', label: '2. Welcome' },
    { num: 3, file: 'screen3.html', label: '3. AI Qualification' },
    { num: 4, file: 'screen4.html', label: '4. Booking' },
    { num: 5, file: 'screen5.html', label: '5. Counsellor Alert' },
    { num: 6, file: 'screen6.html', label: '6. Dashboard' }
  ];

  const prevFile = activeScreenNumber > 1 ? `screen${activeScreenNumber - 1}.html` : null;
  const nextFile = activeScreenNumber < 6 ? `screen${activeScreenNumber + 1}.html` : null;

  navContainer.innerHTML = `
    <!-- Top Modern Presenter Header -->
    <header class="glass-nav sticky top-0 z-50 border-b border-slate-200/90 shadow-sm bg-white/95">
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Brand & Official Buildicy Logo -->
        <div class="flex items-center space-x-3">
          <a href="screen1.html" class="flex items-center space-x-2.5 group">
            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img src="buildicy_logo_icon.png" class="w-8 h-8 object-contain" alt="Buildicy Logo">
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-bold text-base text-darkNavy tracking-tight">Team Overseas</span>
                <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">AI Funnel</span>
              </div>
              <p class="text-[10px] text-slate-500">Built by <strong class="text-blue-700">Buildicy</strong> • AI Growth Systems</p>
            </div>
          </a>
        </div>

        <!-- 6 Screen Navigation Stepper -->
        <nav class="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
          ${screens.map(s => `
            <a href="${s.file}" class="step-nav-item px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${s.num === activeScreenNumber ? 'active' : 'text-slate-600 hover:text-darkNavy'} ${s.num < activeScreenNumber ? 'completed' : ''}">
              <span class="badge-num w-4 h-4 rounded-full ${s.num === activeScreenNumber ? 'bg-waGreen text-darkNavy' : s.num < activeScreenNumber ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'} flex items-center justify-center text-[9px] font-bold">
                ${s.num < activeScreenNumber ? '✓' : s.num}
              </span>
              <span>${s.label}</span>
            </a>
            ${s.num < 6 ? `<span class="text-slate-300 text-[10px] px-0.5">›</span>` : ''}
          `).join('')}
        </nav>

        <!-- Presenter Action Controls -->
        <div class="flex items-center gap-2 text-xs">
          ${prevFile ? `
            <a href="${prevFile}" class="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm font-semibold flex items-center gap-1 transition">
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
              <span>Prev</span>
            </a>
          ` : ''}

          ${nextFile ? `
            <a href="${nextFile}" class="px-3.5 py-1.5 rounded-lg bg-darkNavy hover:bg-navy-surface text-white shadow-sm font-semibold flex items-center gap-1.5 transition">
              <span>Next</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-waGreen"></i>
            </a>
          ` : `
            <a href="screen1.html" onclick="resetStudentData()" class="px-3.5 py-1.5 rounded-lg bg-darkNavy hover:bg-navy-surface text-white shadow-sm font-semibold flex items-center gap-1.5 transition">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-waGreen"></i>
              <span>Restart</span>
            </a>
          `}
        </div>
      </div>
    </header>
  `;

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}
