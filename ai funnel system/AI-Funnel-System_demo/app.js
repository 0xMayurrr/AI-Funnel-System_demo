// app.js - Buildicy AI Funnel Interactive Demo
// Prepared by Buildicy — AI Growth Systems Studio

const demoConfig = window.DEMO_CONFIG || {};

// Global State
const state = {
  currentScreen: 1,
  chatSubStep: 1, // 1: Welcome waiting for reply, 2: Solution selection, 3: Budget reply, 4: Booking pitch, 5: Slot selection, 6: Confirmed
  studentData: (typeof getStudentData === 'function') ? getStudentData() : {
    name: (demoConfig.demoLead && demoConfig.demoLead.name) || "Alex Morgan",
    phone: (demoConfig.demoLead && demoConfig.demoLead.phone) || "9876543221",
    email: (demoConfig.demoLead && demoConfig.demoLead.email) || "alex.morgan@company.com",
    country: (demoConfig.demoLead && demoConfig.demoLead.country) || "⚡ AI Funnel System",
    qualification: (demoConfig.demoLead && demoConfig.demoLead.qualification) || "Growth Stage ($500k+ ARR)",
    year: (demoConfig.demoLead && demoConfig.demoLead.year) || "2026",
    ielts: (demoConfig.demoLead && demoConfig.demoLead.ielts) || "CRM & Workflow Ready",
    budget: (demoConfig.demoLead && demoConfig.demoLead.budget) || "$10k–$25k",
    intake: (demoConfig.demoLead && demoConfig.demoLead.intake) || "Next 30 Days",
    branch: (demoConfig.demoLead && demoConfig.demoLead.branch) || demoConfig.location || "Global Remote Hub",
    selectedSlot: (demoConfig.demoLead && demoConfig.demoLead.selectedSlot) || "Tomorrow, 3:00 PM"
  },
  audioEnabled: true,
  autoPlayActive: false,
  autoPlayTimer: null
};

// Web Audio API Sound Synthesizer (No external sound files required)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playWhatsAppPop() {
  if (!state.audioEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    // WhatsApp pop: quick pitch drop from 880Hz to 440Hz
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (e) {
    console.log("Audio play error", e);
  }
}

function playClickSound() {
  if (!state.audioEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Graceful fallback
  }
}

