// app.js - Receptionist Simulation Engine for Buildicy AI Receptionist Demo
// Product: Buildicy AI Receptionist — Interactive Demo

const state = {
  currentScreen: 1,
  autoPlayActive: false,
  autoPlayTimer: null,
  patientData: (typeof getPatientData === 'function') ? getPatientData() : getDefaultPatient()
};

// Auto-Play Simulation Engine
function toggleAutoPlay() {
  playClickSound();
  state.autoPlayActive = !state.autoPlayActive;
  const btn = document.getElementById('autoPlayBtn');

  if (state.autoPlayActive) {
    if (btn) {
      btn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5 fill-current"></i><span>Pause Tour</span>`;
      btn.classList.replace('bg-emerald-600', 'bg-amber-600');
      if (window.lucide) lucide.createIcons();
    }
    runAutoPlaySequence();
  } else {
    if (btn) {
      btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i><span>Auto Tour</span>`;
      btn.classList.replace('bg-amber-600', 'bg-emerald-600');
      if (window.lucide) lucide.createIcons();
    }
    clearTimeout(state.autoPlayTimer);
  }
}

function runAutoPlaySequence() {
  if (!state.autoPlayActive) return;

  const currentPath = window.location.pathname;
  if (currentPath.includes('screen1.html')) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      window.location.href = 'screen2.html';
    }, 2800);
  } else if (currentPath.includes('screen2.html')) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      if (typeof handleSendReply === 'function') handleSendReply();
      state.autoPlayTimer = setTimeout(() => {
        if (!state.autoPlayActive) return;
        window.location.href = 'screen3.html';
      }, 3000);
    }, 1800);
  } else if (currentPath.includes('screen3.html')) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      window.location.href = 'screen4.html';
    }, 2500);
  } else if (currentPath.includes('screen4.html')) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      window.location.href = 'screen5.html';
    }, 2500);
  } else if (currentPath.includes('screen5.html')) {
    state.autoPlayTimer = setTimeout(() => {
      if (!state.autoPlayActive) return;
      window.location.href = 'screen6.html';
    }, 3000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

