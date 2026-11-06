// app.js - Automation Simulation Engine for Buildicy AI Automation Demo
// Product: Buildicy AI Automation — Interactive Demo

const automationState = {
  currentScreen: 1,
  autoPlayActive: false,
  autoPlayTimer: null,
  currentStepIndex: 0,
  isProcessing: false
};

// Auto-Play Simulation Engine
function toggleAutoPlay() {
  playClickSound();
  automationState.autoPlayActive = !automationState.autoPlayActive;
  const btn = document.getElementById('autoPlayBtn');

  if (automationState.autoPlayActive) {
    if (btn) {
      btn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5 fill-current"></i><span>Pause Tour</span>`;
      btn.classList.replace('bg-blue-600', 'bg-amber-600');
      if (window.lucide) lucide.createIcons();
    }
    runAutoPlaySequence();
  } else {
    if (btn) {
      btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i><span>Auto Tour</span>`;
      btn.classList.replace('bg-amber-600', 'bg-blue-600');
      if (window.lucide) lucide.createIcons();
    }
    clearTimeout(automationState.autoPlayTimer);
  }
}

function runAutoPlaySequence() {
  if (!automationState.autoPlayActive) return;

  const currentPath = window.location.pathname;
  if (currentPath.includes('screen1.html')) {
    automationState.autoPlayTimer = setTimeout(() => {
      if (!automationState.autoPlayActive) return;
      window.location.href = 'screen2.html';
    }, 2500);
  } else if (currentPath.includes('screen2.html')) {
    // Let Screen 2 finish its animation before advancing
    automationState.autoPlayTimer = setTimeout(() => {
      if (!automationState.autoPlayActive) return;
      window.location.href = 'screen3.html';
    }, 4500);
  } else if (currentPath.includes('screen3.html')) {
    automationState.autoPlayTimer = setTimeout(() => {
      if (!automationState.autoPlayActive) return;
      window.location.href = 'screen4.html';
    }, 2800);
  } else if (currentPath.includes('screen4.html')) {
    automationState.autoPlayTimer = setTimeout(() => {
      if (!automationState.autoPlayActive) return;
      window.location.href = 'screen5.html';
    }, 2800);
  } else if (currentPath.includes('screen5.html')) {
    automationState.autoPlayTimer = setTimeout(() => {
      if (!automationState.autoPlayActive) return;
      window.location.href = 'screen6.html';
    }, 3000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

