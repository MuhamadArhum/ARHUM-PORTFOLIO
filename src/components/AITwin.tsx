import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, ArrowRight, User, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AITwin() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Starter queries for recruiting & consulting managers
  const starterQuestions = [
    { text: 'What is Arhum\'s core tech stack?', label: 'Core Stack' },
    { text: 'Is Arhum open to remote work or contract roles?', label: 'Role Availability' },
    { text: 'What kind of mobile projects has he built?', label: 'Mobile History' },
    { text: 'Tell me about his experience optimizing systems.', label: 'Performance Work' },
  ];

  // Set default welcoming message from AI Twin on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: "Hi there! I am Arhum's **AI Twin**, an intelligent copilot module connected direct to server-side Gemini intelligence. Ask me anything relative to his professional milestones, full-stack microservices, database architectures, or freelance contract availability!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [messages]);

  // Handle autoscroll to keep active bubble visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok) {
        throw new Error('API server failed to respond.');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: data.text || "I ran into a temporary disconnect in my cloud sync nodes. Please send Arhum an email directly at muhamadarhum425@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat AI connection error:', error);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: "My server twin could not link up. Please email me directly at **muhamadarhum425@gmail.com**!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Conversation refreshed. I am ready to answer any questions about Muhammad Arhum's software engineering background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Safe renderer to parse simple bullet markdown from Gemini responses safely
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Bold rendering **text**
      let renderedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-zinc-950 font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const finalContent = parts.length > 0 ? parts : renderedLine;

      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex gap-2 items-start pl-2 text-zinc-700 py-1" id={`bullet-${idx}`}>
            <span className="text-teal-600 mt-1.5 shrink-0 font-extrabold">&bull;</span>
            <span className="text-xs font-semibold">{finalContent ? (typeof finalContent === 'string' ? finalContent.substring(2) : finalContent) : ''}</span>
          </div>
        );
      }
      return <p key={idx} className="text-xs font-medium text-zinc-700 leading-relaxed mb-1">{finalContent}</p>;
    });
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-y border-zinc-100" id="ai-twin-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Intro Layout and Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description Info Panel */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[10px] font-bold text-teal-800 uppercase tracking-wider mb-2">
              <Sparkles size={11} className="text-teal-600 animate-pulse" />
              Gemini AI Integration
            </div>
            
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 tracking-tight leading-tight">
              Instant AI Assistant <span className="text-teal-600 block sm:inline">Recruitment Sandbox</span>
            </h2>
            
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              Save time reading resumes! Our custom server proxies routing safely via Gemini endpoints, preserving secret API keys on the server while offering responsive knowledge relative to:
            </p>

            <div className="space-y-3 font-mono text-xs text-zinc-650">
              <div className="flex gap-2.5 items-center">
                <span className="p-1 px-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-teal-600 font-extrabold">Technical Stack</span>
                <span className="text-zinc-500 font-semibold">Frameworks, DB indexes, APIs & Docker.</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <span className="p-1 px-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-teal-600 font-extrabold">Availability</span>
                <span className="text-zinc-500 font-semibold font-sans">Full-time roles, contracts & time zones.</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <span className="p-1 px-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-teal-600 font-extrabold">Engineering Specs</span>
                <span className="text-zinc-500 font-semibold">Latencies, modular schemas & architecture.</span>
              </div>
            </div>

            <p className="text-[10px] text-zinc-400 font-mono italic">
              *The environment secures full environment key encryption ensuring secure client proxies.
            </p>
          </div>

          {/* Interactive Modern Chat Window Container (Right) */}
          <div className="lg:col-span-7 flex flex-col h-[520px] rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs relative" id="ai-chat-interface-box">
            
            {/* Window Header */}
            <div className="p-3.5 bg-zinc-55 border-b border-zinc-200/80 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                  </span>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1">
                    Arhum AI Copilot <Sparkles size={11} className="text-teal-500" />
                  </span>
                  <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">Active Status</span>
                </div>
              </div>

              {/* Clear button */}
              <button 
                onClick={handleClearHistory}
                className="text-zinc-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-zinc-100 transition-all cursor-pointer"
                title="Discard memories"
                id="clear-chat-history-btn"
              >
                <Trash2 size={13.5} />
              </button>
            </div>

            {/* Scrollable chat body */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-zinc-50/50 flex flex-col">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto text-left'}`}
                >
                  {/* Icon label */}
                  <div className={`p-2 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center border text-xs font-bold ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-xs' 
                      : 'bg-white border-zinc-200 text-zinc-500'
                  }`}>
                    {msg.sender === 'user' ? <User size={13} /> : <MessageSquare size={13} />}
                  </div>

                  {/* Bubble body with beautiful zinc framing */}
                  <div className={`p-3 rounded-lg flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${
                    msg.sender === 'user'
                      ? 'bg-white border border-teal-100 text-zinc-900 rounded-tr-none text-left'
                      : 'bg-white border border-zinc-200/80 text-zinc-700 rounded-tl-none'
                  }`}>
                    <div className="space-y-1">
                      {msg.sender === 'user' ? (
                        <p className="text-xs font-semibold text-zinc-800 leading-relaxed">{msg.text}</p>
                      ) : (
                        renderMessageText(msg.text)
                      )}
                    </div>
                    <span className="mt-1 text-[8px] text-zinc-400 font-mono font-medium italic">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loading placeholder animation */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto text-left" id="loading-bubble-container">
                  <div className="p-2 rounded-lg h-8 w-8 bg-white border border-zinc-200 flex items-center justify-center">
                    <MessageSquare size={13} className="text-teal-500 animate-pulse" />
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-zinc-200 text-zinc-500 rounded-tl-none flex items-center gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-bounce" />
                    <span className="text-[10px] font-mono pl-1 text-zinc-400 font-semibold font-sans">Drafting response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starters suggested chips */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50/70 text-left z-10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-1">Common Questions</span>
                <div className="flex flex-wrap gap-1.5">
                  {starterQuestions.map((q) => (
                    <button
                      key={q.text}
                      onClick={() => handleSendMessage(q.text)}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-white border border-zinc-250 hover:border-teal-500 text-zinc-650 hover:text-teal-700 font-bold flex items-center gap-1 cursor-pointer transition-all duration-150"
                      id={`starter-btn-${q.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      <span>{q.label}</span>
                      <ArrowRight size={8} className="text-teal-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form panel */}
            <div className="p-3 bg-white border-t border-zinc-200 z-10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={inputMessage}
                  required
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask my AI Twin... (e.g., 'What systems work did you do?')"
                  className="flex-grow bg-zinc-50 border border-zinc-200 focus:border-teal-500 text-zinc-850 text-xs rounded-lg px-3 py-2.5 placeholder-zinc-400 outline-none transition"
                  id="chat-input-text-field"
                  disabled={isLoading}
                />
                
                <button 
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-2.5 bg-zinc-950 disabled:opacity-40 hover:bg-teal-600 text-white rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs active:scale-95"
                  id="chat-send-submit-btn"
                >
                  <Send size={13} />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
