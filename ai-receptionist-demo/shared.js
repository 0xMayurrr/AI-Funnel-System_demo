// shared.js - Shared Controller for Buildicy AI Receptionist Demo
// Product: Buildicy AI Receptionist — Interactive Demo

// Merge admin localStorage config over demoConfig.js
(function mergeAdminConfig() {
  try {
    // First apply admin config
    const adminSaved = localStorage.getItem('buildicy_admin_config');
    if (adminSaved) {
      const adminCfg = JSON.parse(adminSaved);
      function deepMerge(target, source) {
        for (const key of Object.keys(source)) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
          } else { target[key] = source[key]; }
        }
        return target;
      }
      window.DEMO_CONFIG = deepMerge(window.DEMO_CONFIG || {}, adminCfg);
    }
    // Then apply receptionist-only live override (does NOT touch admin config)
    const overrideSaved = localStorage.getItem('buildicy_receptionist_override');
    if (overrideSaved) {
      const overrideCfg = JSON.parse(overrideSaved);
      window.DEMO_CONFIG = Object.assign(window.DEMO_CONFIG || {}, overrideCfg);
    }
  } catch(e) {}
})();

// Default Patient Data
function getDefaultPatient() {
  const cfg = window.DEMO_CONFIG || {};
  const dp = cfg.demoPatient || {};
  return {
    name: dp.name || "Priya Sharma",
    phone: dp.phone || "9876543221",
    email: dp.email || "priya.sharma@example.com",
    serviceInterest: dp.serviceInterest || "Dental Cleaning & Checkup",
    preferredDate: dp.preferredDate || "Tomorrow",
    preferredTime: dp.preferredTime || "3:00 PM",
    selectedSlot: dp.defaultSlot || "Tomorrow, 3:00 PM",
    dentist: cfg.dentistName || "Dr. Aravind Swaminathan, MDS",
    clinic: cfg.businessName || "Bright Smile Dental Clinic",
    location: cfg.location || "Chennai",
    status: "Confirmed"
  };
}

// Data Persistence
function getPatientData() {
  try {
    const saved = localStorage.getItem('buildicy_receptionist_data');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return getDefaultPatient();
}

function savePatientData(data) {
  try {
    const current = getPatientData();
    const updated = { ...current, ...data };
    localStorage.setItem('buildicy_receptionist_data', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return data;
  }
}

function resetPatientData() {
  try {
    localStorage.removeItem('buildicy_receptionist_data');
  } catch (e) {}
}

// Template String Interpolator
function interpolateConfig(template, vars) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}

// Web Audio API Synthesizer
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
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (e) {}
}

