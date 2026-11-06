// shared.js - Shared Controller for Buildicy AI Automation Demo
// Product: Buildicy AI Automation — Interactive Demo

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
    // Then apply automation-only live override (does NOT touch admin config)
    const overrideSaved = localStorage.getItem('buildicy_automation_override');
    if (overrideSaved) {
      const overrideCfg = JSON.parse(overrideSaved);
      window.DEMO_CONFIG = Object.assign(window.DEMO_CONFIG || {}, overrideCfg);
    }
  } catch(e) {}
})();

// Default Automation Data State
function getDefaultAutomation() {
  const cfg = window.DEMO_CONFIG || {};
  const inv = cfg.sampleInvoice || {};
  return {
    invoiceNumber: inv.invoiceNumber || "INV-2043",
    vendorName: inv.vendorName || "Apex Shipping & Freight Ltd.",
    amount: inv.amount || "₹45,000",
    totalAmount: inv.totalAmount || "₹53,100",
    poNumber: inv.poNumber || "PO-2026-891",
    status: inv.status || "Approved",
    assignedTo: inv.assignedTo || "Finance Team",
    processedTimestamp: "Today, 10:15 AM",
    timeElapsedSeconds: 20
  };
}

// Data Persistence
function getAutomationData() {
  try {
    const saved = localStorage.getItem('buildicy_automation_data');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return getDefaultAutomation();
}

function saveAutomationData(data) {
  try {
    const current = getAutomationData();
    const updated = { ...current, ...data };
    localStorage.setItem('buildicy_automation_data', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return data;
  }
}

function resetAutomationData() {
  try {
    localStorage.removeItem('buildicy_automation_data');
  } catch (e) {}
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

function playScanTone() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch(e) {}
}

function playSuccessChime() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  } catch(e) {}
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
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch(e) {}
}