function toggleAudio() {
  state.audioEnabled = !state.audioEnabled;
  const btn = document.getElementById('soundToggle');
  if (state.audioEnabled) {
    btn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-waGreen"></i><span class="hidden sm:inline">Audio On</span>`;
  } else {
    btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i><span class="hidden sm:inline">Audio Muted</span>`;
  }
  lucide.createIcons();
}

// Client Pitch Modal
function togglePitchModal() {
  playClickSound();
  const modal = document.getElementById('pitchModal');
  modal.classList.toggle('hidden');
}

// Pre-fill Sample Data
function fillSampleData() {
  playClickSound();
  const d = (demoConfig && demoConfig.demoLead) || {
    name: "Alex Morgan",
    phone: "9876543221",
    email: "alex.morgan@company.com",
    country: "⚡ AI Funnel System",
    qualification: "Growth Stage ($500k+ ARR)",
    year: "2026",
    ielts: "CRM & Workflow Ready",
    budget: "$10k–$25k",
    intake: "Next 30 Days",
    branch: "Global Remote Hub"
  };

  if (document.getElementById('fieldName')) document.getElementById('fieldName').value = d.name;
  if (document.getElementById('fieldPhone')) document.getElementById('fieldPhone').value = d.phone;
  if (document.getElementById('fieldEmail')) document.getElementById('fieldEmail').value = d.email;
  if (document.getElementById('fieldCountry')) document.getElementById('fieldCountry').value = d.country;
  if (document.getElementById('fieldQual')) document.getElementById('fieldQual').value = d.qualification;
  if (document.getElementById('fieldYear')) document.getElementById('fieldYear').value = d.year;
  if (document.getElementById('fieldIelts')) document.getElementById('fieldIelts').value = d.ielts;
  if (document.getElementById('fieldBudget')) document.getElementById('fieldBudget').value = d.budget;
  if (document.getElementById('fieldIntake')) document.getElementById('fieldIntake').value = d.intake;
  if (document.getElementById('fieldBranch')) document.getElementById('fieldBranch').value = d.branch;

  // Visual feedback pulse
  const formCard = document.getElementById('screen-1');
  if (formCard) {
    formCard.classList.add('ring-2', 'ring-blue-400');
    setTimeout(() => formCard.classList.remove('ring-2', 'ring-blue-400'), 400);
  }
}

// Update Dynamic Student Data across all UI elements
function updateStudentInfoInUI() {
  const nameSpans = document.querySelectorAll('.student-display-name');
  nameSpans.forEach(el => el.textContent = state.studentData.name);

  const qualEl = document.getElementById('student-msg-qual');
  if (qualEl) {
    qualEl.textContent = state.studentData.qualification;
  }

  const budgetEl = document.getElementById('student-msg-budget');
  if (budgetEl) {
    budgetEl.textContent = `${state.studentData.budget}, ${state.studentData.ielts}.`;
  }
}

// Screen Navigation Controller
function goToScreen(screenNumber) {
  playClickSound();
  state.currentScreen = screenNumber;

  // Update Navigation Bar Buttons
  for (let i = 1; i <= 6; i++) {
    const navBtn = document.getElementById(`step-nav-${i}`);
    if (navBtn) {
      if (i === screenNumber) {
        navBtn.classList.add('active-step');
        navBtn.classList.remove('text-slate-600');
      } else {
        navBtn.classList.remove('active-step');
        navBtn.classList.add('text-slate-600');
      }
      if (i < screenNumber) {
        navBtn.classList.add('completed-step');
      } else {
        navBtn.classList.remove('completed-step');
      }
    }
  }

  // Update top banner label
  const cfg = window.DEMO_CONFIG || {};
  const labels = {
    1: `Screen 1 of 6 — ${cfg.formTitle || (cfg.customerNoun || "Client") + " Intake Form"}`,
    2: "Screen 2 of 6 — WhatsApp AI Welcome",
    3: "Screen 3 of 6 — AI Qualification & Feasibility Engine",
    4: `Screen 4 of 6 — ${cfg.bookingLabel || "Strategy Session Booking"}`,
    5: `Screen 5 of 6 — ${cfg.teamMemberNoun || "Director"} Alert & Lead Command Center`,
    6: "Screen 6 of 6 — AI Funnel Dashboard"
  };
  document.getElementById('currentScreenLabel').textContent = labels[screenNumber];

  // Screen View Visibility
  const screen1 = document.getElementById('screen-1');
  const phoneContainer = document.getElementById('phone-container');
  const screen5 = document.getElementById('screen-5');
  const screen6 = document.getElementById('screen-6');

  // Hide all primary views first
  screen1.classList.add('hidden');
  phoneContainer.classList.add('hidden');
  screen5.classList.add('hidden');
  screen6.classList.add('hidden');

  if (screenNumber === 1) {
    screen1.classList.remove('hidden');
  } else if (screenNumber >= 2 && screenNumber <= 4) {
    phoneContainer.classList.remove('hidden');
    setupPhoneScreenFor(screenNumber);
  } else if (screenNumber === 5) {
    screen5.classList.remove('hidden');
  } else if (screenNumber === 6) {
    screen6.classList.remove('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// Setup messages inside WhatsApp Phone depending on screen
function setupPhoneScreenFor(screenNumber) {
  updateStudentInfoInUI();
  const msg1 = document.getElementById('chat-msg-1');
  const msg2 = document.getElementById('chat-msg-2');
  const msg3 = document.getElementById('chat-msg-3');
  const msg4 = document.getElementById('chat-msg-4');
  const msg5 = document.getElementById('chat-msg-5');
  const msg6 = document.getElementById('chat-msg-6');
  const msg7 = document.getElementById('chat-msg-7');
  const msg8 = document.getElementById('chat-msg-8');
  const msg9 = document.getElementById('chat-msg-9');

  const chatHint = document.getElementById('prototypeChatHint');
  const guideText = document.getElementById('phoneStepGuideText');

  if (screenNumber === 2) {
    // Screen 2: AI Welcome & Student reply
    msg1.classList.remove('hidden');
    msg2.classList.add('hidden');
    msg3.classList.add('hidden');
    msg4.classList.add('hidden');
    msg5.classList.add('hidden');
    msg6.classList.add('hidden');
    msg7.classList.add('hidden');
    msg8.classList.add('hidden');
    msg9.classList.add('hidden');

    state.chatSubStep = 1;
    chatHint.textContent = state.studentData.qualification || "Growth Stage ($500k+ ARR)";
    guideText.textContent = "Click Send button or bottom input to simulate client reply";
    const welcomeChip = document.getElementById('welcome-reply-chip');
    if (welcomeChip) welcomeChip.classList.remove('hidden');
    const budgetChip = document.getElementById('budget-reply-chip');
    if (budgetChip) budgetChip.classList.add('hidden');
  } 
  else if (screenNumber === 3) {
    // Screen 3: AI Qualification
    msg1.classList.remove('hidden');
    msg2.classList.remove('hidden');
    msg3.classList.remove('hidden');
    msg4.classList.add('hidden');
    msg5.classList.add('hidden');
    msg6.classList.add('hidden');
    msg7.classList.add('hidden');
    msg8.classList.add('hidden');
    msg9.classList.add('hidden');

    const welcomeChip = document.getElementById('welcome-reply-chip');
    if (welcomeChip) welcomeChip.classList.add('hidden');
    const budgetChip = document.getElementById('budget-reply-chip');
    if (budgetChip) budgetChip.classList.remove('hidden');

    state.chatSubStep = 2;
    chatHint.textContent = "Tap ⚡ AI Funnel quick reply button";
    guideText.textContent = "Tap '⚡ AI Funnel' or another turnkey solution to qualify";
  } 
  else if (screenNumber === 4) {
    // Screen 4: Strategy Session Slot Booking
    msg1.classList.remove('hidden');
    msg2.classList.remove('hidden');
    msg3.classList.remove('hidden');
    msg4.classList.remove('hidden');
    msg5.classList.remove('hidden');
    msg6.classList.remove('hidden');
    msg7.classList.remove('hidden');
    msg8.classList.remove('hidden');
    msg9.classList.add('hidden');

    const welcomeChip = document.getElementById('welcome-reply-chip');
    if (welcomeChip) welcomeChip.classList.add('hidden');
    const budgetChip = document.getElementById('budget-reply-chip');
    if (budgetChip) budgetChip.classList.add('hidden');

    state.chatSubStep = 5;
    chatHint.textContent = "Select Tomorrow, 3:00 PM";
    guideText.textContent = "Pick a slot and tap 'Confirm Selected Slot'";
  }

  scrollChatToBottom();
}

function scrollChatToBottom() {
  setTimeout(() => {
    const area = document.getElementById('chatMessageArea');
    if (area) {
      area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
    }
  }, 100);
}

// FORM SUBMISSION (Screen 1 → Screen 2)
function handleFormSubmit(e) {
  e.preventDefault();
  playClickSound();

  // Capture user values
  state.studentData.name = (document.getElementById('fieldName') && document.getElementById('fieldName').value.trim()) || "Alex Morgan";
  state.studentData.phone = (document.getElementById('fieldPhone') && document.getElementById('fieldPhone').value.trim()) || "9876543221";
  state.studentData.email = (document.getElementById('fieldEmail') && document.getElementById('fieldEmail').value.trim()) || "alex.morgan@company.com";
  state.studentData.country = (document.getElementById('fieldCountry') && document.getElementById('fieldCountry').value) || "⚡ AI Funnel System";
  state.studentData.qualification = (document.getElementById('fieldQual') && document.getElementById('fieldQual').value.trim()) || "Growth Stage ($500k+ ARR)";
  state.studentData.year = (document.getElementById('fieldYear') && document.getElementById('fieldYear').value) || "2026";
  state.studentData.ielts = (document.getElementById('fieldIelts') && document.getElementById('fieldIelts').value) || "CRM & Workflow Ready";
  state.studentData.budget = (document.getElementById('fieldBudget') && document.getElementById('fieldBudget').value) || "$10k–$25k";
  state.studentData.intake = (document.getElementById('fieldIntake') && document.getElementById('fieldIntake').value) || "Next 30 Days";
  state.studentData.branch = (document.getElementById('fieldBranch') && document.getElementById('fieldBranch').value) || "Global Remote Hub";

  updateStudentInfoInUI();

  // Transition to Screen 2
  goToScreen(2);
  playWhatsAppPop();
}

// WHATSAPP CHAT INTERACTIONS

// Trigger when clicking bottom Send / action bar
function triggerNextChatAction() {
  if (state.currentScreen === 2 && state.chatSubStep === 1) {
    // Send client qualification reply
    handleSendStudentReply();
  } else if (state.currentScreen === 3 && state.chatSubStep === 2) {
    handleSelectCountry('⚡ AI Funnel System');
  } else if (state.currentScreen === 3 && state.chatSubStep === 3) {
    handleSendBudgetReply();
  } else if (state.currentScreen === 3 && state.chatSubStep === 4) {
    handleTriggerBooking();
  } else if (state.currentScreen === 4 && state.chatSubStep === 5) {
    confirmSelectedSlot();
  }
}

// Screen 2 Action: Student Reply → Screen 3
function handleSendStudentReply() {
  playClickSound();
  const welcomeChip = document.getElementById('welcome-reply-chip');
  if (welcomeChip) welcomeChip.classList.add('hidden');

  const msg2 = document.getElementById('chat-msg-2');
  if (msg2) msg2.classList.remove('hidden');
  playWhatsAppPop();

  document.getElementById('prototypeChatHint').textContent = "AI is typing...";
  showTypingIndicator(true);

  setTimeout(() => {
    showTypingIndicator(false);
    // Show AI Question 1 (Target Solution)
    const msg3 = document.getElementById('chat-msg-3');
    if (msg3) msg3.classList.remove('hidden');
    playWhatsAppPop();
    scrollChatToBottom();

    // Advance state to Screen 3
    state.currentScreen = 3;
    state.chatSubStep = 2;
    updateNavOnly(3);
    document.getElementById('currentScreenLabel').textContent = "Screen 3 of 6 — AI Qualification & Feasibility Engine";
    document.getElementById('prototypeChatHint').textContent = "Tap ⚡ AI Funnel button";
    document.getElementById('phoneStepGuideText').textContent = "Tap '⚡ AI Funnel' quick-reply button";
  }, 900);
}

// Screen 3 Action: Quick-Reply Solution Selected
function handleSelectCountry(country) {
  playClickSound();
  state.studentData.country = country;
  const msg4 = document.getElementById('chat-msg-4');
  const countryEl = document.getElementById('student-msg-country');
  if (countryEl) countryEl.textContent = country;
  if (msg4) msg4.classList.remove('hidden');
  playWhatsAppPop();

  // Disable solution buttons visual
  const buttons = document.querySelectorAll('#country-quick-replies button');
  buttons.forEach(b => {
    b.classList.remove('active-choice', 'border-waGreen');
    b.classList.add('opacity-60', 'pointer-events-none');
  });

  scrollChatToBottom();
  showTypingIndicator(true);
  document.getElementById('prototypeChatHint').textContent = "AI is typing...";

  setTimeout(() => {
    showTypingIndicator(false);
    // Show AI Budget & Readiness Question
    const msg5 = document.getElementById('chat-msg-5');
    if (msg5) msg5.classList.remove('hidden');
    playWhatsAppPop();
    scrollChatToBottom();

    // Next step: student budget reply
    state.chatSubStep = 3;
    document.getElementById('prototypeChatHint').textContent = `${state.studentData.budget}, ${state.studentData.ielts}.`;
    document.getElementById('phoneStepGuideText').textContent = "Tap Send to submit budget & timeline response";

    // Auto-prompt or let user click
    if (state.autoPlayActive) {
      setTimeout(handleSendBudgetReply, 1200);
    }
  }, 1000);
}

// Screen 3 Action: Student sends budget reply
function handleSendBudgetReply() {
  playClickSound();
  const budgetChip = document.getElementById('budget-reply-chip');
  if (budgetChip) budgetChip.classList.add('hidden');

  const msg6 = document.getElementById('chat-msg-6');
  msg6.classList.remove('hidden');
  playWhatsAppPop();
  scrollChatToBottom();

  showTypingIndicator(true);
  document.getElementById('prototypeChatHint').textContent = "AI analyzing profile...";

  setTimeout(() => {
    showTypingIndicator(false);
    // Show AI recommendation & booking callout
    const msg7 = document.getElementById('chat-msg-7');
    msg7.classList.remove('hidden');
    playWhatsAppPop();
    scrollChatToBottom();

    const cfg = window.DEMO_CONFIG || {};
    state.chatSubStep = 4;
    document.getElementById('prototypeChatHint').textContent = "Tap " + (cfg.bookingLabel || "Book Counselling");
    document.getElementById('phoneStepGuideText').textContent = "Tap '" + (cfg.bookingLabel || "Book Counselling") + "' button";

    if (state.autoPlayActive) {
      setTimeout(handleTriggerBooking, 1500);
    }
  }, 1100);
}

// Screen 3 Action: Book Counselling Clicked → Screen 4
function handleTriggerBooking() {
  playClickSound();
  goToScreen(4);
  const msg8 = document.getElementById('chat-msg-8');
  msg8.classList.remove('hidden');
  playWhatsAppPop();
  scrollChatToBottom();

  if (state.autoPlayActive) {
    setTimeout(confirmSelectedSlot, 1600);
  }
}

function handleAskQuestion() {
  playClickSound();
  const cfg = window.DEMO_CONFIG || {};
  const cNoun = cfg.customerNoun ? cfg.customerNoun.toLowerCase() : "lead";
  const bName = cfg.businessName || "Buildicy";
  const sNoun = cfg.serviceNoun ? cfg.serviceNoun.toLowerCase() : "strategy session";
  alert(`In the live AI funnel, the ${cNoun} can ask any custom question about system architecture, integrations, or pricing. The AI answers accurately using ${bName}'s verified knowledge base and guides them back to booking a ${sNoun}.`);
}

// Screen 4 Action: Slot Selection
function handleSelectSlot(slotText, element) {
  playClickSound();
  state.studentData.selectedSlot = slotText;

  // Update styles of slot cards
  const allSlots = document.querySelectorAll('.slot-card');
  allSlots.forEach(card => {
    card.classList.remove('selected-slot', 'border-2', 'border-waGreen', 'bg-emerald-50');
    card.classList.add('border-slate-200');
    const radio = card.querySelector('.slot-radio');
    if (radio) {
      radio.innerHTML = '';
      radio.className = 'slot-radio w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center';
    }
  });

  element.classList.add('selected-slot', 'border-2', 'border-waGreen', 'bg-emerald-50');
  element.classList.remove('border-slate-200');
  const activeRadio = element.querySelector('.slot-radio');
  if (activeRadio) {
    activeRadio.className = 'slot-radio w-3.5 h-3.5 rounded-full border-2 border-waGreen bg-waGreen flex items-center justify-center';
    activeRadio.innerHTML = '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>';
  }
}

// Screen 4 Action: Confirm Selected Slot
function confirmSelectedSlot() {
  playClickSound();
  const msg9 = document.getElementById('chat-msg-9');
  msg9.classList.remove('hidden');
  playWhatsAppPop();
  scrollChatToBottom();

  // Hide booking card button to prevent duplicate clicks
  const confirmBtn = document.getElementById('btnConfirmSlot');
  if (confirmBtn) {
    confirmBtn.innerHTML = `<span>Slot Confirmed!</span> <i data-lucide="check-check" class="w-4 h-4"></i>`;
    confirmBtn.classList.replace('bg-waGreen', 'bg-emerald-800');
    confirmBtn.classList.add('pointer-events-none');
    lucide.createIcons();
  }

  const cfg = window.DEMO_CONFIG || {};
  document.getElementById('prototypeChatHint').textContent = "Booking Confirmed ✅";
  document.getElementById('phoneStepGuideText').textContent = `${cfg.serviceNoun || "Counselling"} slot saved. Click 'Continue to ${cfg.teamMemberNoun || "Counsellor"} Alert' below.`;

  if (state.autoPlayActive) {
    setTimeout(() => goToScreen(5), 2000);
  }
}

// Helper: Show/hide typing bubble
function showTypingIndicator(show) {
  const ind = document.getElementById('chat-typing-indicator');
  if (ind) {
    if (show) {
      ind.classList.remove('hidden');
    } else {
      ind.classList.add('hidden');
    }
  }
  scrollChatToBottom();
}

// Helper: update step buttons in navbar without full refresh
function updateNavOnly(stepNumber) {
  for (let i = 1; i <= 6; i++) {
    const navBtn = document.getElementById(`step-nav-${i}`);
    if (navBtn) {
      if (i === stepNumber) {
        navBtn.classList.add('active-step');
        navBtn.classList.remove('text-slate-600');
      } else {
        navBtn.classList.remove('active-step');
        navBtn.classList.add('text-slate-600');
      }
      if (i < stepNumber) {
        navBtn.classList.add('completed-step');
      } else {
        navBtn.classList.remove('completed-step');
      }
    }
  }
}

// AUTO-PLAY SIMULATION ENGINE
function toggleAutoPlay() {
  playClickSound();
  state.autoPlayActive = !state.autoPlayActive;
  const btn = document.getElementById('autoPlayBtn');

  if (state.autoPlayActive) {
    btn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5 fill-current"></i><span>Pause Demo</span>`;
    btn.classList.replace('bg-indigo-600', 'bg-amber-600');
    lucide.createIcons();

    // Start automated demo progression
    runAutoPlaySequence();
  } else {
    btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i><span>Auto-Play Demo</span>`;
    btn.classList.replace('bg-amber-600', 'bg-indigo-600');
    lucide.createIcons();
    clearTimeout(state.autoPlayTimer);
  }
}

function runAutoPlaySequence() {
  if (!state.autoPlayActive) return;

  if (state.currentScreen === 1) {
    fillSampleData();
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      handleFormSubmit(new Event('submit'));
      state.autoPlayTimer = setTimeout(() => {
        if (!state.autoPlayActive) return;
        handleSendStudentReply();
        state.autoPlayTimer = setTimeout(() => {
          if (!state.autoPlayActive) return;
          handleSelectCountry('⚡ AI Funnel System');
        }, 1800);
      }, 1600);
    }, 1200);
  } else if (state.currentScreen === 5) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      goToScreen(6);
      state.autoPlayActive = false;
      const btn = document.getElementById('autoPlayBtn');
      btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i><span>Auto-Play Demo</span>`;
      btn.classList.replace('bg-amber-600', 'bg-indigo-600');
      lucide.createIcons();
    }, 4500);
  }
}

