// shared.js - Shared Controller for Buildicy AI Funnel Interactive Demo

// ─── Merge admin localStorage config over demoConfig.js ───────────────────
(function mergeAdminConfig() {
  try {
    const saved = localStorage.getItem('buildicy_admin_config');
    if (saved) {
      const adminCfg = JSON.parse(saved);
      function deepMerge(target, source) {
        for (const key of Object.keys(source)) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
        return target;
      }
      window.DEMO_CONFIG = deepMerge(window.DEMO_CONFIG || {}, adminCfg);
    }
    // Apply funnel-only live override (does NOT touch admin config)
    const overrideSaved = localStorage.getItem('buildicy_funnel_override');
    if (overrideSaved) {
      window.DEMO_CONFIG = Object.assign(window.DEMO_CONFIG || {}, JSON.parse(overrideSaved));
    }
  } catch(e) {}
})();

// Default Customer Data (From Demo Config)
function getDefaultStudent() {
  const cfg = window.DEMO_CONFIG || {};
  const lead = cfg.demoLead || {};
  return {
    name: lead.name || "Alex Morgan",
    phone: lead.phone || "9876543221",
    email: lead.email || "alex.morgan@company.com",
    country: lead.serviceInterest || "AI Funnel System",
    qualification: lead.scale || "Growth Stage ($500k+ ARR)",
    year: lead.timeline || "Immediate Kickoff",
    ielts: lead.readiness || "CRM & Workflow Ready",
    budget: lead.budget || "$10k – $25k",
    intake: lead.intake || "Next 30 Days",
    branch: lead.hub || cfg.location || "Global Remote Hub",
    selectedSlot: lead.defaultSlot || "Tomorrow, 3:00 PM"
  };
}

const DEFAULT_STUDENT = getDefaultStudent();

