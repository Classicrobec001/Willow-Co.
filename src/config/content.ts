// ============================================================================
// Marketing copy for the site's non-booking pages and sections.
//
// Kept separate from src/config/brand.ts (which holds the operational config:
// services, hours, contact, colors) so a client can rewrite the sales copy
// without touching anything the booking engine depends on. All generic,
// swap-ready placeholder content.
// ============================================================================

import { stock } from "./stock";

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  body: string;
  icon: string; // inline SVG path data (24x24 viewBox, stroke-based)
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string; // Unsplash photo id
}

export interface Faq {
  q: string;
  a: string;
}

export const stats: Stat[] = [
  { value: "12+", label: "Years on the block" },
  { value: "8,000+", label: "Appointments booked" },
  { value: "4.9★", label: "Average client rating" },
  { value: "60 sec", label: "To book online" },
];

// Simple stroke icons — path data drawn in a 24x24, currentColor stroke.
export const features: Feature[] = [
  {
    title: "Book in under a minute",
    body: "Pick a service, choose a time that actually works for you, and you're done. No phone tag, no waiting on hold.",
    icon: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
  },
  {
    title: "Senior stylists only",
    body: "Every chair is staffed by a fully-qualified stylist with years behind it. You're in expert hands from consult to finish.",
    icon: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12",
  },
  {
    title: "Honest, upfront pricing",
    body: "Every price is listed before you book. What you see is what you pay — no surprise add-ons at the register.",
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Products we'd use ourselves",
    body: "Sulfate-free, cruelty-free lines chosen for results and for your hair's long-term health — never the cheapest option.",
    icon: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
  },
  {
    title: "A studio you'll want to sit in",
    body: "Bright, calm, and unhurried. Complimentary coffee or tea, good music, and zero pressure to rush out the door.",
    icon: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  },
  {
    title: "Easy to reschedule",
    body: "Life happens. Change or cancel your appointment online any time up to a few hours before — no awkward calls.",
    icon: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Best haircut I've had in years. They actually listened, and the booking took me less time than finding parking.",
    name: "Jordan M.",
    detail: "Women's Cut & Style",
  },
  {
    quote:
      "My balayage came out exactly like the photo I brought in. The whole team is warm, and the studio is gorgeous.",
    name: "Priya S.",
    detail: "Full Balayage",
  },
  {
    quote:
      "I'm picky and hard to please. This is the first place I've re-booked before even leaving the chair.",
    name: "Alex R.",
    detail: "Men's Cut",
  },
  {
    quote:
      "Booked online at midnight, walked in the next day, walked out thrilled. This is how it should work.",
    name: "Dana W.",
    detail: "Root Touch-Up",
  },
];

export const team: TeamMember[] = [
  {
    name: "Maya Ellis",
    role: "Founder & Master Stylist",
    bio: "Fifteen years shaping hair across three cities. Maya opened the studio to slow things down and put craft first.",
    photo: "photo-1573497019940-1c28c88b4f3e",
  },
  {
    name: "Sofia Nguyen",
    role: "Colour Specialist",
    bio: "Balayage, corrective colour, and the kind of dimension that looks effortless. Sofia lives for a good before-and-after.",
    photo: "photo-1544005313-94ddf0286df2",
  },
  {
    name: "Daniel Cross",
    role: "Senior Barber & Stylist",
    bio: "Precision cuts and classic grooming with a modern edge. Daniel makes the chair feel like the best seat in the house.",
    photo: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Grace Okafor",
    role: "Stylist & Treatment Lead",
    bio: "Textured hair, restorative treatments, and honest advice. Grace will tell you what your hair actually needs.",
    photo: "photo-1494790108377-be9c29b29330",
  },
];

export const faqs: Faq[] = [
  {
    q: "Do I need to create an account to book?",
    a: "No. Pick a service, choose a time, and enter your details — that's it. You'll get a confirmation you can use to manage the appointment.",
  },
  {
    q: "What's your cancellation policy?",
    a: "You can reschedule or cancel online any time up to a few hours before your appointment. We just ask for a little notice so we can offer the slot to someone else.",
  },
  {
    q: "How long will my appointment take?",
    a: "Every service lists its duration before you book, so you'll know exactly how much time to set aside — from a 30-minute cut to a half-day of colour.",
  },
  {
    q: "Do you take walk-ins?",
    a: "When we can, yes — but chairs fill up fast. Booking online guarantees your spot with the stylist and time you want.",
  },
  {
    q: "I'm not sure which service to pick.",
    a: "Start with a consultation or the closest match, and mention what you're after in the notes. Your stylist will confirm the plan before anything begins.",
  },
];

export const values = [
  {
    title: "Craft over speed",
    body: "We'd rather do fewer heads beautifully than rush through a full book. Your appointment is never double-stacked.",
  },
  {
    title: "Everyone's welcome",
    body: "All hair types, all textures, all price points explained up front. No judgement, no jargon, no pressure.",
  },
  {
    title: "Built to last",
    body: "Healthy hair is the goal — cuts that grow out well and colour that stays kind to your strands over time.",
  },
];

export const galleryImages = stock.gallery;
