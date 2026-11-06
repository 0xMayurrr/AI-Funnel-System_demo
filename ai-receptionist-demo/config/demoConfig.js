/**
 * demoConfig.js - Universal Central Configuration for Buildicy AI Receptionist Demo
 * Product: Buildicy AI Receptionist — Interactive Demo
 * Core Promise: "Never miss a call or WhatsApp enquiry again."
 */

window.DEMO_CONFIG = {
  // Brand & Business Identity
  businessName: "Bright Smile Dental Clinic",
  businessInitials: "BS",
  tagline: "24/7 AI Voice & WhatsApp Front Desk Receptionist",
  industry: "Healthcare / Dental Clinic",
  customerNoun: "Patient",
  teamMemberNoun: "Receptionist",
  serviceNoun: "Appointment",
  bookingLabel: "Book Appointment",
  location: "Chennai",
  brandColor: "#0B7A4B",

  // Simulated Clinic Contact & Doctor Info
  contactPhone: "+91 44 2834 9000",
  dentistName: "Dr. Aravind Swaminathan, MDS",
  clinicAddress: "142 Anna Salai, T. Nagar, Chennai",

  // Default Demo Patient Profile (Priya)
  demoPatient: {
    name: "Priya Sharma",
    phone: "9876543221",
    email: "priya.sharma@example.com",
    serviceInterest: "Dental Cleaning & Polish",
    preferredDate: "Tomorrow",
    preferredTime: "3:00 PM",
    defaultSlot: "Tomorrow, 3:00 PM",
    status: "Confirmed",
    chiefComplaint: "Routine oral prophylaxis & preventive cleaning"
  },

  // Screen 1: Incoming Call & WhatsApp Enquiry
  inquiry: {
    source: "WhatsApp & Inbound Call",
    initialMessage: "Hi, I want to book an appointment for dental cleaning tomorrow afternoon.",
    timestamp: "10:14 AM",
    callerId: "+91 98XXXXXX21 (Priya)",
    channel: "WhatsApp Official Cloud API"
  },

  // Screen 2 & 3: Chat Simulation Script
  chatMessages: {
    greeting: "Hello Priya! 👋 Thank you for reaching out to <strong>Bright Smile Dental Clinic</strong>. I'm your AI Receptionist. I'd be happy to schedule your dental cleaning appointment with Dr. Aravind Swaminathan.",
    serviceConfirm: "A standard Dental Cleaning & Oral Checkup takes approximately 45 minutes. May I confirm if you prefer a morning or afternoon slot tomorrow?",
    patientReply1: "Afternoon around 3:00 PM would be perfect for me please.",
    slotPitch: "Checking our live clinic calendar... We have three available slots tomorrow afternoon with Dr. Aravind Swaminathan. Please select the time that works best for you:",
    confirmation: "✅ Wonderful! Your dental cleaning appointment is confirmed for <strong id=\"waConfirmSlotText\">Tomorrow at 3:00 PM</strong> at our Chennai clinic. Our receptionist team has prepared your chart."
  },

  // Screen 3: Available Time Slots
  availableSlots: [
    { id: "slot1", time: "Tomorrow, 2:15 PM", period: "Afternoon", badge: "Doctor Available" },
    { id: "slot2", time: "Tomorrow, 3:00 PM", period: "★ Recommended", badge: "Selected Slot", isDefault: true },
    { id: "slot3", time: "Tomorrow, 4:30 PM", period: "Evening", badge: "Doctor Available" }
  ],

  // Screen 4: Appointment Summary
  appointmentSummary: {
    serviceName: "Comprehensive Dental Cleaning & Checkup",
    duration: "45 Minutes",
    dentist: "Dr. Aravind Swaminathan, MDS",
    clinicRoom: "Suite 3B - Hygiene & Prophylaxis",
    preVisitInstructions: [
      "Please arrive 10 minutes prior to complete health history registration.",
      "Bring any existing dental X-rays taken in the past 12 months.",
      "No food or dark beverages 30 minutes before cleaning."
    ]
  },

  // Screen 5: Front Desk Staff Alert
  staffAlert: {
    title: "🚨 New Appointment Booked via AI Receptionist",
    patientName: "Priya Sharma",
    phone: "98XXXXXX21",
    service: "Dental Cleaning & Checkup",
    slot: "Tomorrow, 3:00 PM",
    assignedDentist: "Dr. Aravind Swaminathan",
    status: "Logged in Clinic CRM & Calendar",
    channel: "WhatsApp Bot Dispatch"
  },

  // Screen 6: Receptionist Dashboard KPI Metrics
  dashboardMetrics: {
    callsAnswered: 48,
    whatsAppHandled: 64,
    appointmentsBooked: 22,
    noShowsPrevented: "100%",
    humanHandoffs: 3,
    avgResponseLatency: "1.8 Seconds",
    afterHoursEnquiries: 19
  }
};