// Data persistence
function getStudentData() {
  try {
    const saved = localStorage.getItem('buildicy_lead_data');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return getDefaultStudent();
}

function saveStudentData(data) {
  try {
    const current = getStudentData();
    const updated = { ...current, ...data };
    localStorage.setItem('buildicy_lead_data', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return data;
  }
}

function resetStudentData() {
  try {
    localStorage.removeItem('buildicy_lead_data');
  } catch (e) {}
}

// Template String Interpolator
function interpolateConfig(template, vars) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
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

  const cfg = window.DEMO_CONFIG || {};
  const businessName = cfg.businessName || "Your Business";
  const teamMemberNoun = cfg.teamMemberNoun || "Counsellor";
  const serviceNoun = cfg.serviceNoun || "Counselling";

  const screens = [
    { num: 1, file: 'screen1.html', label: '1. Form' },
    { num: 2, file: 'screen2.html', label: '2. Welcome' },
    { num: 3, file: 'screen3.html', label: '3. AI Qualification' },
    { num: 4, file: 'screen4.html', label: '4. Booking' },
    { num: 5, file: 'screen5.html', label: `5. ${teamMemberNoun} Alert` },
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
                <span class="font-heading font-bold text-base text-darkNavy tracking-tight">${businessName}</span>
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

  // Inject Quick Preset Switcher Modal if not already present
  if (!document.getElementById('quickPresetModal')) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'quickPresetModal';
    modalDiv.className = 'hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4';
    modalDiv.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <i data-lucide="sliders-horizontal" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="font-bold text-sm text-darkNavy font-heading">Switch Business Category</h3>
              <p class="text-[11px] text-slate-500">Pick any industry to instantly rebrand the demo</p>
            </div>
          </div>
          <button type="button" onclick="closeQuickPresetModal()" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition font-bold text-xs">
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button type="button" onclick="selectQuickPreset('b2b_ai')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">⚡ Nexus AI Studio</div>
            <div class="text-[10px] text-slate-400">AI Agency & B2B SaaS</div>
          </button>

          <button type="button" onclick="selectQuickPreset('solar_energy')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">☀️ SolarPulse Dynamics</div>
            <div class="text-[10px] text-slate-400">CleanTech & Solar Panels</div>
          </button>

          <button type="button" onclick="selectQuickPreset('real_estate')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">🏠 Apex Luxury Realty</div>
            <div class="text-[10px] text-slate-400">Commercial & Real Estate</div>
          </button>

          <button type="button" onclick="selectQuickPreset('dental_clinic')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">🦷 Aura Dental & MedSpa</div>
            <div class="text-[10px] text-slate-400">Cosmetic & High-Ticket Clinic</div>
          </button>

          <button type="button" onclick="selectQuickPreset('wealth_advisory')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">💼 Vanguard Wealth</div>
            <div class="text-[10px] text-slate-400">Wealth & Tax Advisory</div>
          </button>

          <button type="button" onclick="selectQuickPreset('executive_fitness')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">🏋️ ProFit Performance</div>
            <div class="text-[10px] text-slate-400">Executive Health & Coaching</div>
          </button>

          <button type="button" onclick="selectQuickPreset('education_study_abroad')" class="p-3 text-left rounded-2xl border border-slate-200 hover:border-waGreen hover:bg-emerald-50/40 transition group sm:col-span-2">
            <div class="font-bold text-darkNavy group-hover:text-emerald-700">🎓 Team Overseas</div>
            <div class="text-[10px] text-slate-400">Study Abroad & University Admissions</div>
          </button>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button type="button" onclick="resetQuickPresetToDefault()" class="text-slate-500 hover:text-rose-600 font-semibold flex items-center gap-1 transition">
            <span>Reset to Factory Default</span>
          </button>
          <a href="admin.html" class="px-3 py-1.5 rounded-xl bg-darkNavy text-white hover:bg-navySurface font-bold flex items-center gap-1.5 transition">
            <span>Full Admin Settings</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Quick Preset Modal Handlers
function openQuickPresetModal() {
  playClickSound();
  const m = document.getElementById('quickPresetModal');
  if (m) {
    m.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeQuickPresetModal() {
  playClickSound();
  const m = document.getElementById('quickPresetModal');
  if (m) m.classList.add('hidden');
}

function resetQuickPresetToDefault() {
  playClickSound();
  localStorage.removeItem('buildicy_funnel_override');
  localStorage.removeItem('buildicy_lead_data');
  window.location.reload();
}

// Master Presets Definition for Quick Switcher
const QUICK_PRESETS = {
  b2b_ai: {
    businessName: "Nexus AI Studio",
    businessInitials: "NA",
    industry: "AI Growth Systems & Professional Services",
    customerNoun: "Client",
    teamMemberNoun: "Solutions Director",
    serviceNoun: "Strategy Session",
    bookingLabel: "Book Strategy Session",
    location: "Global Remote Hub",
    formTitle: "Free AI Funnel Assessment",
    formSubtitle: "Get an instant, customized diagnostic of your growth pipeline. Our AI qualifies your requirements in under 30 seconds and connects directly on WhatsApp.",
    formButtonText: "Generate My AI Funnel Plan",
    demoLead: {
      name: "Alex Morgan",
      phone: "9876543221",
      email: "alex.morgan@company.com",
      country: "⚡ AI Funnel System",
      qualification: "Growth Stage ($500k+ ARR)",
      budget: "$10k–$25k",
      ielts: "CRM & Workflow Ready",
      intake: "Next 30 Days",
      branch: "Global Remote Hub",
      defaultSlot: "Tomorrow, 3:00 PM"
    },
    appointmentOptions: {
      advisorName: "Sarah Jenkins",
      advisorTitle: "Senior Solutions Director",
      advisorBranch: "Global Architecture Team • 180+ Enterprise Funnels Deployed",
      defaultSlot: "Tomorrow, 3:00 PM"
    }
  },
  solar_energy: {
    businessName: "SolarPulse Dynamics",
    businessInitials: "SP",
    industry: "CleanTech & Residential Solar Installations",
    customerNoun: "Homeowner",
    teamMemberNoun: "Energy Consultant",
    serviceNoun: "Free Roof Audit",
    bookingLabel: "Schedule Free Roof & Solar Audit",
    location: "Regional CleanTech Hub",
    formTitle: "Instant Solar Savings Assessment",
    formSubtitle: "Discover how much you can save with zero-down solar panels and 30% federal clean energy rebates.",
    formButtonText: "Calculate Solar Savings",
    demoLead: {
      name: "Michael Chang",
      phone: "9872345671",
      email: "mchang@homeowner.net",
      country: "Full Grid-Tied Solar + Battery",
      qualification: "3,200 sq.ft Single Family ($280/mo Bill)",
      budget: "$25k–$40k",
      ielts: "Roof Inspection Ready",
      intake: "Immediate (Tax Year)",
      branch: "Regional CleanTech Hub",
      defaultSlot: "Tomorrow, 11:30 AM"
    },
    appointmentOptions: {
      advisorName: "Ryan Miller",
      advisorTitle: "Principal Energy Specialist",
      advisorBranch: "CleanTech Engineering Desk • 650+ Homes Converted",
      defaultSlot: "Tomorrow, 11:30 AM"
    }
  },
  real_estate: {
    businessName: "Apex Luxury Realty",
    businessInitials: "AR",
    industry: "Commercial Property & Luxury Residential",
    customerNoun: "Buyer",
    teamMemberNoun: "Property Advisor",
    serviceNoun: "Private Viewing",
    bookingLabel: "Book Private VIP Viewing",
    location: "Metropolitan Sales Desk",
    formTitle: "VIP Property Matching Consultation",
    formSubtitle: "Access off-market commercial and luxury residential properties tailored to your portfolio budget.",
    formButtonText: "Request VIP Property Dossier",
    demoLead: {
      name: "David Vance",
      phone: "9845123980",
      email: "d.vance@capitalgroup.com",
      country: "Commercial & Penthouse Tier",
      qualification: "Accredited Investor ($1M+ Liquidity)",
      budget: "$500k–$1.2M",
      ielts: "Pre-Approval Verified",
      intake: "Within 60 Days",
      branch: "Metropolitan Sales Desk",
      defaultSlot: "Tomorrow, 2:00 PM"
    },
    appointmentOptions: {
      advisorName: "Marcus Sterling",
      advisorTitle: "Senior Portfolio Director",
      advisorBranch: "Prime Real Estate Group • $240M+ In Transactions",
      defaultSlot: "Tomorrow, 2:00 PM"
    }
  },
  dental_clinic: {
    businessName: "Aura Aesthetic & Dental",
    businessInitials: "AD",
    industry: "High-Ticket Cosmetic & Implant Dentistry",
    customerNoun: "Patient",
    teamMemberNoun: "Treatment Coordinator",
    serviceNoun: "Smile Assessment",
    bookingLabel: "Book 3D Smile Assessment",
    location: "Beverly Hills Clinic",
    formTitle: "Free 3D Smile & Implant Assessment",
    formSubtitle: "Get an accurate digital treatment roadmap and financing breakdown directly from our senior clinicians.",
    formButtonText: "Claim Free 3D Scan",
    demoLead: {
      name: "Jessica Bennett",
      phone: "9812345678",
      email: "jess.bennett@outlook.com",
      country: "Full Arch Dental Implants",
      qualification: "Cosmetic Restoration Candidate",
      budget: "$4k–$8k",
      ielts: "CT Scan Eligible",
      intake: "This Month",
      branch: "Beverly Hills Clinic",
      defaultSlot: "Tomorrow, 4:00 PM"
    },
    appointmentOptions: {
      advisorName: "Dr. Rachel Simmons",
      advisorTitle: "Clinical Treatment Director",
      advisorBranch: "Cosmetic & Implant Center • 1,200+ Smile Restorations",
      defaultSlot: "Tomorrow, 4:00 PM"
    }
  },
  wealth_advisory: {
    businessName: "Vanguard Wealth Advisory",
    businessInitials: "VW",
    industry: "Private Wealth Management & Tax Advisory",
    customerNoun: "Client",
    teamMemberNoun: "Senior Wealth Partner",
    serviceNoun: "Portfolio Audit",
    bookingLabel: "Book Wealth & Tax Strategy Call",
    location: "Financial District Office",
    formTitle: "Complimentary Portfolio & Tax Diagnostic",
    formSubtitle: "Analyze high-yield passive income strategies, tax shielding, and fiduciary asset protection.",
    formButtonText: "Request Wealth Diagnostic",
    demoLead: {
      name: "Robert Henderson",
      phone: "9887766554",
      email: "r.henderson@privatewealth.org",
      country: "Tax Shield & Growth Portfolio",
      qualification: "Business Owner / High Net Worth",
      budget: "$100k+ Investable",
      ielts: "Financial Statements Ready",
      intake: "Q1 Allocation",
      branch: "Financial District Office",
      defaultSlot: "Tomorrow, 10:00 AM"
    },
    appointmentOptions: {
      advisorName: "Arthur King, CFA",
      advisorTitle: "Managing Wealth Partner",
      advisorBranch: "Fiduciary Wealth Group • $180M AUM",
      defaultSlot: "Tomorrow, 10:00 AM"
    }
  },
  education_study_abroad: {
    businessName: "Team Overseas",
    businessInitials: "TO",
    industry: "International Education & University Admissions",
    customerNoun: "Student",
    teamMemberNoun: "Counsellor",
    serviceNoun: "Counselling Session",
    bookingLabel: "Book Free Counselling Slot",
    location: "Coimbatore Hub",
    formTitle: "Free Eligibility & Visa Assessment",
    formSubtitle: "Check your university admission eligibility for UK, Canada, Australia and Germany with 0 consultancy fee.",
    formButtonText: "Check My Eligibility",
    demoLead: {
      name: "Arun Kumar",
      phone: "9876543221",
      email: "arun.kumar@gmail.com",
      country: "UK 🇬🇧",
      qualification: "B.Tech IT (2026 Batch)",
      budget: "₹15–20 Lakhs",
      ielts: "IELTS Waiver Eligible",
      intake: "Sept 2027",
      branch: "Coimbatore Hub",
      defaultSlot: "Tomorrow, 3:00 PM"
    },
    appointmentOptions: {
      advisorName: "Priya Ramanathan",
      advisorTitle: "Senior UK Advisor",
      advisorBranch: "International Admissions Desk • 180+ Visas Processed",
      defaultSlot: "Tomorrow, 3:00 PM"
    }
  },
  executive_fitness: {
    businessName: "ProFit Performance Lab",
    businessInitials: "PF",
    industry: "High-Performance Executive Health & Longevity",
    customerNoun: "Member",
    teamMemberNoun: "Head Coach",
    serviceNoun: "Fitness Assessment",
    bookingLabel: "Schedule 1-on-1 Performance Audit",
    location: "Executive Wellness Center",
    formTitle: "Executive Body & Metabolic Assessment",
    formSubtitle: "Tailored bio-individual nutrition, hormone balance, and concierge physical conditioning for executives.",
    formButtonText: "Claim Performance Audit",
    demoLead: {
      name: "Samantha Cole",
      phone: "9834567890",
      email: "sam.cole@techfirm.io",
      country: "Executive Longevity & Hypertrophy",
      qualification: "VP of Product (Sedentary / High Stress)",
      budget: "$5k–$10k",
      ielts: "Bloodwork Panel Available",
      intake: "Immediate Start",
      branch: "Executive Wellness Center",
      defaultSlot: "Tomorrow, 6:00 PM"
    },
    appointmentOptions: {
      advisorName: "Coach Eric Sterling",
      advisorTitle: "Performance & Longevity Director",
      advisorBranch: "Executive Coaching Desk • 340+ C-Suite Clients",
      defaultSlot: "Tomorrow, 6:00 PM"
    }
  }
};

function selectQuickPreset(presetKey) {
  playClickSound();
  const p = QUICK_PRESETS[presetKey];
  if (!p) return;

  // Write to funnel-only override key — does NOT touch buildicy_admin_config
  localStorage.setItem('buildicy_funnel_override', JSON.stringify(p));
  localStorage.setItem('buildicy_lead_data', JSON.stringify({
    name: p.demoLead.name,
    phone: p.demoLead.phone,
    email: p.demoLead.email,
    country: p.demoLead.country,
    qualification: p.demoLead.qualification,
    budget: p.demoLead.budget,
    ielts: p.demoLead.ielts,
    intake: p.demoLead.intake,
    branch: p.location,
    selectedSlot: p.demoLead.defaultSlot
  }));

  window.location.reload();
}
