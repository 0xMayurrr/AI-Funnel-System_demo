// admin.js

const STORAGE_KEY = 'buildicy_admin_config';

function adminLogout() {
  localStorage.removeItem('buildicy_admin_auth');
  window.location.replace('login.html');
}

function getConfig() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch(e) {}
  return window.DEMO_CONFIG || {};
}

// ── Industry Preset Grid ───────────────────────────────────────────────────
function renderIndustryGrid() {
  const grid = document.getElementById('industryGrid');
  if (!grid || !window.INDUSTRY_PRESETS) return;
  const colors = { blue:'border-blue-300 bg-blue-50 text-blue-800', amber:'border-amber-300 bg-amber-50 text-amber-800', rose:'border-rose-300 bg-rose-50 text-rose-800', purple:'border-purple-300 bg-purple-50 text-purple-800', indigo:'border-indigo-300 bg-indigo-50 text-indigo-800', green:'border-green-300 bg-green-50 text-green-800' };
  grid.innerHTML = Object.entries(window.INDUSTRY_PRESETS).map(([key, p]) => `
    <button onclick="applyPreset('${key}')" class="industry-card border-2 ${colors[p.color]||'border-slate-200 bg-slate-50'} rounded-2xl p-4 text-left hover:scale-105 transition-transform cursor-pointer">
      <div class="flex items-center gap-2 mb-1">
        <i data-lucide="${p.icon}" class="w-4 h-4"></i>
        <span class="font-bold text-sm">${p.label}</span>
      </div>
      <p class="text-[10px] opacity-70">${p.industry}</p>
    </button>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

function applyPreset(key) {
  const p = window.INDUSTRY_PRESETS[key];
  if (!p) return;
  const existing = getConfig();
  const merged = {
    ...existing,
    businessName: p.businessName, businessInitials: p.businessInitials,
    industry: p.industry, location: p.location, brandColor: existing.brandColor || '#0B1F3A',
    customerNoun: p.customerNoun, teamMemberNoun: p.teamMemberNoun,
    serviceNoun: p.serviceNoun, bookingLabel: p.bookingLabel,
    formTitle: p.formTitle, formSubtitle: p.formSubtitle,
    chatMessages: { welcome: p.welcomeMsg, recommendation: p.recommendationMsg, bookingConfirmation: p.confirmationMsg, welcomeAck: existing.chatMessages?.welcomeAck || '', countryQuestion: existing.chatMessages?.countryQuestion || '', budgetQuestion: existing.chatMessages?.budgetQuestion || '' },
    qualificationQuestions: { ...existing.qualificationQuestions, quickReplies: p.quickReplies },
    appointmentOptions: { counsellorName: p.counsellorName, counsellorInitials: p.counsellorInitials, counsellorTitle: p.counsellorTitle, counsellorBranch: p.counsellorBranch, callDuration: p.callDuration, slots: existing.appointmentOptions?.slots || [], requiredDocuments: p.documents },
    dashboardMetrics: p.metrics,
    leadStages: p.stages,
    branchRouting: p.branches
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  populateFields();
  showToast(`✅ ${p.label} preset applied!`);
  document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('ring-2','ring-offset-1','ring-brand'));
  document.querySelectorAll('.industry-card')[Object.keys(window.INDUSTRY_PRESETS).indexOf(key)]?.classList.add('ring-2','ring-offset-1','ring-brand');
}

// ── Populate all fields ────────────────────────────────────────────────────
function populateFields() {
  const cfg = getConfig();
  setVal('cfg_businessName', cfg.businessName);
  setVal('cfg_businessInitials', cfg.businessInitials);
  setVal('cfg_industry', cfg.industry);
  setVal('cfg_location', cfg.location);
  setVal('cfg_brandColor', cfg.brandColor || '#0B1F3A');
  setVal('cfg_brandColorHex', cfg.brandColor || '#0B1F3A');
  setVal('cfg_customerNoun', cfg.customerNoun);
  setVal('cfg_teamMemberNoun', cfg.teamMemberNoun);
  setVal('cfg_serviceNoun', cfg.serviceNoun);
  setVal('cfg_bookingLabel', cfg.bookingLabel);
  setVal('cfg_formTitle', cfg.formTitle);
  setVal('cfg_formSubtitle', cfg.formSubtitle);
  const cm = cfg.chatMessages || {};
  setVal('cfg_chatWelcome', cm.welcome);
  setVal('cfg_chatRecommendation', cm.recommendation);
  setVal('cfg_chatBookingConfirmation', cm.bookingConfirmation);
  const qq = cfg.qualificationQuestions || {};
  setVal('cfg_leadScore', qq.score || 96);
  setVal('cfg_leadBadge', qq.leadBadge || 'HOT LEAD');
  renderMetricsQual(qq.metrics || []);
  renderQuickReplies(qq.quickReplies || []);
  renderInstitutions(qq.partnerInstitutions || []);
  const ao = cfg.appointmentOptions || {};
  setVal('cfg_counsellorName', ao.counsellorName);
  setVal('cfg_counsellorInitials', ao.counsellorInitials);
  setVal('cfg_counsellorTitle', ao.counsellorTitle);
  setVal('cfg_counsellorBranch', ao.counsellorBranch);
  setVal('cfg_callDuration', ao.callDuration);
  renderSlots(ao.slots || []);
  renderDocs(ao.requiredDocuments || []);
  renderMetrics(cfg.dashboardMetrics || []);
  renderFunnel(cfg.leadStages || []);
  renderBranches(cfg.branchRouting || []);
  syncColorPicker();
  if (window.lucide) lucide.createIcons();
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined && val !== null) el.value = val;
}

// ── Qualification Metrics ──────────────────────────────────────────────────
function renderMetricsQual(metrics) {
  const c = document.getElementById('metricsQualContainer');
  if (!c) return;
  c.innerHTML = metrics.map((m, i) => `
    <div class="slot-row">
      <div class="row-label">Metric ${i+1}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Label</label><input id="mq_label_${i}" type="text" value="${m.label||''}"></div>
        <div class="field"><label>Value</label><input id="mq_value_${i}" type="text" value="${m.value||''}"></div>
        <div class="field"><label>Subtext</label><input id="mq_subtext_${i}" type="text" value="${m.subtext||''}"></div>
      </div>
    </div>`).join('');
}

// ── Quick Replies ──────────────────────────────────────────────────────────
function renderQuickReplies(replies) {
  const c = document.getElementById('quickRepliesContainer');
  if (!c) return;
  c.innerHTML = replies.map((r, i) => `
    <div class="slot-row" style="display:flex;align-items:center;gap:10px">
      <div class="field" style="flex:1"><label>Code</label><input id="qr_code_${i}" type="text" value="${r.code||''}"></div>
      <div class="field" style="flex:2"><label>Label</label><input id="qr_label_${i}" type="text" value="${r.label||''}"></div>
      <button class="remove-btn" onclick="removeQuickReply(${i})">✕</button>
    </div>`).join('');
}

function addQuickReply() {
  const cfg = getConfig();
  if (!cfg.qualificationQuestions) cfg.qualificationQuestions = {};
  if (!cfg.qualificationQuestions.quickReplies) cfg.qualificationQuestions.quickReplies = [];
  cfg.qualificationQuestions.quickReplies.push({ code: 'New', label: 'New Option' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderQuickReplies(cfg.qualificationQuestions.quickReplies);
}

function removeQuickReply(i) {
  const cfg = getConfig();
  cfg.qualificationQuestions.quickReplies.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderQuickReplies(cfg.qualificationQuestions.quickReplies);
}

// ── Institutions ───────────────────────────────────────────────────────────
function renderInstitutions(list) {
  const c = document.getElementById('institutionsContainer');
  if (!c) return;
  c.innerHTML = list.map((inst, i) => `
    <div class="slot-row">
      <div class="row-label">Option ${i+1} <button class="remove-btn" onclick="removeInstitution(${i})">✕ Remove</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Name</label><input id="inst_name_${i}" type="text" value="${inst.name||''}"></div>
        <div class="field"><label>Course / Detail</label><input id="inst_course_${i}" type="text" value="${inst.course||''}"></div>
        <div class="field"><label>Badge</label><input id="inst_badge_${i}" type="text" value="${inst.badge||''}"></div>
      </div>
    </div>`).join('');
}

function addInstitution() {
  const cfg = getConfig();
  if (!cfg.qualificationQuestions) cfg.qualificationQuestions = {};
  if (!cfg.qualificationQuestions.partnerInstitutions) cfg.qualificationQuestions.partnerInstitutions = [];
  cfg.qualificationQuestions.partnerInstitutions.push({ name: 'New Option', course: '', badge: '' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderInstitutions(cfg.qualificationQuestions.partnerInstitutions);
}

function removeInstitution(i) {
  const cfg = getConfig();
  cfg.qualificationQuestions.partnerInstitutions.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderInstitutions(cfg.qualificationQuestions.partnerInstitutions);
}

// ── Slots ──────────────────────────────────────────────────────────────────
function renderSlots(slots) {
  const c = document.getElementById('slotsContainer');
  if (!c) return;
  c.innerHTML = slots.map((s, i) => `
    <div class="slot-row">
      <div class="row-label">Slot ${i+1} <button class="remove-btn" onclick="removeSlot(${i})">✕ Remove</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Time</label><input id="slot_time_${i}" type="text" value="${s.time||''}"></div>
        <div class="field"><label>Period Label</label><input id="slot_period_${i}" type="text" value="${s.period||''}"></div>
        <div class="field"><label>Badge</label><input id="slot_badge_${i}" type="text" value="${s.badge||''}"></div>
      </div>
    </div>`).join('');
}

function addSlot() {
  const cfg = getConfig();
  if (!cfg.appointmentOptions) cfg.appointmentOptions = {};
  if (!cfg.appointmentOptions.slots) cfg.appointmentOptions.slots = [];
  cfg.appointmentOptions.slots.push({ time: 'Tomorrow, 10:00 AM', period: 'Morning', badge: '2 slots open', isDefault: false });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderSlots(cfg.appointmentOptions.slots);
}

function removeSlot(i) {
  const cfg = getConfig();
  cfg.appointmentOptions.slots.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderSlots(cfg.appointmentOptions.slots);
}

// ── Documents ──────────────────────────────────────────────────────────────
function renderDocs(docs) {
  const c = document.getElementById('docsContainer');
  if (!c) return;
  c.innerHTML = docs.map((d, i) => `
    <div style="display:flex;align-items:center;gap:8px">
      <input id="doc_${i}" type="text" value="${d}" class="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
      <button class="remove-btn" onclick="removeDoc(${i})">✕</button>
    </div>`).join('');
}

function addDoc() {
  const cfg = getConfig();
  if (!cfg.appointmentOptions) cfg.appointmentOptions = {};
  if (!cfg.appointmentOptions.requiredDocuments) cfg.appointmentOptions.requiredDocuments = [];
  cfg.appointmentOptions.requiredDocuments.push('New Document');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderDocs(cfg.appointmentOptions.requiredDocuments);
}

function removeDoc(i) {
  const cfg = getConfig();
  cfg.appointmentOptions.requiredDocuments.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderDocs(cfg.appointmentOptions.requiredDocuments);
}

// ── Dashboard Metrics ──────────────────────────────────────────────────────
function renderMetrics(metrics) {
  const c = document.getElementById('metricsContainer');
  if (!c) return;
  c.innerHTML = metrics.map((m, i) => `
    <div class="metric-row">
      <div class="row-label">Metric ${i+1}: ${m.label}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label>Label</label><input id="metric_label_${i}" type="text" value="${m.label||''}"></div>
        <div class="field"><label>Count</label><input id="metric_count_${i}" type="text" value="${m.count||''}"></div>
        <div class="field"><label>Subtext</label><input id="metric_subtext_${i}" type="text" value="${m.subtext||''}"></div>
      </div>
    </div>`).join('');
}

// ── Funnel Stages ──────────────────────────────────────────────────────────
function renderFunnel(stages) {
  const c = document.getElementById('funnelContainer');
  if (!c) return;
  c.innerHTML = stages.map((s, i) => `
    <div class="funnel-row">
      <div class="row-label">Stage ${s.num}: ${s.name}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Stage Name</label><input id="funnel_name_${i}" type="text" value="${s.name||''}"></div>
        <div class="field"><label>Count</label><input id="funnel_count_${i}" type="text" value="${s.count||''}"></div>
        <div class="field"><label>Percentage</label><input id="funnel_pct_${i}" type="text" value="${s.pct||''}"></div>
        <div class="field"><label>Subtext</label><input id="funnel_subtext_${i}" type="text" value="${s.subtext||''}"></div>
        <div class="field"><label>Latency Note</label><input id="funnel_latency_${i}" type="text" value="${s.latency||''}"></div>
      </div>
    </div>`).join('');
}

// ── Branches ───────────────────────────────────────────────────────────────
function renderBranches(branches) {
  const c = document.getElementById('branchesContainer');
  if (!c) return;
  c.innerHTML = branches.map((b, i) => `
    <div class="branch-row">
      <div class="row-label">Branch ${i+1} <button class="remove-btn" onclick="removeBranch(${i})">✕ Remove</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Branch Name</label><input id="branch_name_${i}" type="text" value="${b.name||''}"></div>
        <div class="field"><label>Leads</label><input id="branch_leads_${i}" type="number" value="${b.leads||0}"></div>
        <div class="field"><label>Percentage</label><input id="branch_pct_${i}" type="text" value="${b.pct||''}"></div>
      </div>
    </div>`).join('');
}

function addBranch() {
  const cfg = getConfig();
  if (!cfg.branchRouting) cfg.branchRouting = [];
  cfg.branchRouting.push({ name: 'New Branch', leads: 0, pct: '0%', color: 'blue-600' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderBranches(cfg.branchRouting);
}

function removeBranch(i) {
  const cfg = getConfig();
  cfg.branchRouting.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderBranches(cfg.branchRouting);
}

// ── Color Picker Sync ──────────────────────────────────────────────────────
function syncColorPicker() {
  const picker = document.getElementById('cfg_brandColor');
  const hex = document.getElementById('cfg_brandColorHex');
  if (!picker || !hex) return;
  picker.addEventListener('input', () => { hex.value = picker.value; });
  hex.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(hex.value)) picker.value = hex.value; });
}

// ── Collect all fields ─────────────────────────────────────────────────────
function collectConfig() {
  const existing = getConfig();
  const qqMetrics = (existing.qualificationQuestions?.metrics || []).map((m, i) => ({ ...m, label: document.getElementById(`mq_label_${i}`)?.value || m.label, value: document.getElementById(`mq_value_${i}`)?.value || m.value, subtext: document.getElementById(`mq_subtext_${i}`)?.value || m.subtext }));
  const quickReplies = (existing.qualificationQuestions?.quickReplies || []).map((r, i) => ({ ...r, code: document.getElementById(`qr_code_${i}`)?.value || r.code, label: document.getElementById(`qr_label_${i}`)?.value || r.label }));
  const institutions = (existing.qualificationQuestions?.partnerInstitutions || []).map((inst, i) => ({ ...inst, name: document.getElementById(`inst_name_${i}`)?.value || inst.name, course: document.getElementById(`inst_course_${i}`)?.value || inst.course, badge: document.getElementById(`inst_badge_${i}`)?.value || inst.badge }));
  const slots = (existing.appointmentOptions?.slots || []).map((s, i) => ({ ...s, time: document.getElementById(`slot_time_${i}`)?.value || s.time, period: document.getElementById(`slot_period_${i}`)?.value || s.period, badge: document.getElementById(`slot_badge_${i}`)?.value || s.badge }));
  const docs = (existing.appointmentOptions?.requiredDocuments || []).map((d, i) => document.getElementById(`doc_${i}`)?.value || d);
  const metrics = (existing.dashboardMetrics || []).map((m, i) => ({ ...m, label: document.getElementById(`metric_label_${i}`)?.value || m.label, count: document.getElementById(`metric_count_${i}`)?.value || m.count, subtext: document.getElementById(`metric_subtext_${i}`)?.value || m.subtext }));
  const stages = (existing.leadStages || []).map((s, i) => ({ ...s, name: document.getElementById(`funnel_name_${i}`)?.value || s.name, count: document.getElementById(`funnel_count_${i}`)?.value || s.count, pct: document.getElementById(`funnel_pct_${i}`)?.value || s.pct, subtext: document.getElementById(`funnel_subtext_${i}`)?.value || s.subtext, latency: document.getElementById(`funnel_latency_${i}`)?.value || s.latency, barWidth: document.getElementById(`funnel_pct_${i}`)?.value || s.barWidth }));
  const branches = (existing.branchRouting || []).map((b, i) => ({ ...b, name: document.getElementById(`branch_name_${i}`)?.value || b.name, leads: parseInt(document.getElementById(`branch_leads_${i}`)?.value) || b.leads, pct: document.getElementById(`branch_pct_${i}`)?.value || b.pct }));

  return {
    ...existing,
    businessName: document.getElementById('cfg_businessName')?.value || existing.businessName,
    businessInitials: document.getElementById('cfg_businessInitials')?.value || existing.businessInitials,
    industry: document.getElementById('cfg_industry')?.value || existing.industry,
    location: document.getElementById('cfg_location')?.value || existing.location,
    brandColor: document.getElementById('cfg_brandColorHex')?.value || existing.brandColor,
    customerNoun: document.getElementById('cfg_customerNoun')?.value || existing.customerNoun,
    teamMemberNoun: document.getElementById('cfg_teamMemberNoun')?.value || existing.teamMemberNoun,
    serviceNoun: document.getElementById('cfg_serviceNoun')?.value || existing.serviceNoun,
    bookingLabel: document.getElementById('cfg_bookingLabel')?.value || existing.bookingLabel,
    formTitle: document.getElementById('cfg_formTitle')?.value || existing.formTitle,
    formSubtitle: document.getElementById('cfg_formSubtitle')?.value || existing.formSubtitle,
    chatMessages: { ...existing.chatMessages, welcome: document.getElementById('cfg_chatWelcome')?.value || existing.chatMessages?.welcome, recommendation: document.getElementById('cfg_chatRecommendation')?.value || existing.chatMessages?.recommendation, bookingConfirmation: document.getElementById('cfg_chatBookingConfirmation')?.value || existing.chatMessages?.bookingConfirmation },
    qualificationQuestions: { ...existing.qualificationQuestions, score: parseInt(document.getElementById('cfg_leadScore')?.value) || 96, leadBadge: document.getElementById('cfg_leadBadge')?.value || 'HOT LEAD', metrics: qqMetrics, quickReplies, partnerInstitutions: institutions },
    appointmentOptions: { ...existing.appointmentOptions, counsellorName: document.getElementById('cfg_counsellorName')?.value || existing.appointmentOptions?.counsellorName, counsellorInitials: document.getElementById('cfg_counsellorInitials')?.value || existing.appointmentOptions?.counsellorInitials, counsellorTitle: document.getElementById('cfg_counsellorTitle')?.value || existing.appointmentOptions?.counsellorTitle, counsellorBranch: document.getElementById('cfg_counsellorBranch')?.value || existing.appointmentOptions?.counsellorBranch, callDuration: document.getElementById('cfg_callDuration')?.value || existing.appointmentOptions?.callDuration, slots, requiredDocuments: docs },
    dashboardMetrics: metrics,
    leadStages: stages,
    branchRouting: branches
  };
}

// ── Save & Apply ───────────────────────────────────────────────────────────
function saveAndApply() {
  const cfg = collectConfig();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  localStorage.setItem('buildicy_demo_config', JSON.stringify(cfg));
  showToast('✅ Saved! Open the demo to see changes.');
}

// ── Reset ──────────────────────────────────────────────────────────────────
function resetToDefault() {
  if (!confirm('Reset all config back to default values?')) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('buildicy_demo_config');
  localStorage.removeItem('teamOverseas_student');
  populateFields();
  showToast('Reset to default config.');
}

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderIndustryGrid();
  populateFields();
  switchDemoTab('funnel');
  if (window.lucide) lucide.createIcons();
});

// ── Demo Tab Switcher ──────────────────────────────────────────────────────
function switchDemoTab(demo) {
  // Hide all panels
  document.getElementById('funnelPanel').classList.add('hidden');
  document.getElementById('funnelSidebar').closest('aside').classList.add('hidden');
  document.getElementById('receptionistPanel').classList.add('hidden');
  document.getElementById('automationPanel').classList.add('hidden');

  // Deactivate all tabs
  document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active-tab'));

  // Show correct panel & activate tab
  if (demo === 'funnel') {
    document.getElementById('funnelPanel').classList.remove('hidden');
    document.getElementById('funnelSidebar').closest('aside').classList.remove('hidden');
    document.getElementById('tab-funnel').classList.add('active-tab');
    document.getElementById('previewDemoBtn').href = '../screen1.html';
    populateFields();
  } else if (demo === 'receptionist') {
    document.getElementById('receptionistPanel').classList.remove('hidden');
    document.getElementById('tab-receptionist').classList.add('active-tab');
    document.getElementById('previewDemoBtn').href = '../../../ai-receptionist-demo/screen1.html';
    populateReceptionistFields();
  } else if (demo === 'automation') {
    document.getElementById('automationPanel').classList.remove('hidden');
    document.getElementById('tab-automation').classList.add('active-tab');
    document.getElementById('previewDemoBtn').href = '../../../ai-automation-demo/screen1.html';
    populateAutomationFields();
  }

  if (window.lucide) lucide.createIcons();
}

// ── Receptionist: Populate ─────────────────────────────────────────────────
function populateReceptionistFields() {
  const cfg = getConfig();
  const dp = cfg.demoPatient || {};
  const slots = cfg.receptionistSlots || [
    { time: 'Tomorrow, 11:00 AM', period: 'Morning', badge: '2 slots open' },
    { time: 'Tomorrow, 3:00 PM', period: '★ Preferred', badge: 'Recommended' },
    { time: 'Day after, 5:00 PM', period: 'Evening', badge: '1 slot open' }
  ];
  const metrics = cfg.receptionistMetrics || [
    { label: 'Calls Answered', count: '--' },
    { label: 'WhatsApp Chats', count: '--' },
    { label: 'Appointments Booked', count: '--' },
    { label: 'No-Shows Prevented', count: '--' },
    { label: 'Human Handoffs', count: '--' }
  ];

  setVal('r_businessName', cfg.businessName);
  setVal('r_industry', cfg.industry);
  setVal('r_location', cfg.location);
  setVal('r_brandColor', cfg.brandColor || '#0B7A4B');
  setVal('r_brandColorHex', cfg.brandColor || '#0B7A4B');
  setVal('r_customerNoun', cfg.customerNoun);
  setVal('r_teamMemberNoun', cfg.teamMemberNoun);
  setVal('r_serviceNoun', cfg.serviceNoun);
  setVal('r_bookingLabel', cfg.bookingLabel);
  setVal('r_dentistName', cfg.dentistName);
  setVal('r_staffTitle', cfg.staffTitle || '');
  setVal('r_staffBranch', cfg.staffBranch || '');
  setVal('r_patientName', dp.name || 'Priya Sharma');
  setVal('r_patientPhone', dp.phone || '9876543221');
  setVal('r_serviceInterest', dp.serviceInterest || 'Dental Cleaning & Checkup');
  setVal('r_defaultSlot', dp.defaultSlot || 'Tomorrow, 3:00 PM');
  setVal('r_msgGreeting', cfg.receptionistGreeting || '');
  setVal('r_msgConfirmation', cfg.receptionistConfirmation || '');

  renderReceptionistSlots(slots);
  renderReceptionistMetrics(metrics);

  // Color picker sync
  const picker = document.getElementById('r_brandColor');
  const hex = document.getElementById('r_brandColorHex');
  if (picker && hex) {
    picker.addEventListener('input', () => { hex.value = picker.value; });
    hex.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(hex.value)) picker.value = hex.value; });
  }
}

function renderReceptionistSlots(slots) {
  const c = document.getElementById('r_slotsContainer');
  if (!c) return;
  c.innerHTML = slots.map((s, i) => `
    <div class="slot-row">
      <div class="row-label">Slot ${i+1} <button class="remove-btn" onclick="removeReceptionistSlot(${i})">✕ Remove</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="field"><label>Time</label><input id="rs_time_${i}" type="text" value="${s.time||''}"></div>
        <div class="field"><label>Period Label</label><input id="rs_period_${i}" type="text" value="${s.period||''}"></div>
        <div class="field"><label>Badge</label><input id="rs_badge_${i}" type="text" value="${s.badge||''}"></div>
      </div>
    </div>`).join('');
}

function addReceptionistSlot() {
  const cfg = getConfig();
  if (!cfg.receptionistSlots) cfg.receptionistSlots = [];
  cfg.receptionistSlots.push({ time: 'Tomorrow, 10:00 AM', period: 'Morning', badge: '2 slots open' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderReceptionistSlots(cfg.receptionistSlots);
}

function removeReceptionistSlot(i) {
  const cfg = getConfig();
  if (!cfg.receptionistSlots) return;
  cfg.receptionistSlots.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderReceptionistSlots(cfg.receptionistSlots);
}

function renderReceptionistMetrics(metrics) {
  const c = document.getElementById('r_metricsContainer');
  if (!c) return;
  c.innerHTML = metrics.map((m, i) => `
    <div class="metric-row">
      <div class="row-label">Metric ${i+1}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label>Label</label><input id="rm_label_${i}" type="text" value="${m.label||''}"></div>
        <div class="field"><label>Count</label><input id="rm_count_${i}" type="text" value="${m.count||''}"></div>
      </div>
    </div>`).join('');
}

// ── Automation: Populate ───────────────────────────────────────────────────
function populateAutomationFields() {
  const cfg = getConfig();
  const inv = cfg.sampleInvoice || {};
  const metrics = cfg.automationMetrics || [
    { label: 'Tasks Automated', count: '--' },
    { label: 'Hours Saved', count: '--' },
    { label: 'Errors Reduced', count: '--' },
    { label: 'Active Workflows', count: '--' }
  ];
  const workflows = cfg.automationWorkflows || [
    { name: 'Invoice Processing', status: 'Active' },
    { name: 'Lead Assignment', status: 'Active' },
    { name: 'Report Generation', status: 'Active' },
    { name: 'Follow-up Emails', status: 'Active' }
  ];

  setVal('a_businessName', cfg.businessName);
  setVal('a_industry', cfg.industry);
  setVal('a_location', cfg.location);
  setVal('a_brandColor', cfg.brandColor || '#1E3A8A');
  setVal('a_brandColorHex', cfg.brandColor || '#1E3A8A');
  setVal('a_teamMemberNoun', cfg.teamMemberNoun);
  setVal('a_bookingLabel', cfg.bookingLabel);
  setVal('a_invoiceNumber', inv.invoiceNumber || '');
  setVal('a_vendorName', inv.vendorName || '');
  setVal('a_amount', inv.amount || '');
  setVal('a_totalAmount', inv.totalAmount || '');
  setVal('a_poNumber', inv.poNumber || '');
  setVal('a_category', inv.category || '');
  setVal('a_department', inv.department || '');
  setVal('a_assignedTo', inv.assignedTo || '');
  setVal('a_notificationMsg', cfg.automationNotification || '');

  renderAutomationMetrics(metrics);
  renderAutomationWorkflows(workflows);

  // Color picker sync
  const picker = document.getElementById('a_brandColor');
  const hex = document.getElementById('a_brandColorHex');
  if (picker && hex) {
    picker.addEventListener('input', () => { hex.value = picker.value; });
    hex.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(hex.value)) picker.value = hex.value; });
  }
}

function renderAutomationMetrics(metrics) {
  const c = document.getElementById('a_metricsContainer');
  if (!c) return;
  c.innerHTML = metrics.map((m, i) => `
    <div class="metric-row">
      <div class="row-label">Metric ${i+1}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label>Label</label><input id="am_label_${i}" type="text" value="${m.label||''}"></div>
        <div class="field"><label>Count</label><input id="am_count_${i}" type="text" value="${m.count||''}"></div>
      </div>
    </div>`).join('');
}

function renderAutomationWorkflows(workflows) {
  const c = document.getElementById('a_workflowsContainer');
  if (!c) return;
  c.innerHTML = workflows.map((w, i) => `
    <div style="display:flex;align-items:center;gap:8px">
      <input id="aw_name_${i}" type="text" value="${w.name||''}" placeholder="Workflow name" class="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
      <input id="aw_status_${i}" type="text" value="${w.status||'Active'}" placeholder="Status" class="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
      <button class="remove-btn" onclick="removeAutomationWorkflow(${i})">✕</button>
    </div>`).join('');
}

function addAutomationWorkflow() {
  const cfg = getConfig();
  if (!cfg.automationWorkflows) cfg.automationWorkflows = [];
  cfg.automationWorkflows.push({ name: 'New Workflow', status: 'Active' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderAutomationWorkflows(cfg.automationWorkflows);
}

function removeAutomationWorkflow(i) {
  const cfg = getConfig();
  if (!cfg.automationWorkflows) return;
  cfg.automationWorkflows.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  renderAutomationWorkflows(cfg.automationWorkflows);
}

// ── Override saveAndApply to also collect Receptionist & Automation fields ─
const _origSaveAndApply = saveAndApply;
saveAndApply = function() {
  const cfg = collectConfig();

  // Collect Receptionist fields
  const rSlots = collectReceptionistSlots();
  const rMetrics = collectReceptionistMetrics();
  cfg.dentistName = document.getElementById('r_dentistName')?.value || cfg.dentistName;
  cfg.staffTitle = document.getElementById('r_staffTitle')?.value || cfg.staffTitle;
  cfg.staffBranch = document.getElementById('r_staffBranch')?.value || cfg.staffBranch;
  cfg.receptionistGreeting = document.getElementById('r_msgGreeting')?.value || cfg.receptionistGreeting;
  cfg.receptionistConfirmation = document.getElementById('r_msgConfirmation')?.value || cfg.receptionistConfirmation;
  if (rSlots.length) cfg.receptionistSlots = rSlots;
  if (rMetrics.length) cfg.receptionistMetrics = rMetrics;
  if (document.getElementById('r_patientName')?.value) {
    cfg.demoPatient = {
      name: document.getElementById('r_patientName').value,
      phone: document.getElementById('r_patientPhone')?.value || '',
      serviceInterest: document.getElementById('r_serviceInterest')?.value || '',
      defaultSlot: document.getElementById('r_defaultSlot')?.value || 'Tomorrow, 3:00 PM'
    };
  }

  // Collect Automation fields
  const aMetrics = collectAutomationMetrics();
  const aWorkflows = collectAutomationWorkflows();
  cfg.automationNotification = document.getElementById('a_notificationMsg')?.value || cfg.automationNotification;
  if (aMetrics.length) cfg.automationMetrics = aMetrics;
  if (aWorkflows.length) cfg.automationWorkflows = aWorkflows;
  if (document.getElementById('a_invoiceNumber')?.value) {
    cfg.sampleInvoice = {
      invoiceNumber: document.getElementById('a_invoiceNumber').value,
      vendorName: document.getElementById('a_vendorName')?.value || '',
      amount: document.getElementById('a_amount')?.value || '',
      totalAmount: document.getElementById('a_totalAmount')?.value || '',
      poNumber: document.getElementById('a_poNumber')?.value || '',
      category: document.getElementById('a_category')?.value || '',
      department: document.getElementById('a_department')?.value || '',
      assignedTo: document.getElementById('a_assignedTo')?.value || ''
    };
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  localStorage.setItem('buildicy_demo_config', JSON.stringify(cfg));
  showToast('✅ Saved! All 3 demos updated.');
};

function collectReceptionistSlots() {
  const cfg = getConfig();
  return (cfg.receptionistSlots || []).map((s, i) => ({
    ...s,
    time: document.getElementById(`rs_time_${i}`)?.value || s.time,
    period: document.getElementById(`rs_period_${i}`)?.value || s.period,
    badge: document.getElementById(`rs_badge_${i}`)?.value || s.badge
  }));
}

function collectReceptionistMetrics() {
  const cfg = getConfig();
  return (cfg.receptionistMetrics || []).map((m, i) => ({
    ...m,
    label: document.getElementById(`rm_label_${i}`)?.value || m.label,
    count: document.getElementById(`rm_count_${i}`)?.value || m.count
  }));
}

function collectAutomationMetrics() {
  const cfg = getConfig();
  return (cfg.automationMetrics || []).map((m, i) => ({
    ...m,
    label: document.getElementById(`am_label_${i}`)?.value || m.label,
    count: document.getElementById(`am_count_${i}`)?.value || m.count
  }));
}

function collectAutomationWorkflows() {
  const cfg = getConfig();
  return (cfg.automationWorkflows || []).map((w, i) => ({
    name: document.getElementById(`aw_name_${i}`)?.value || w.name,
    status: document.getElementById(`aw_status_${i}`)?.value || w.status
  }));
}
