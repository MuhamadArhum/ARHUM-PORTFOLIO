import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Clock, CalendarDays, Sparkles, Lock, LogOut, Check, Eye, Trash2, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from '../firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState('');
  const [isAwake, setIsAwake] = useState(true);

  // Administrative Panel States
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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

  // Listen to Firebase authentication states
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthError(null);
    });
    return () => unsubscribe();
  }, []);

  // Listen to incoming messages in real-time if signed in as Muhammad Arhum
  useEffect(() => {
    if (!currentUser || currentUser.email !== 'muhamadarhum425@gmail.com') {
      setMessages([]);
      return;
    }

    setMessagesLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: any[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      setMessagesLoading(false);
    }, (error) => {
      console.error('Snapshot reading failed:', error);
      try {
        handleFirestoreError(error, OperationType.LIST, 'messages');
      } catch (e: any) {
        setAuthError('Firestore session expired or access rejected.');
      }
      setMessagesLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const messageData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Direct Inquire',
        message: formData.message,
        status: 'unread',
        createdAt: serverTimestamp(),
      };
      
      const messagesRef = collection(db, 'messages');
      await addDoc(messagesRef, messageData);
      
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('Inquiry submission failed:', error);
      try {
        handleFirestoreError(error, OperationType.CREATE, 'messages');
      } catch (err: any) {
        setSubmitError('System unable to store inquiry coordinates: Server offline.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google popup authentications
  const handleSignIn = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google Sign-In aborted:', error);
      setAuthError('Authentication aborted or connection interrupted.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAdminPanelOpen(false);
    } catch (error) {
      console.error('Sign-Out failed:', error);
    }
  };

  const handleUpdateStatus = async (msgId: string, currentStatus: string) => {
    let nextStatus = 'unread';
    if (currentStatus === 'unread') {
      nextStatus = 'read';
    } else if (currentStatus === 'read') {
      nextStatus = 'responded';
    } else {
      nextStatus = 'unread';
    }

    try {
      const msgRef = doc(db, 'messages', msgId);
      await updateDoc(msgRef, { status: nextStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${msgId}`);
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    try {
      const msgRef = doc(db, 'messages', msgId);
      await deleteDoc(msgRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${msgId}`);
    }
  };

  // Format firestore timestamps safely
  const formatTime = (ts: any) => {
    if (!ts) return 'just now';
    try {
      return ts.toDate().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'recent';
    }
  };

  const isAdminUser = currentUser?.email === 'muhamadarhum425@gmail.com';

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300" id="contact-section">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* Header Block Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1">
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
                  className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85 hover:border-teal-500 hover:bg-teal-50/5 dark:hover:bg-teal-950/5"
                  id="contact-email-link"
                >
                  <span className="p-2 ml-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 text-teal-600 dark:text-teal-400">
                    <Mail size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-bold">Inbox Dispatcher</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-zinc-850 dark:text-zinc-200">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-zinc-750 dark:text-zinc-300 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85">
                  <span className="p-2 ml-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/55 text-amber-600 dark:text-amber-400">
                    <MapPin size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-bold">Local Station</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-zinc-850 dark:text-zinc-200">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-755 dark:text-zinc-300 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85">
                  <span className="p-2 ml-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/55 text-emerald-600 dark:text-emerald-400">
                    <CalendarDays size={14} />
                  </span>
                  <div>
                    <span className="block text-[8.5px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-bold">Hiring State</span>
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
                  <span className="text-[9px] font-mono uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    {isAwake ? 'Online & Active' : 'Rest Mode'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-3xl md:text-4xl font-extrabold tracking-widest text-zinc-950 dark:text-zinc-50 font-mono">
                  {localTime || 'Calculating...'}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
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
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition"
                    placeholder="E.g. J. Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Mail Address *</label>
                  <input 
                    type="email" 
                    id="email-field"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition"
                    placeholder="doe@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Subject Goal</label>
                <input 
                  type="text" 
                  id="subject-field"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition"
                  placeholder="E.g. Full-Stack Dev Project Consultation"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-field" className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Message Details *</label>
                <textarea 
                  id="message-field"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 resize-none outline-none transition"
                  placeholder="Describe your goals or project opportunity..."
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-bold text-white dark:text-zinc-900 bg-zinc-950 dark:bg-zinc-50 hover:bg-teal-650 dark:hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs flex items-center justify-center gap-2 cursor-pointer transition duration-200 active:scale-95 uppercase tracking-wider"
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
                    className="p-3 mt-2 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 text-teal-900 dark:text-teal-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn"
                    id="contact-form-success-banner"
                  >
                    <CheckCircle2 size={15} className="shrink-0 text-teal-600 dark:text-teal-400" />
                    <span>Message sent successfully! Arhum will review it shortly.</span>
                  </div>
                )}

                {/* error notification */}
                {submitError && (
                  <div className="p-3 mt-2 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 text-xs font-semibold flex items-center gap-2 outline-none">
                    <ShieldAlert size={15} className="shrink-0 text-red-650" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>

            </form>
          </div>

        </div>

        {/* SECURE ADMIN MESSAGES BOX PANEL */}
        <div className="mt-8 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300">
          
          {/* Header Toggle bar */}
          <button
            onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
            className="w-full flex items-center justify-between p-4 px-6 bg-zinc-50 dark:bg-zinc-950/45 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="p-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-650 dark:text-zinc-400">
                <Lock size={12} />
              </span>
              <span className="font-sans font-bold text-xs tracking-wide uppercase">🔐 System Owner Admin Portal</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {currentUser && (
                <span className="text-[10px] bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md font-mono font-bold">
                  {currentUser.email}
                </span>
              )}
              <span className="text-xs font-bold text-teal-600 hover:underline">
                {isAdminPanelOpen ? 'Collapse panel' : 'Expand panel'}
              </span>
            </div>
          </button>

          {/* Collapsible Content */}
          {isAdminPanelOpen && (
            <div className="p-6 bg-white dark:bg-zinc-905 border-t border-zinc-200/80 dark:border-zinc-800 space-y-6 text-left">
              
              {/* Not Logged In Scene */}
              {!currentUser && (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 max-w-md mx-auto">
                  <div className="h-10 w-10 text-zinc-400 dark:text-zinc-600 flex items-center justify-center p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Secure Lockout Gate</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1">
                      Are you Muhammad Arhum? Authenticate using your secure Google email matching the production blueprint credentials to organize inquiries.
                    </p>
                  </div>
                  <button
                    onClick={handleSignIn}
                    className="px-4 py-2 text-xs font-bold bg-zinc-950 dark:bg-zinc-50 hover:bg-teal-650 dark:hover:bg-teal-500 text-white dark:text-zinc-950 rounded-lg cursor-pointer transition active:scale-95 uppercase tracking-wide"
                  >
                    Authorize via Google LogIn
                  </button>
                  {authError && (
                    <p className="text-[10px] font-mono text-medium text-red-500">{authError}</p>
                  )}
                </div>
              )}

              {/* Logged In but Access Denied Scene */}
              {currentUser && !isAdminUser && (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 max-w-sm mx-auto">
                  <div className="h-10 w-10 text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-150 rounded-xl flex items-center justify-center p-2">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Access Coordinates Rejected</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1 font-mono">
                      Security rules blocked read request for: <span className="font-bold text-red-550">{currentUser.email}</span>. Only <span className="font-bold">muhamadarhum425@gmail.com</span> has verified clearance.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-1.5 text-xs font-extrabold bg-zinc-50 border border-zinc-2 w-full text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}

              {/* Admin Panel authorized content view */}
              {currentUser && isAdminUser && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-150 dark:border-zinc-800">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5">
                        <Check size={16} className="text-teal-500" /> Arhum's Inquiry Feed
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Real-time feed connected directly into the Firestore database instance.
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 bg-zinc-50 hover:bg-red-50 hover:border-red-105 hover:text-red-650 text-xs font-bold rounded-lg text-zinc-650 dark:text-zinc-350 transition cursor-pointer"
                    >
                      <LogOut size={11} className="shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {messagesLoading ? (
                    <div className="py-12 text-center text-xs text-zinc-400 font-mono animate-pulse uppercase tracking-wider">
                      Syncing messages database...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-center space-y-2">
                      <p className="text-xs text-zinc-455 dark:text-zinc-500 font-semibold">No inquiries submitted yet.</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-555 font-mono">Test the system by filling the contact form above!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${
                            msg.status === 'unread' 
                              ? 'bg-zinc-50/50 dark:bg-zinc-950/15 border-teal-525 dark:border-teal-900/60 ring-1 ring-teal-500/10' 
                              : 'bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Headline bar */}
                            <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                              <div>
                                <span className="block text-xs font-extrabold text-zinc-90 w-full truncate">{msg.name}</span>
                                <span className="block text-[10px] font-mono text-zinc-400 select-all">{msg.email}</span>
                              </div>
                              <span className={`text-[8.5px] font-mono tracking-wider font-bold px-2 py-0.5 rounded-full uppercase ${
                                msg.status === 'unread'
                                  ? 'bg-red-50 dark:bg-red-950/30 text-red-650 dark:text-red-400'
                                  : msg.status === 'read'
                                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-650 dark:text-blue-400'
                                  : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400'
                              }`}>
                                {msg.status}
                              </span>
                            </div>

                            {/* Message Core */}
                            <div className="space-y-1">
                              {msg.subject && (
                                <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-300">
                                  Sub: <span className="font-semibold text-zinc-700 dark:text-zinc-250">{msg.subject}</span>
                                </p>
                              )}
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold break-words bg-zinc-50/30 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-150/40 dark:border-zinc-850">
                                {msg.message}
                              </p>
                            </div>
                          </div>

                          {/* Controls Footer */}
                          <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                            <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold lowercase">
                              {formatTime(msg.createdAt)}
                            </span>

                            <div className="flex items-center gap-2">
                              {/* Toggle read button */}
                              <button
                                onClick={() => handleUpdateStatus(msg.id, msg.status)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 hover:border-teal-500 dark:hover:border-teal-900 text-zinc-600 dark:text-zinc-300 font-bold rounded-lg transition cursor-pointer"
                                title="Change status"
                              >
                                <Check size={11} className="text-teal-600 shrink-0" />
                                <span>Cycle status</span>
                              </button>

                              {/* Delete message button */}
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1 px-1.5 border border-zinc-200 dark:border-zinc-850 hover:bg-red-50 hover:border-red-105 hover:text-red-650 text-zinc-450 dark:hover:text-red-405 dark:text-zinc-505 rounded-lg transition cursor-pointer"
                                title="Delete coordinates permanently"
                              >
                                <Trash2 size={11.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