// Global Nav Bar Injection
function renderLoomNavbar(activeScreenNumber) {
  const navContainer = document.getElementById('loom-navbar-container');
  if (!navContainer) return;

  const cfg = window.DEMO_CONFIG || {};
  const businessName = cfg.businessName || "Nexa Logistics";

  const screens = [
    { num: 1, file: 'screen1.html', label: '1. Trigger Event' },
    { num: 2, file: 'screen2.html', label: '2. AI Processes Task' },
    { num: 3, file: 'screen3.html', label: '3. Data Updated' },
    { num: 4, file: 'screen4.html', label: '4. Notification' },
    { num: 5, file: 'screen5.html', label: '5. Automation Log' },
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
            <div class="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 p-1 flex items-center justify-center shadow-xs text-blue-900">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-bold text-sm text-darkNavy tracking-tight">${businessName}</span>
                <span class="text-[9px] bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded-full border border-blue-200">AI Automation</span>
              </div>
              <p class="text-[10px] text-slate-500">Automate repetitive back-office work and save hours</p>
            </div>
          </a>
        </div>

        <!-- 6 Screen Stepper -->
        <nav class="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
          ${screens.map(s => `
            <a href="${s.file}" class="step-nav-item px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${s.num === activeScreenNumber ? 'active bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-darkNavy'} ${s.num < activeScreenNumber ? 'text-blue-900 font-semibold' : ''}">
              <span class="badge-num w-4 h-4 rounded-full ${s.num === activeScreenNumber ? 'bg-white text-blue-950 font-bold' : s.num < activeScreenNumber ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-700'} flex items-center justify-center text-[9px] font-bold">
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
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </a>
          ` : ''}
        </div>

      </div>
    </header>
  `;

  injectAutomationCategoryModal();
  if (window.lucide) lucide.createIcons();
}

function handleResetDemo() {
  playClickSound();
  resetAutomationData();
  window.location.href = 'screen1.html';
}

// Category Switcher Modal
function injectAutomationCategoryModal() {
  if (document.getElementById('automationCategoryModal')) return;

  const modal = document.createElement('div');
  modal.id = 'automationCategoryModal';
  modal.className = 'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 hidden';

  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
            <i data-lucide="cpu" class="w-4 h-4"></i>
          </div>
          <div>
            <h3 class="font-bold font-heading text-darkNavy text-base">Select Automation Workflow Preset</h3>
            <p class="text-xs text-slate-500">Instantly switch between business back-office workflows</p>
          </div>
        </div>
        <button onclick="closeAutomationCategoryModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        
        <button type="button" onclick="selectAutomationPreset('logistics')" class="p-3.5 rounded-2xl border border-blue-500 bg-blue-50 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>🚛</span> Nexa Logistics
          </div>
          <div class="text-[11px] text-blue-900 font-semibold mt-0.5">Freight & Inbound AP Invoicing</div>
          <p class="text-[10px] text-slate-500 mt-1">Invoice INV-2043 • Apex Shipping • ₹45,000</p>
        </button>

        <button type="button" onclick="selectAutomationPreset('invoicing')" class="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>💳</span> Apex Global Accounts
          </div>
          <div class="text-[11px] text-slate-700 font-semibold mt-0.5">Vendor Invoice 3-Way Match</div>
          <p class="text-[10px] text-slate-500 mt-1">Invoice INV-5510 • CloudServe • ₹82,400</p>
        </button>

        <button type="button" onclick="selectAutomationPreset('ecommerce')" class="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>📦</span> SwiftCart Fulfillment
          </div>
          <div class="text-[11px] text-slate-700 font-semibold mt-0.5">E-Commerce Return & Restocking</div>
          <p class="text-[10px] text-slate-500 mt-1">RMA-4421 • Refund QC & ERP Inventory update</p>
        </button>

        <button type="button" onclick="selectAutomationPreset('hronboarding')" class="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>👥</span> TalentHub HR
          </div>
          <div class="text-[11px] text-slate-700 font-semibold mt-0.5">Employee Document KYC & IT Setup</div>
          <p class="text-[10px] text-slate-500 mt-1">Candidate Rahul S. • Aadhar/PAN verified & Slack invited</p>
        </button>

        <button type="button" onclick="selectAutomationPreset('crmleads')" class="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>🎯</span> GrowthScale CRM
          </div>
          <div class="text-[11px] text-slate-700 font-semibold mt-0.5">Inbound RFP Score & Lead Routing</div>
          <p class="text-[10px] text-slate-500 mt-1">Enterprise Lead • ₹15L deal size • Auto-assigned to VP</p>
        </button>

        <button type="button" onclick="selectAutomationPreset('legal')" class="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 text-left hover:shadow-sm transition">
          <div class="flex items-center gap-2 font-bold text-darkNavy text-sm">
            <span>⚖️</span> Lexis Corporate Law
          </div>
          <div class="text-[11px] text-slate-700 font-semibold mt-0.5">Vendor NDA Redline & Risk Flagging</div>
          <p class="text-[10px] text-slate-500 mt-1">Master Services Agreement • Indemnity clause audited</p>
        </button>

      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function openAutomationCategoryModal() {
  playClickSound();
  const m = document.getElementById('automationCategoryModal');
  if (m) {
    m.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeAutomationCategoryModal() {
  playClickSound();
  const m = document.getElementById('automationCategoryModal');
  if (m) m.classList.add('hidden');
}

// 6 Automation Presets
const AUTOMATION_PRESETS = {
  logistics: {
    businessName: "Nexa Logistics",
    businessInitials: "NL",
    industry: "Logistics / Operations",
    customerNoun: "Shipment Record",
    teamMemberNoun: "Operations Manager",
    serviceNoun: "Freight Invoicing",
    bookingLabel: "Run Automation",
    location: "Chennai",
    brandColor: "#1E3A8A",
    sampleInvoice: {
      invoiceNumber: "INV-2043",
      vendorName: "Apex Shipping & Freight Ltd.",
      amount: "₹45,000",
      totalAmount: "₹53,100",
      poNumber: "PO-2026-891",
      category: "Inbound Freight & Customs Clearance",
      department: "Finance & Accounts Payable",
      assignedTo: "Finance Team"
    }
  },
  invoicing: {
    businessName: "Apex Global Accounts",
    businessInitials: "AG",
    industry: "Financial Operations & AP",
    customerNoun: "Vendor Voucher",
    teamMemberNoun: "AP Controller",
    serviceNoun: "3-Way Invoice Match",
    bookingLabel: "Process Invoice",
    location: "Mumbai",
    brandColor: "#0F766E",
    sampleInvoice: {
      invoiceNumber: "INV-5510",
      vendorName: "CloudServe Data Technologies",
      amount: "₹82,400",
      totalAmount: "₹97,232",
      poNumber: "PO-2026-440",
      category: "SaaS Infrastructure & Servers",
      department: "Corporate IT & Accounting",
      assignedTo: "AP Audit Desk"
    }
  },
  ecommerce: {
    businessName: "SwiftCart Fulfillment",
    businessInitials: "SC",
    industry: "E-Commerce Logistics",
    customerNoun: "Return RMA",
    teamMemberNoun: "Warehouse Dispatcher",
    serviceNoun: "RMA Inspection & Restock",
    bookingLabel: "Trigger RMA Workflow",
    location: "Bangalore",
    brandColor: "#EA580C",
    sampleInvoice: {
      invoiceNumber: "RMA-4421",
      vendorName: "UrbanStyle Apparel Depot",
      amount: "₹14,200",
      totalAmount: "₹14,200",
      poNumber: "ORD-9021-X",
      category: "Customer Return & Restock Approval",
      department: "Warehouse QC",
      assignedTo: "Inventory Lead"
    }
  },
  hronboarding: {
    businessName: "TalentHub HR Systems",
    businessInitials: "TH",
    industry: "Human Resources & Payroll",
    customerNoun: "New Hire Dossier",
    teamMemberNoun: "People Operations Lead",
    serviceNoun: "Employee Onboarding",
    bookingLabel: "Run Onboarding Pipeline",
    location: "Hyderabad",
    brandColor: "#7C3AED",
    sampleInvoice: {
      invoiceNumber: "EMP-2026-08",
      vendorName: "Rahul Sharma (Senior Frontend Dev)",
      amount: "₹1,80,000/mo",
      totalAmount: "CTC Band L5",
      poNumber: "OFFER-9912",
      category: "Identity Verification & Equipment Dispatch",
      department: "People Ops & IT",
      assignedTo: "HR Operations"
    }
  },
  crmleads: {
    businessName: "GrowthScale Agency",
    businessInitials: "GS",
    industry: "Sales Automation & B2B CRM",
    customerNoun: "Enterprise Lead",
    teamMemberNoun: "VP Revenue Operations",
    serviceNoun: "Lead Scoring & Routing",
    bookingLabel: "Route & Assign Lead",
    location: "Gurugram",
    brandColor: "#0284C7",
    sampleInvoice: {
      invoiceNumber: "LEAD-991",
      vendorName: "Enterprise Health Systems Corp.",
      amount: "₹15,00,000",
      totalAmount: "Annual Contract Value",
      poNumber: "RFP-2026-Q1",
      category: "Enterprise Cloud Migration Deal",
      department: "Strategic Sales",
      assignedTo: "Enterprise Sales VP"
    }
  },
  legal: {
    businessName: "Lexis Corporate Law",
    businessInitials: "LC",
    industry: "Legal Tech & Contract Operations",
    customerNoun: "Contract Agreement",
    teamMemberNoun: "General Counsel",
    serviceNoun: "NDA & MSA Redlining",
    bookingLabel: "Run Contract Audit",
    location: "New Delhi",
    brandColor: "#BE123C",
    sampleInvoice: {
      invoiceNumber: "CTR-8812",
      vendorName: "FinTech Innovations Pvt Ltd",
      amount: "₹2,50,000",
      totalAmount: "Retainer Value",
      poNumber: "MSA-2026-FINAL",
      category: "Indemnity & Data Privacy Scoping",
      department: "Legal Risk Desk",
      assignedTo: "Senior Partner"
    }
  }
};

function selectAutomationPreset(key) {
  playClickSound();
  const p = AUTOMATION_PRESETS[key];
  if (!p) return;

  localStorage.setItem('buildicy_automation_override', JSON.stringify(p));
  localStorage.setItem('buildicy_automation_data', JSON.stringify({
    invoiceNumber: p.sampleInvoice.invoiceNumber,
    vendorName: p.sampleInvoice.vendorName,
    amount: p.sampleInvoice.amount,
    totalAmount: p.sampleInvoice.totalAmount,
    poNumber: p.sampleInvoice.poNumber,
    status: "Approved",
    assignedTo: p.sampleInvoice.assignedTo,
    processedTimestamp: "Just now",
    timeElapsedSeconds: 20
  }));

  window.location.reload();
}

