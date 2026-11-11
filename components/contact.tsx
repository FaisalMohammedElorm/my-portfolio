"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, Send } from "lucide-react";
import { fadeUp, slideInLeft, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { personalInfo } from "@/data/profile";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: No backend is wired up yet. This opens the user's mail client
    // pre-filled with the message. Replace with a real API route / email
    // service (e.g. Resend, EmailJS, or a Next.js API route) for production.
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      form.subject || "Portfolio contact"
    )}&body=${encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    )}`;
    window.location.href = mailto;
    setStatus("sent");
  }

  function copyEmail() {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind, or just want to say hi? My inbox is open."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-2 space-y-4"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/50">Email</p>
                <p className="font-medium truncate">{personalInfo.email}</p>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors shrink-0"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-foreground/50">Phone</p>
                <p className="font-medium">{personalInfo.phone}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-foreground/50">Location</p>
                <p className="font-medium">{personalInfo.location}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-1.5 block">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium mb-1.5 block">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium mb-1.5 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary transition-colors resize-none"
                placeholder="Tell me a bit about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              <Send size={16} />
              {status === "sent" ? "Opening your mail client..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
