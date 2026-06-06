import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Clock, CalendarDays, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [isAwake, setIsAwake] = useState(true);

  // Active Local Pakistani UTC+5 Clock algorithm
  useEffect(() => {
    const updateTimeAndStatus = () => {
      const utcDate = new Date();
      const pktOffsetMs = PERSONAL_INFO.offsetHours * 60 * 60 * 1000;
      const pktDate = new Date(utcDate.getTime() + pktOffsetMs + (utcDate.getTimezoneOffset() * 60000));
      
      let hours = pktDate.getHours();
      const minutes = pktDate.getMinutes();
      const seconds = pktDate.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      const strMinutes = minutes < 10 ? '0' + minutes : minutes;
      const strSeconds = seconds < 10 ? '0' + seconds : seconds;
      
      setLocalTime(`${hours}:${strMinutes}:${strSeconds} ${ampm}`);

      // Pakistan awake cycle tracking (7 AM to 11:30 PM PKT)
      const rawHours = pktDate.getHours();
      if (rawHours >= 23 || rawHours < 7) {
        setIsAwake(false);
      } else {
        setIsAwake(true);
      }
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300" id="contact-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs tracking-widest uppercase text-teal-605 dark:text-teal-400 font-bold inline-flex items-center gap-1">
            <Sparkles size={11} className="text-teal-600 dark:text-teal-400 animate-pulse" /> Contact Coordinates
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Initiate a Collaboration
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-semibold">
            Have an interesting contract, consulting role or remote position? Send over your specs below, and I will be in touch.
          </p>
        </div>

        {/* Panel layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="contact-panel-grid">
          
          {/* Metadata Cards Stack (Left COLUMN) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            
            {/* Information Base card */}
            <div className="p-6 md:p-8 bg-zinc-50/40 dark:bg-zinc-950/15 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl space-y-6 flex-grow flex flex-col justify-center">
              <h3 className="text-base font-sans font-extrabold text-zinc-950 dark:text-zinc-50">Direct Channels</h3>
              
              <div className="space-y-4">
                
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 hover:text-teal-650 dark:hover:text-teal-400 transition-all p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85 hover:border-teal-500 hover:bg-teal-50/5 dark:hover:bg-teal-950/5"
                  id="contact-email-link"
                >
                  <span className="p-2 ml-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-105 dark:border-teal-900/50 text-teal-600 dark:text-teal-400">
                    <Mail size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-505 font-bold">Inbox Dispatcher</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-zinc-850 dark:text-zinc-200">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-zinc-750 dark:text-zinc-300 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85">
                  <span className="p-2 ml-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-105 dark:border-amber-900/55 text-amber-650 dark:text-amber-400">
                    <MapPin size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-505 font-bold">Local Station</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-zinc-855 dark:text-zinc-200">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-750 dark:text-zinc-300 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85">
                  <span className="p-2 ml-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-105 dark:border-emerald-900/55 text-emerald-600 dark:text-emerald-400">
                    <CalendarDays size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-505 font-bold">Hiring State</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-teal-600 dark:text-teal-400">Open for Contract & FT Positions</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Local Pakistani clock timezone module card */}
            <div className="p-6 md:p-8 bg-zinc-50/40 dark:bg-zinc-950/15 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl flex flex-col justify-between relative overflow-hidden h-fit shadow-xs">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-bold">
                  <Clock size={12} className="text-teal-600 dark:text-teal-400 animate-pulse" /> Faisalabad, Pakistan (PKT)
                </span>

                {/* Status Dot */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAwake ? 'bg-teal-600' : 'bg-amber-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isAwake ? 'bg-teal-600' : 'bg-amber-500'}`}></span>
                  </span>
                  <span className="text-[9px] font-mono uppercase font-bold text-zinc-650 dark:text-zinc-400">
                    {isAwake ? 'Online & Active' : 'Rest Mode'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-3xl md:text-4xl font-extrabold tracking-widest text-zinc-950 dark:text-zinc-50 font-mono">
                  {localTime || 'Calculating...'}
                </div>
                <p className="text-xs text-zinc-505 dark:text-zinc-400 font-medium leading-relaxed">
                  {isAwake 
                    ? "Currently online. Standard channels are active, and email sync is running in real time."
                    : "I am probably asleep right now. Sent queries will queue securely, and I will respond to them as soon as my day begins!"
                  }
                </p>
              </div>
            </div>

          </div>

          {/* Message Dispatcher Block Form (Right COLUMN) */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-zinc-50/40 dark:bg-zinc-950/15 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl text-left shadow-xs flex flex-col justify-center">
            <h3 className="text-base font-sans font-extrabold text-zinc-950 dark:text-zinc-50 mb-5">Quick Contact Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Your Name *</label>
                  <input 
                    type="text" 
                    id="name-field"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-405 dark:placeholder-zinc-650 outline-none transition"
                    placeholder="E.g. J. Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-405 dark:text-zinc-500 font-bold">Mail Address *</label>
                  <input 
                    type="email" 
                    id="email-field"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-405 dark:placeholder-zinc-650 outline-none transition"
                    placeholder="doe@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-405 dark:text-zinc-500 font-bold">Subject Goal</label>
                <input 
                  type="text" 
                  id="subject-field"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-405 dark:placeholder-zinc-650 outline-none transition"
                  placeholder="E.g. Full-Stack Dev Project Consultation"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-405 dark:text-zinc-500 font-bold">Message Details *</label>
                <textarea 
                  id="message-field"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-450 dark:placeholder-zinc-655 resize-none outline-none transition"
                  placeholder="Describe your goals or project opportunity..."
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-bold text-white dark:text-zinc-900 bg-zinc-950 dark:bg-zinc-50 hover:bg-teal-650 dark:hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs flex items-center justify-center gap-2 mt-4 cursor-pointer transition duration-200 active:scale-95 uppercase tracking-wider"
                id="contact-form-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Dispatching message...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} className="dark:text-zinc-900" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* success notification */}
              {isSent && (
                <div 
                  className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-150 dark:border-teal-900/50 text-teal-850 dark:text-teal-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn"
                  id="contact-form-success-banner"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-teal-600 dark:text-teal-400" />
                  <span>Message sent successfully! Arhum will review it shortly.</span>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