function playPhoneRing() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.setValueAtTime(480, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
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
    gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

// Global Nav Bar Injection
function renderLoomNavbar(activeScreenNumber) {
  const navContainer = document.getElementById('loom-navbar-container');
  if (!navContainer) return;

  const cfg = window.DEMO_CONFIG || {};
  const businessName = cfg.businessName || "Bright Smile Dental Clinic";
  const customerNoun = cfg.customerNoun || "Patient";
  const serviceNoun = cfg.serviceNoun || "Appointment";

  const screens = [
    { num: 1, file: 'screen1.html', label: '1. Incoming Enquiry' },
    { num: 2, file: 'screen2.html', label: '2. AI Receptionist' },
    { num: 3, file: 'screen3.html', label: '3. Availability' },
    { num: 4, file: 'screen4.html', label: '4. Confirmation' },
    { num: 5, file: 'screen5.html', label: '5. Staff Alert' },
    { num: 6, file: 'screen6.html', label: '6. Dashboard' }
  ];

  const prevFile = activeScreenNumber > 1 ? `screen${activeScreenNumber - 1}.html` : null;
  const nextFile = activeScreenNumber < 6 ? `screen${activeScreenNumber + 1}.html` : null;

  navContainer.innerHTML = `
    <header class="glass-nav sticky top-0 z-50 border-b border-slate-200/90 shadow-sm bg-white/95">
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Brand & Product Title -->
        <div class="flex items-center space-x-3">
          <a href="../index.html" class="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs flex items-center gap-1 transition" title="Back to All 3 Demos">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">All Demos</span>
          </a>
          <a href="screen1.html" class="flex items-center space-x-2.5 group">
            <div class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shadow-xs text-emerald-800">
              <i data-lucide="phone-call" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-bold text-sm text-darkNavy tracking-tight">${businessName}</span>
                <span class="text-[9px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">AI Receptionist</span>
              </div>
              <p class="text-[10px] text-slate-500">Never miss a call or WhatsApp enquiry again</p>
            </div>
          </a>
        </div>

        <!-- 6 Screen Navigation Stepper -->
        <nav class="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
          ${screens.map(s => `
            <a href="${s.file}" class="step-nav-item px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${s.num === activeScreenNumber ? 'active' : 'text-slate-600 hover:text-darkNavy'} ${s.num < activeScreenNumber ? 'completed' : ''}">
              <span class="badge-num w-4 h-4 rounded-full ${s.num === activeScreenNumber ? 'bg-white text-emerald-900' : s.num < activeScreenNumber ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'} flex items-center justify-center text-[9px] font-bold">
                ${s.num < activeScreenNumber ? '✓' : s.num}
              </span>
              <span>${s.label}</span>
            </a>
            ${s.num < 6 ? `<span class="text-slate-300 text-[10px] px-0.5">›</span>` : ''}
          `).join('')}
        </nav>

        <!-- Presenter Action Controls -->
        <div class="flex items-center gap-2 text-xs">
          <!-- Reset Demo Button -->
          <button type="button" onclick="handleResetDemo()" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold flex items-center gap-1 transition" title="Reset Demo Data">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-slate-500"></i>
            <span class="hidden sm:inline">Reset Demo</span>
          </button>

          ${prevFile ? `
            <a href="${prevFile}" class="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm font-semibold flex items-center gap-1 transition">
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
              <span>Prev</span>
            </a>
          ` : ''}

          ${nextFile ? `
            <a href="${nextFile}" class="px-3.5 py-1.5 rounded-lg bg-darkNavy hover:bg-navySurface text-white shadow-sm font-semibold flex items-center gap-1.5 transition">
              <span>Next</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-waGreen"></i>
            </a>
          ` : `
            <a href="screen1.html" onclick="resetPatientData()" class="px-3.5 py-1.5 rounded-lg bg-darkNavy hover:bg-navySurface text-white shadow-sm font-semibold flex items-center gap-1.5 transition">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-waGreen"></i>
              <span>Replay</span>
            </a>
          `}
        </div>
      </div>
    </header>
  `;

  // Inject Quick Category Switcher Modal
  if (!document.getElementById('receptionistCategoryModal')) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'receptionistCategoryModal';
    modalDiv.className = 'hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4';
    modalDiv.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <i data-lucide="phone-call" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="font-bold text-sm text-darkNavy font-heading">Switch Receptionist Industry</h3>
              <p class="text-[11px] text-slate-500">Rebrand front desk demo for any business in 1 click</p>
            </div>
          </div>
          <button type="button" onclick="closeReceptionistCategoryModal()" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition font-bold text-xs">
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button type="button" onclick="selectReceptionistPreset('dental')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">🦷 Bright Smile Dental</div>
            <div class="text-[10px] text-slate-400">Dental & Oral Surgery Clinic</div>
          </button>

          <button type="button" onclick="selectReceptionistPreset('medspa')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">✨ Aura Aesthetic MedSpa</div>
            <div class="text-[10px] text-slate-400">Dermatology & Laser Clinic</div>
          </button>

          <button type="button" onclick="selectReceptionistPreset('veterinary')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">🐾 Paws & Claws Pet Hospital</div>
            <div class="text-[10px] text-slate-400">Veterinary & Pet Care</div>
          </button>

          <button type="button" onclick="selectReceptionistPreset('lawfirm')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">⚖️ Sterling Legal Partners</div>
            <div class="text-[10px] text-slate-400">Law Firm Consultation</div>
          </button>

          <button type="button" onclick="selectReceptionistPreset('autorepair')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">🚗 Apex Auto Care & Service</div>
            <div class="text-[10px] text-slate-400">Car Service & Diagnostic</div>
          </button>

          <button type="button" onclick="selectReceptionistPreset('salon')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-800">💇 Glow Luxury Salon & Spa</div>
            <div class="text-[10px] text-slate-400">Hair & Beauty Styling</div>
          </button>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button type="button" onclick="resetReceptionistToDefault()" class="text-slate-500 hover:text-rose-600 font-semibold flex items-center gap-1 transition">
            <span>Reset to Dental Default</span>
          </button>
          <a href="../ai funnel system/AI-Funnel-System_demo/admin/index.html" class="px-3 py-1.5 rounded-xl bg-darkNavy text-white hover:bg-navySurface font-bold flex items-center gap-1.5 transition">
            <span>Full Admin Settings</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function handleResetDemo() {
  playClickSound();
  resetPatientData();
  window.location.href = 'screen1.html';
}

function openReceptionistCategoryModal() {
  playClickSound();
  const m = document.getElementById('receptionistCategoryModal');
  if (m) {
    m.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeReceptionistCategoryModal() {
  playClickSound();
  const m = document.getElementById('receptionistCategoryModal');
  if (m) m.classList.add('hidden');
}

function resetReceptionistToDefault() {
  playClickSound();
  localStorage.removeItem('buildicy_receptionist_override');
  localStorage.removeItem('buildicy_receptionist_data');
  window.location.reload();
}

// Master Receptionist Presets
const RECEPTIONIST_PRESETS = {
  dental: {
    businessName: "Bright Smile Dental Clinic",
    businessInitials: "BS",
    industry: "Healthcare / Dental Clinic",
    customerNoun: "Patient",
    teamMemberNoun: "Receptionist",
    serviceNoun: "Appointment",
    bookingLabel: "Book Appointment",
    location: "Chennai",
    brandColor: "#0B7A4B",
    dentistName: "Dr. Aravind Swaminathan, MDS",
    demoPatient: {
      name: "Priya Sharma",
      phone: "9876543221",
      email: "priya.sharma@example.com",
      serviceInterest: "Dental Cleaning & Checkup",
      defaultSlot: "Tomorrow, 3:00 PM"
    }
  },
  medspa: {
    businessName: "Aura Aesthetic MedSpa",
    businessInitials: "AA",
    industry: "Dermatology & Aesthetic Clinic",
    customerNoun: "Client",
    teamMemberNoun: "Front Desk Coordinator",
    serviceNoun: "Consultation",
    bookingLabel: "Book Skin Consultation",
    location: "Mumbai",
    brandColor: "#9333EA",
    dentistName: "Dr. Meera Nambiar, MD Skin",
    demoPatient: {
      name: "Ananya Roy",
      phone: "9823456789",
      email: "ananya.roy@example.com",
      serviceInterest: "HydraFacial & Skin Rejuvenation",
      defaultSlot: "Tomorrow, 4:00 PM"
    }
  },
  veterinary: {
    businessName: "Paws & Claws Pet Hospital",
    businessInitials: "PC",
    industry: "Veterinary & Animal Healthcare",
    customerNoun: "Pet Parent",
    teamMemberNoun: "Clinic Receptionist",
    serviceNoun: "Vet Checkup",
    bookingLabel: "Book Vet Appointment",
    location: "Bangalore",
    brandColor: "#0284C7",
    dentistName: "Dr. Rajesh Kulkarni, BVSc",
    demoPatient: {
      name: "Rohan Patel (for Milo 🐕)",
      phone: "9845123980",
      email: "rohan.p@example.com",
      serviceInterest: "Annual Vaccination & Wellness Exam",
      defaultSlot: "Tomorrow, 11:00 AM"
    }
  },
  lawfirm: {
    businessName: "Sterling Legal Partners",
    businessInitials: "SL",
    industry: "Legal & Corporate Practice",
    customerNoun: "Client",
    teamMemberNoun: "Legal Intake Specialist",
    serviceNoun: "Case Consultation",
    bookingLabel: "Schedule Legal Consultation",
    location: "New Delhi",
    brandColor: "#1E3A8A",
    dentistName: "Advocate Vikramaditya Sen",
    demoPatient: {
      name: "Karan Malhotra",
      phone: "9811223344",
      email: "karan.m@business.in",
      serviceInterest: "Corporate Agreement & IP Scoping",
      defaultSlot: "Tomorrow, 2:30 PM"
    }
  },
  autorepair: {
    businessName: "Apex Auto Care & Service",
    businessInitials: "AC",
    industry: "Automotive Service & Repair",
    customerNoun: "Vehicle Owner",
    teamMemberNoun: "Service Advisor",
    serviceNoun: "Service Booking",
    bookingLabel: "Book Car Service Slot",
    location: "Pune",
    brandColor: "#DC2626",
    dentistName: "Chief Service Engineer Ramesh",
    demoPatient: {
      name: "Siddharth Joshi",
      phone: "9898765432",
      email: "sid.joshi@example.com",
      serviceInterest: "Comprehensive Periodic Service & Brake Check",
      defaultSlot: "Tomorrow, 10:00 AM"
    }
  },
  salon: {
    businessName: "Glow Luxury Salon & Spa",
    businessInitials: "GL",
    industry: "Beauty & Wellness Salon",
    customerNoun: "Guest",
    teamMemberNoun: "Salon Host",
    serviceNoun: "Styling Session",
    bookingLabel: "Reserve Styling Slot",
    location: "Hyderabad",
    brandColor: "#D97706",
    dentistName: "Creative Director Natasha",
    demoPatient: {
      name: "Divya Krishnan",
      phone: "9871122334",
      email: "divya.k@example.com",
      serviceInterest: "Keratin Treatment & Balayage Styling",
      defaultSlot: "Tomorrow, 5:00 PM"
    }
  }
};

function selectReceptionistPreset(key) {
  playClickSound();
  const p = RECEPTIONIST_PRESETS[key];
  if (!p) return;

  // Write to override key only — does NOT touch buildicy_admin_config
  localStorage.setItem('buildicy_receptionist_override', JSON.stringify(p));
  localStorage.setItem('buildicy_receptionist_data', JSON.stringify({
    name: p.demoPatient.name,
    phone: p.demoPatient.phone,
    email: p.demoPatient.email,
    serviceInterest: p.demoPatient.serviceInterest,
    selectedSlot: p.demoPatient.defaultSlot,
    dentist: p.dentistName,
    clinic: p.businessName,
    location: p.location,
    status: "Confirmed"
  }));

  window.location.reload();
}

