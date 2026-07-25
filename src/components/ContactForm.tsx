"use client";

import { useState } from "react";
import brand from "@/config/brand";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    // No backend needed: compose an email the visitor can send from their
    // own mail client. Swap this for a POST to your API/CRM when you have one.
    const subject = encodeURIComponent(`New enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${brand.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">Thanks — your message is ready to send</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve opened your email app with the details filled in. Prefer to book straight away?
        </p>
        <a
          href="/book"
          className="mt-5 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Book an appointment
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input id="name" name="name" required placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you're after — a service, a question, or a special request."
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Prefer to talk? Call us at{" "}
        <a href={`tel:${brand.contact.phone}`} className="text-primary hover:underline">
          {brand.contact.phone}
        </a>
        .
      </p>
    </form>
  );
}
