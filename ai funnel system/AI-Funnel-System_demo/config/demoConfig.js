/**
 * demoConfig.js - Universal Central Configuration for Buildicy AI Funnel Interactive Demo
 * 
 * This file powers the entire 6-screen interactive demo.
 * Changing ANY property here updates:
 * - Business name & branding across all headers, chats, alerts, and dashboards
 * - Industry & client terminology (Customer, Advisor, Service, Booking)
 * - Form labels, placeholders, and sample pre-fill data
 * - Interactive WhatsApp bot greetings, questions, and replies
 * - Solution options, qualification criteria, and matched packages
 * - Advisor booking slots, prep checklists, and push alerts
 * - Dashboard KPI metrics, pipeline stages, and distribution charts
 */

window.DEMO_CONFIG = {
  // Brand & Business Identity
  businessName: "Nexus AI Studio",
  businessInitials: "NA",
  tagline: "AI Growth & Customer Funnel Automation",
  industry: "AI Growth Systems & Professional Services",
  customerNoun: "Client",
  teamMemberNoun: "Advisor",
  serviceNoun: "Strategy Session",
  bookingLabel: "Book Strategy Session",
  location: "Global Remote Hub",
  brandColor: "#0B1F3A",

  // Default Demo Lead Profile (Used for 1-Click Auto-Fill)
  demoLead: {
    name: "Alex Morgan",
    phone: "9876543221",
    email: "alex.morgan@company.com",
    serviceInterest: "AI Funnel Automation",
    scale: "Growth Stage ($500k+ ARR)",
    timeline: "Immediate Kickoff",
    readiness: "CRM & Workflow Ready",
    budget: "$10k – $25k",
    intake: "Next 30 Days",
    hub: "Global Remote Hub",
    defaultSlot: "Tomorrow, 3:00 PM"
  },

  // Screen 1: Intake & Assessment Form
  formTitle: "Free AI Funnel Assessment",
  formSubtitle: "Get an instant, customized diagnostic of your growth pipeline. Our AI analyzes your requirements in under 30 seconds and connects directly on WhatsApp.",
  formButtonText: "Generate My AI Funnel Plan",

  // Screen 2 & 3: WhatsApp Chat Simulation Messages
  chatMessages: {
    welcome: "Hi {name} 👋 Thanks for requesting an assessment from <strong>{businessName}</strong>! To recommend the highest-ROI funnel architecture, may I know your current business stage or primary objective?",
    welcomeAck: "Got it, {name}! Profile recorded: <strong>{qualification}</strong> 🚀 Proceeding to the <strong>AI Qualification Layer</strong> to analyze your solution match, budget fit, and launch readiness.",
    solutionQuestion: "Great. Which core AI automation solution is your top priority right now?",
    budgetQuestion: "What is your approximate implementation budget range, and what is your target launch timeline?",
    recommendation: "Thanks {name}. Based on your profile, high-fit automation architectures are available with estimated 4.8x ROI. Would you like to schedule a free 1-on-1 strategy session with our <strong>{location} team</strong>?",
    bookingConfirmation: "✅ 1-on-1 {serviceNoun} confirmed for <strong id=\"waConfirmSlotText\">{slot}</strong>. Our senior solutions specialist will review your audit in advance. We'll send a calendar reminder before the call."
  },

  // Screen 3: AI Qualification Engine & Scoring
  qualificationQuestions: {
    quickReplies: [
      { code: "AI Funnel", label: "⚡ AI Funnel System", isDefault: true },
      { code: "Revenue Engine", label: "📈 Revenue Engine" },
      { code: "Workflow AI", label: "🔄 Workflow Automation" },
      { code: "Custom Stack", label: "💼 Custom Systems" }
    ],
    score: 96,
    scoreMax: 100,
    leadBadge: "HOT LEAD",
    badgeColor: "rose",
    metrics: [
      { label: "Solution Match", value: "98% Match", subtext: "High-Intent Fit" },
      { label: "Budget Viability", value: "100% Viable", subtext: "$10k–$25k Tier Aligned" },
      { label: "Readiness Score", value: "Turnkey Ready", subtext: "CRM API Integrated" },
      { label: "Projected ROI", value: "4.8x Expected", subtext: "Clear Pipeline Growth" }
    ],
    dossierPoints: [
      {
        title: "Operational Feasibility:",
        text: "Client profile directly satisfies implementation prerequisites for rapid 14-day AI Funnel deployment across multi-channel inbound capture and automated conversion.",
        icon: "check-circle-2",
        color: "emerald"
      },
      {
        title: "Budget & Financial Viability:",
        text: "Declared implementation budget ($10k–$25k) covers end-to-end setup, WhatsApp Cloud API integration, CRM synchronization, and customized qualification prompt engineering.",
        icon: "check-circle-2",
        color: "blue"
      },
      {
        title: "Implementation Acceleration:",
        text: "Zero custom infrastructure needed. AI identified turnkey compatibility with existing CRM stack — eliminating onboarding delays and cutting launch cycle from 8 weeks to 10 days.",
        icon: "sparkles",
        color: "amber"
      }
    ],
    matchedPackages: [
      { name: "Enterprise AI Funnel Suite", detail: "Multi-Channel Inbound + WhatsApp • $18,500/yr", badge: "High Fit", badgeClass: "bg-emerald-100 text-emerald-800" },
      { name: "Revenue Accelerator Stack", detail: "Automated Qualification & Routing • $22,000/yr", badge: "Max ROI", badgeClass: "bg-emerald-100 text-emerald-800" },
      { name: "Turnkey Workflow Engine", detail: "CRM Webhook Sync + Alerts • $15,000/yr", badge: "Fast Deploy", badgeClass: "bg-blue-100 text-blue-800" },
      { name: "Sprint Pilot Implementation", detail: "Core Inbound Bot + Slot Booking • $12,500/yr", badge: "Quickstart", badgeClass: "bg-emerald-100 text-emerald-800" }
    ]
  },

  // Screen 4: Appointment & Booking Management Desk
  appointmentOptions: {
    advisorName: "Sarah Jenkins",
    advisorInitials: "SJ",
    advisorTitle: "Senior Solutions Director",
    advisorBranch: "Global Architecture Team • 180+ Enterprise Funnels Deployed",
    callDuration: "30-Min Strategy Call",
    guaranteeText: "100% Free Strategy Session",
    slots: [
      { id: "slotCard1", time: "Tomorrow, 11:00 AM", period: "Morning", badge: "2 slots open", isDefault: false },
      { id: "slotCard2", time: "Tomorrow, 3:00 PM", period: "★ Preferred", badge: "Recommended", isDefault: true },
      { id: "slotCard3", time: "Day after tomorrow, 5:00 PM", period: "Evening", badge: "1 slot open", isDefault: false }
    ],
    requiredDocumentsTitle: "Strategy Session Agenda & Preparation",
    requiredDocuments: [
      "Current Pipeline Volume & Conversion Data",
      "Core Target Customer Persona Overview",
      "Existing CRM & Marketing Tool Checklist",
      "Q1/Q2 Growth & Revenue Objectives"
    ],
    workflowTimeline: [
      { time: "24 Hours Prior", text: "WhatsApp calendar sync confirmation sent to client with session agenda." },
      { time: "2 Hours Prior", text: "Automated meeting reminder sent with Google Meet link & briefing deck." },
      { time: "Immediate", text: "Qualified client dossier routed directly to senior solutions director." }
    ]
  },

  // Screen 5: Team Alert & Lead Management Command Center
  leadSheet: {
    records: [
      {
        initials: "AM",
        name: "Alex Morgan",
        isHot: true,
        contact: "+91 98XXXXXX21",
        scale: "Growth Stage ($500k+ ARR)",
        targetSolution: "AI Funnel System ⚡",
        territory: "Global Remote Hub",
        budget: "$10k–$25k",
        readiness: "Readiness: Verified",
        leadScore: "96/100",
        stage: "Strategy Call Booked",
        slot: "Tomorrow 3:00 PM"
      },
      {
        initials: "MV",
        name: "Marcus Vance",
        isHot: false,
        contact: "+1 415XXXXX89",
        scale: "Series A Tech",
        targetSolution: "Revenue Engine 📈",
        territory: "North America Hub",
        budget: "$25k–$50k",
        readiness: "Readiness: CRM Ready",
        leadScore: "84/100",
        stage: "Discovery Scheduled",
        slot: "Day after 11:00 AM"
      },
      {
        initials: "ER",
        name: "Elena Rostova",
        isHot: false,
        contact: "+44 20XXXXX44",
        scale: "B2B Professional",
        targetSolution: "Workflow AI 🔄",
        territory: "EMEA Regional Hub",
        budget: "$15k–$30k",
        readiness: "Readiness: Scoping",
        leadScore: "76/100",
        stage: "Proposal Sent",
        slot: "Friday 4:00 PM"
      }
    ]
  },

  // Screen 6: Executive Analytics Suite
  dashboardMetrics: [
    { id: "newLeads", count: "12", label: "Inbound Enquiries", subtext: "100% captured", icon: "user-plus", color: "blue" },
    { id: "aiQualified", count: "10", label: "AI Qualified", subtext: "83.3% qualification", icon: "bot", color: "emerald" },
    { id: "bookedSlots", count: "6", label: "Strategy Calls", subtext: "50.0% conversion", icon: "calendar", color: "indigo" },
    { id: "remindersSent", count: "8", label: "Reminders Sent", subtext: "0% no-show rate", icon: "bell", color: "amber" },
    { id: "hotLeads", count: "4", label: "High Intent", subtext: "Immediate priority", icon: "flame", color: "rose" },
    { id: "appsStarted", count: "3", label: "Pipelines Live", subtext: "Active sprints", icon: "file-check-2", color: "teal" }
  ],

  // Screen 6: 5-Stage Funnel Pipeline
  leadStages: [
    { num: 1, name: "1. Enquiry", count: "12 Enquiries", pct: "100%", subtext: "Assessment Intake Form", barWidth: "100%", color: "blue", latency: "0s Response Latency" },
    { num: 2, name: "2. AI Qualified", count: "10 Qualified", pct: "83.3%", subtext: "Instant WhatsApp Bot", barWidth: "83.3%", color: "emerald", latency: "2 Filtered (Below Threshold)" },
    { num: 3, name: "3. Scheduled", count: "6 Strategy Calls", pct: "50.0%", subtext: "Calendar Auto-Sync", barWidth: "50%", color: "indigo", latency: "60% of Qualified book slot" },
    { num: 4, name: "4. Scoping", count: "4 Proposals", pct: "33.3%", subtext: "Automated Diagnostics", barWidth: "33.3%", color: "amber", latency: "Briefs Dispatched" },
    { num: 5, name: "5. Won / Active", count: "3 Implementations", pct: "25.0%", subtext: "Active Launch Sprints", barWidth: "25%", color: "teal", latency: "Immediate Q1 Launch" }
  ],

  // Solution Categories (Donut Chart)
  solutionDistribution: [
    { name: "⚡ AI Funnel Systems", share: "45%", count: "5 Clients", color: "#0B1F3A" },
    { name: "📈 Revenue Engines", share: "25%", count: "3 Clients", color: "#2563EB" },
    { name: "🔄 Workflow Automation", share: "18%", count: "2 Clients", color: "#25D366" },
    { name: "💼 Custom Architecture", share: "12%", count: "2 Clients", color: "#F59E0B" }
  ],

  // Smart Routing Telemetry
  smartRouting: [
    { name: "Global Remote Hub (Enterprise Team)", leads: 5, pct: "41.6%", color: "waGreen" },
    { name: "North America Solutions Desk", leads: 4, pct: "33.3%", color: "blue-600" },
    { name: "EMEA & APAC Operations Hub", leads: 3, pct: "25.0%", color: "purple-600" }
  ]
};

// Global helper to access config safely with fallbacks
window.getDemoConfig = function() {
  return window.DEMO_CONFIG || {};
};

// Helper to interpolate string templates like "{businessName} {name}"
window.interpolateConfig = function(str, data) {
  if (!str) return '';
  const cfg = window.getDemoConfig();
  const merged = { ...cfg, ...data };
  return str.replace(/\{(\w+)\}/g, function(match, key) {
    return merged[key] !== undefined ? merged[key] : match;
  });
};
