/**
 * demoConfig.js - Central Configuration for Buildicy AI Automation Demo
 * Product: Buildicy AI Automation — Interactive Demo
 * Core Promise: "Automate repetitive back-office work and save hours every week."
 */

window.DEMO_CONFIG = {
  // Brand & Business Identity
  businessName: "Nexa Logistics",
  businessInitials: "NL",
  tagline: "Enterprise Autonomous Workflow & Document Orchestration",
  industry: "Logistics / Operations",
  customerNoun: "Record",
  teamMemberNoun: "Operations Manager",
  serviceNoun: "Automation Workflow",
  bookingLabel: "Run Automation",
  location: "Chennai",
  brandColor: "#1E3A8A",

  // Trigger Document Sample (Invoice INV-2043)
  sampleInvoice: {
    invoiceNumber: "INV-2043",
    vendorName: "Apex Shipping & Freight Ltd.",
    vendorGst: "33AABCA1234F1Z8",
    vendorPan: "AABCA1234F",
    invoiceDate: "Today, 10:15 AM",
    dueDate: "30 Days Net",
    amount: "₹45,000",
    taxAmount: "₹8,100",
    totalAmount: "₹53,100",
    poNumber: "PO-2026-891",
    lineItemsCount: 12,
    category: "Inbound Freight & Customs Clearance",
    department: "Finance & Accounts Payable",
    status: "Approved",
    assignedTo: "Finance Team"
  },

  // Step-by-Step Processing Pipeline
  processingSteps: [
    { id: 1, title: "Reading Document", desc: "OCR scanning PDF invoice layout & visual key-value pairs", durationMs: 700 },
    { id: 2, title: "Extracting Key Fields", desc: "Parsing Vendor GST, PO Number, Line Items, Net & Tax amounts", durationMs: 800 },
    { id: 3, title: "Validating Data", desc: "Matching 3-way reconciliation against ERP Purchase Order PO-2026-891", durationMs: 700 },
    { id: 4, title: "Updating System", desc: "Auto-posting voucher to SAP ERP & triggering AP payment queue", durationMs: 600 }
  ],

  // Before vs After Comparison Data
  efficiencyMetrics: {
    manualTime: "15 minutes",
    automatedTime: "20 seconds",
    timeSavedPercent: "98%",
    accuracyRate: "99.9%",
    costPerDocBefore: "₹180",
    costPerDocAfter: "₹4"
  },

  // Team Notification Payload
  notificationPayload: {
    channel: "#finance-alerts",
    subject: "Invoice INV-2043 processed",
    message: "Invoice INV-2043 processed. Amount: ₹45,000. Status: Approved. Assigned to: Finance Team.",
    timestamp: "Just now",
    erpSyncStatus: "Synchronized with SAP Ledger (Entry #GL-99120)"
  },

  // Automation Audit Log Items
  automationLogs: [
    {
      id: "LOG-9810",
      title: "Invoice processed",
      itemRef: "INV-2043 • Apex Shipping",
      timestamp: "Just now",
      duration: "18.4s",
      status: "Approved & Posted",
      badgeClass: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "LOG-9809",
      title: "Lead assigned & qualified",
      itemRef: "Enterprise Freight RFP • 1,200 TEU",
      timestamp: "14 mins ago",
      duration: "4.2s",
      status: "Routed to Sales Head",
      badgeClass: "bg-blue-100 text-blue-800"
    },
    {
      id: "LOG-9808",
      title: "Daily dispatch report generated",
      itemRef: "Fleet Telematics & Route Audit",
      timestamp: "1 hour ago",
      duration: "42.1s",
      status: "Emailed to 14 Stakeholders",
      badgeClass: "bg-purple-100 text-purple-800"
    },
    {
      id: "LOG-9807",
      title: "Vendor follow-up sent",
      itemRef: "Missing E-Way Bill Warning",
      timestamp: "2 hours ago",
      duration: "2.8s",
      status: "WhatsApp & Email Sent",
      badgeClass: "bg-amber-100 text-amber-800"
    }
  ],

  // Executive Dashboard Telemetry
  dashboardMetrics: {
    tasksAutomated: "1,420",
    hoursSaved: "184 hrs",
    errorsReduced: "99.4%",
    activeWorkflows: "8",
    monthlySavings: "₹2,45,000"
  },

  // Active Workflow Catalog
  activeWorkflows: [
    { name: "Invoice & AP Processing", trigger: "Inbound Email / PDF Upload", avgSpeed: "20 sec", runsToday: "148 runs", status: "Active" },
    { name: "Lead Qualification & Assignment", trigger: "Form Webhook / WhatsApp", avgSpeed: "4 sec", runsToday: "86 runs", status: "Active" },
    { name: "Daily Operations Report Generation", trigger: "Cron 06:00 AM Daily", avgSpeed: "45 sec", runsToday: "1 run", status: "Active" },
    { name: "Vendor Compliance Follow-up", trigger: "Missing Document Flag", avgSpeed: "3 sec", runsToday: "34 runs", status: "Active" }
  ]
};