// Reset Prototype back to Screen 1
function resetPrototype() {
  playClickSound();
  state.autoPlayActive = false;
  clearTimeout(state.autoPlayTimer);
  const btn = document.getElementById('autoPlayBtn');
  btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i><span>Auto-Play Demo</span>`;
  btn.classList.replace('bg-amber-600', 'bg-indigo-600');

  // Reset slot button
  const confirmBtn = document.getElementById('btnConfirmSlot');
  if (confirmBtn) {
    confirmBtn.innerHTML = `<span>Confirm Selected Slot</span> <i data-lucide="check" class="w-3.5 h-3.5"></i>`;
    confirmBtn.classList.replace('bg-emerald-800', 'bg-waGreen');
    confirmBtn.classList.remove('pointer-events-none');
  }

  // Reset country buttons
  const buttons = document.querySelectorAll('#country-quick-replies button');
  buttons.forEach(b => {
    b.classList.remove('opacity-60', 'pointer-events-none');
  });

  const welcomeChip = document.getElementById('welcome-reply-chip');
  if (welcomeChip) welcomeChip.classList.remove('hidden');
  const budgetChip = document.getElementById('budget-reply-chip');
  if (budgetChip) budgetChip.classList.add('hidden');

  goToScreen(1);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  updateStudentInfoInUI();
  lucide.createIcons();
});
