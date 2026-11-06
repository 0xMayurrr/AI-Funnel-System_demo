content = r"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Screen 2: WhatsApp AI Welcome | AI Funnel System Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { waGreen: '#25D366', waDarkGreen: '#075E54', waTeal: '#008069', waLightGreen: '#D9FDD3', darkNavy: '#0B1F3A', navySurface: '#102A4E' },
          fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'], heading: ['Outfit', 'sans-serif'] }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="config/demoConfig.js"></script>
  <link rel="stylesheet" href="shared.css">
</head>
<body class="ambient-canvas min-h-screen flex flex-col font-sans antialiased text-slate-800">
  <div id="loom-navbar-container"></div>
  <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">

    <div class="w-full lg:w-5/12 space-y-5">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
        <span class="w-2 h-2 rounded-full bg-waGreen animate-pulse"></span>
        <span>Screen 2 &bull; Instant WhatsApp AI Welcome</span>
      </div>
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-darkNavy tracking-tight leading-tight">
        Instant WhatsApp AI Welcome &amp; Engagement
      </h1>
      <p class="text-slate-600 text-sm leading-relaxed">
        The instant <span class="lead-name-first">Alex</span> submits the form on your website, <strong class="business-name">Your Business</strong> AI initiates an official, personalized conversation within <strong>2.1 seconds</strong>.
      </p>
      <div class="card-luxury p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
          <span class="font-bold text-darkNavy flex items-center gap-1.5">
            <i data-lucide="radio" class="w-3.5 h-3.5 text-waGreen animate-pulse"></i>
            Live Bot Telemetry
          </span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Verified API</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div class="text-[10px] text-slate-400 font-semibold uppercase">Response Latency</div>
            <div class="font-bold text-darkNavy font-heading text-sm mt-0.5">2.1 Seconds</div>
            <div class="text-[9px] text-emerald-600 font-medium">99.8% Faster than manual</div>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div class="text-[10px] text-slate-400 font-semibold uppercase">Lead Status</div>
            <div class="font-bold text-emerald-700 font-heading text-sm mt-0.5">Engaged &amp; Active</div>
            <div class="text-[9px] text-slate-500"><span class="customer-noun-label">Lead</span>: <span class="lead-name-full">Alex Johnson</span></div>
          </div>
        </div>
        <div class="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-[11px] text-blue-900 flex items-start gap-2">
          <i data-lucide="info" class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"></i>
          <span>Official WhatsApp Cloud API eliminates message spam flags and guarantees 98%+ open rates.</span>
        </div>
      </div>
      <div class="pt-2">
        <a href="screen3.html" class="w-full py-3.5 px-5 btn-primary-glow text-darkNavy font-bold font-heading rounded-2xl flex items-center justify-between shadow-md transition group text-sm">
          <span>Proceed to Screen 3: AI Qualification Layer</span>
          <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>

    <div class="w-full lg:w-7/12 flex justify-center">
      <div class="iphone-frame shadow-2xl">
        <div class="dynamic-island"><div class="camera-lens"></div></div>
        <div class="iphone-screen flex flex-col justify-between">
          <div class="bg-[#008069] text-white pt-2.5 px-7 pb-1 text-[11px] font-medium flex items-center justify-between z-20">
            <span>9:41</span>
            <div class="flex items-center gap-1.5 text-xs">
              <i data-lucide="signal" class="w-3 h-3"></i>
              <i data-lucide="wifi" class="w-3 h-3"></i>
              <i data-lucide="battery-medium" class="w-3.5 h-3.5"></i>
            </div>
          </div>
          <div class="bg-[#008069] text-white px-3 py-2.5 flex items-center justify-between shadow-md z-20">
            <div class="flex items-center gap-2.5">
              <a href="screen1.html" class="p-1 hover:bg-black/10 rounded-full transition">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </a>
              <div class="relative">
                <div class="w-9 h-9 rounded-full bg-darkNavy text-white font-bold flex items-center justify-center text-xs border border-white/40 shadow-sm font-heading business-initials">YB</div>
                <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#008069]">
                  <i data-lucide="check" class="w-2.5 h-2.5 text-white stroke-[3]"></i>
                </div>
              </div>
              <div>
                <h2 class="font-bold text-sm tracking-tight text-white font-heading business-name">Your Business</h2>
                <div class="flex items-center gap-1 text-[10px] text-emerald-100 font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                  <span>Verified Business &bull; Instant AI</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 text-white/90">
              <i data-lucide="video" class="w-4 h-4"></i>
              <i data-lucide="phone" class="w-4 h-4"></i>
              <i data-lucide="more-vertical" class="w-4 h-4"></i>
            </div>
          </div>

          <div id="chatScrollArea" class="flex-1 p-3.5 space-y-3.5 overflow-y-auto wa-wallpaper text-xs">
            <div class="flex justify-center my-1">
              <div class="bg-[#FFEECD] text-[#54656F] text-[10px] px-3 py-1.5 rounded-lg max-w-[90%] text-center shadow-xs border border-[#F3E2B8] leading-tight">
                🔒 Messages and calls are end-to-end encrypted.
              </div>
            </div>
            <div class="flex justify-center my-1.5">
              <span class="bg-white/80 backdrop-blur-xs text-slate-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-2xs uppercase tracking-wide">Today</span>
            </div>

            <div class="flex flex-col items-start bubble-in">
              <div class="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm max-w-[88%] border border-slate-200/70 text-slate-800 leading-relaxed">
                <p class="text-xs" id="chatMsgWelcomeText">
                  Hi <span class="font-bold lead-name-first text-darkNavy">Alex</span> 👋 Thanks for reaching out to <strong class="business-name">Your Business</strong>! To help you better, could you tell us a bit about your requirement?
                </p>
                <div class="text-[9px] text-slate-400 text-right mt-1 font-medium">10:02 AM</div>
              </div>
              <div id="chipQualReply" class="mt-2.5">
                <button onclick="handleSendReply()" class="bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-waGreen px-3.5 py-2 rounded-full font-bold shadow-sm transition flex items-center gap-2 text-xs hover:scale-105 active:scale-95">
                  <i data-lucide="corner-down-right" class="w-3.5 h-3.5 text-waGreen"></i>
                  <span>Reply: "<span class="lead-qual-display">Professional Background</span>"</span>
                </button>
              </div>
            </div>

            <div id="bubbleLeadQual" class="hidden flex flex-col items-end bubble-in">
              <div class="bg-waLightGreen rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%] border border-emerald-200/60 text-slate-900 leading-relaxed">
                <p class="text-xs font-semibold lead-qual-display">Professional Background</p>
                <div class="text-[9px] text-slate-500 flex items-center justify-end gap-1 mt-1 font-medium">
                  <span>10:02 AM</span>
                  <span class="text-blue-500 font-bold">✓✓</span>
                </div>
              </div>
            </div>

            <div id="bubbleAiAck" class="hidden flex flex-col items-start bubble-in">
              <div class="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm max-w-[88%] border border-slate-200/70 text-slate-800 leading-relaxed">
                <p class="text-xs">
                  Got it, <span class="font-bold lead-name-first text-darkNavy">Alex</span>! Profile noted 🎯
                </p>
                <p class="text-xs text-slate-600 mt-1">
                  Proceeding to the <strong>AI Qualification Layer</strong> to analyze your fit and match you with the right advisor.
                </p>
                <div class="text-[9px] text-slate-400 text-right mt-1 font-medium">10:02 AM</div>
              </div>
              <div class="mt-2.5 w-full max-w-[88%]">
                <a href="screen3.html" class="w-full py-2.5 px-3.5 bg-waGreen hover:bg-emerald-600 text-darkNavy font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs">
                  <span>View AI Qualification Layer</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>

            <div id="typingIndicator" class="hidden flex items-center gap-1.5 p-2 bg-white/80 rounded-2xl w-20 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
              <span class="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>

          <div class="p-2.5 bg-[#F0F2F5] border-t border-slate-200 flex items-center gap-2 z-20">
            <button class="text-slate-500 p-1"><i data-lucide="smile" class="w-5 h-5"></i></button>
            <button class="text-slate-500 p-1"><i data-lucide="paperclip" class="w-5 h-5"></i></button>
            <div class="flex-1 bg-white rounded-full px-3.5 py-1.5 border border-slate-300 flex items-center shadow-inner">
              <input type="text" id="fakeInputBar" readonly placeholder="Type a message..." class="w-full bg-transparent outline-none text-slate-800 text-xs">
            </div>
            <button onclick="handleSendReply()" class="w-9 h-9 rounded-full bg-[#008069] text-white flex items-center justify-center shadow-sm hover:scale-105 transition">
              <i data-lucide="send" class="w-4 h-4 ml-0.5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script src="shared.js"></script>
  <script>
    renderLoomNavbar(2);
    const cfg = window.DEMO_CONFIG || {};
    const lead = getStudentData();

    if (cfg.businessName) {
      document.title = `Screen 2: WhatsApp AI Welcome | ${cfg.businessName} Simulation`;
      document.querySelectorAll('.business-name').forEach(el => el.textContent = cfg.businessName);
    }
    if (cfg.businessInitials) document.querySelectorAll('.business-initials').forEach(el => el.textContent = cfg.businessInitials);
    if (cfg.customerNoun) document.querySelectorAll('.customer-noun-label').forEach(el => el.textContent = cfg.customerNoun);

    const firstName = lead.name ? lead.name.split(' ')[0] : 'Alex';
    document.querySelectorAll('.lead-name-first').forEach(el => el.textContent = firstName);
    document.querySelectorAll('.lead-name-full').forEach(el => el.textContent = lead.name);
    document.querySelectorAll('.lead-qual-display').forEach(el => el.textContent = lead.qualification || 'Professional Background');

    if (cfg.chatMessages && cfg.chatMessages.welcome) {
      const welcomeEl = document.getElementById('chatMsgWelcomeText');
      if (welcomeEl) {
        welcomeEl.innerHTML = interpolateConfig(cfg.chatMessages.welcome, {
          name: `<span class="font-bold lead-name-first text-darkNavy">${firstName}</span>`,
          businessName: cfg.businessName || 'Your Business'
        });
      }
    }

    let hasReplied = false;
    function handleSendReply() {
      if (hasReplied) return;
      hasReplied = true;
      playWhatsAppTone();
      const chip = document.getElementById('chipQualReply');
      if (chip) chip.style.display = 'none';
      document.getElementById('bubbleLeadQual').classList.remove('hidden');
      document.getElementById('fakeInputBar').value = lead.qualification || 'Professional Background';
      const scrollArea = document.getElementById('chatScrollArea');
      scrollArea.scrollTop = scrollArea.scrollHeight;
      const typing = document.getElementById('typingIndicator');
      setTimeout(() => { typing.classList.remove('hidden'); scrollArea.scrollTop = scrollArea.scrollHeight; }, 400);
      setTimeout(() => {
        typing.classList.add('hidden');
        document.getElementById('bubbleAiAck').classList.remove('hidden');
        scrollArea.scrollTop = scrollArea.scrollHeight;
        playWhatsAppTone();
        if (window.lucide) lucide.createIcons();
      }, 1200);
    }
  </script>
</body>
</html>
"""
with open('screen2.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("screen2.html written")
