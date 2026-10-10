import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { members } from '../data/members';
import { GuestbookMessage } from '../types';

interface FinaleSceneProps {
  onReplayJourney: () => void;
}

export default function FinaleScene({ onReplayJourney }: FinaleSceneProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newSong, setNewSong] = useState("");

  // Load genuine local messages from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bts_guestbook_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load local guestbook", e);
    }
  }, []);

  const triggerPurpleConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#a855f7', '#c084fc', '#e9d5ff', '#ec4899', '#ffffff', '#f5e0b7']
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newMsg: GuestbookMessage = {
      id: Date.now(),
      author: newAuthor.trim() || "ARMY",
      text: newText.trim(),
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      favoriteSong: newSong.trim() || undefined
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem('bts_guestbook_messages', JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    setNewText("");
    setNewAuthor("");
    setNewSong("");
    triggerPurpleConfetti();
  };

  const stageMembers = [
    members.find(m => m.id === 'jhope')!,
    members.find(m => m.id === 'jin')!,
    members.find(m => m.id === 'suga')!,
    members.find(m => m.id === 'rm')!,
    members.find(m => m.id === 'jimin')!,
    members.find(m => m.id === 'v')!,
    members.find(m => m.id === 'jungkook')!,
  ].filter(Boolean);

  return (
    <section id="final-goodbye" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
      {/* Ambient Floor Glow */}
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-purple-700/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Reunited 7 Members Spotlight Stage (Same authentic portraits as the opening) */}
      <div className="relative z-10 w-full max-w-5xl text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            06 • THE FINAL GOODBYE
          </span>
        </div>

        {/* 7 Members Stage Lineup */}
        <div className="relative my-8 py-6 rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#1c0f38]/90 to-[#0b0518]/90 shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden">
          <div className="flex items-end justify-center -space-x-3 sm:-space-x-6 md:-space-x-8 px-4">
            {stageMembers.map((member) => (
              <div key={member.id} className="relative flex flex-col items-center">
                {/* Converging Spotlight Column */}
                <div
                  className="absolute -top-20 bottom-0 w-20 sm:w-28 rounded-full opacity-35 blur-lg pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at bottom, ${member.themeGlow} 0%, transparent 80%)`,
                  }}
                />

                <div className="relative w-20 sm:w-32 md:w-36 aspect-[3/5]">
                  <img
                    src={member.portraitUrl}
                    alt={`${member.name} (${member.realName})`}
                    className="w-full h-full object-cover object-top filter saturate-[1.05] contrast-[1.05]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                  />
                </div>

                <div
                  className="w-12 sm:w-20 h-2 rounded-full blur-[2px] mt-1"
                  style={{
                    backgroundColor: member.accentColor,
                    opacity: 0.5,
                  }}
                />

                <span className="font-cinzel text-[11px] font-bold text-purple-200 mt-1">
                  {member.name}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-4 bg-gradient-to-b from-purple-500/20 to-transparent blur-sm mt-1" />
        </div>

        {/* Emotional Typography */}
        <div className="space-y-4 my-8">
          <h3 className="font-cormorant italic text-2xl sm:text-4xl text-purple-200 font-light tracking-wide">
            "Seven hearts. Countless memories. One forever."
          </h3>

          <h2 className="font-cursive text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] pt-3">
            Thank You, ARMY
          </h2>

          <p className="font-montserrat uppercase tracking-[0.3em] text-xs sm:text-sm text-purple-300/90 font-semibold">
            For Being Part Of This Story
          </p>

          <div className="max-w-md mx-auto pt-4 border-t border-purple-800/60">
            <p className="text-xs font-mono text-purple-400">
              BTS 💜 ARMY • APOBANGPO (아포방포)
            </p>
          </div>
        </div>

        {/* Action Buttons: Confetti & Replay */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={triggerPurpleConfetti}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold text-sm shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <Heart className="w-4 h-4 fill-current text-white" />
            <span>Send Purple Heart (Borahae!)</span>
          </button>

          <button
            onClick={onReplayJourney}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-600/50 text-purple-200 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <RefreshCw className="w-4 h-4 text-purple-300" />
            <span>Replay The Journey</span>
          </button>
        </div>
      </div>

      {/* Real Interactive Borahae Fan Guestbook (LocalStorage based, no fabricated entries) */}
      <div className="w-full max-w-4xl mt-12 p-6 sm:p-8 rounded-3xl border border-purple-800/40 bg-[#120726]/90 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="w-5 h-5 text-pink-400" />
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
              Borahae Fan Wall (보라해 방명록)
            </h3>
            <p className="text-xs text-purple-300 font-montserrat">
              Leave your personal note for BTS. Messages are stored locally on your device.
            </p>
          </div>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="space-y-3 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Your Name / ARMY Location"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="sm:col-span-1 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Your Comfort Song (optional)"
              value={newSong}
              onChange={(e) => setNewSong(e.target.value)}
              className="sm:col-span-1 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Your message to BTS..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="sm:col-span-1 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Message</span>
            </button>
          </div>
        </form>

        {/* Real Messages List */}
        {messages.length === 0 ? (
          <div className="py-8 text-center text-purple-400/70 text-xs font-montserrat italic border border-purple-900/40 rounded-2xl">
            No notes on this device yet. Write the first note for the Borahae Wall above! 💜
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[300px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-purple-100 font-montserrat italic">
                  "{msg.text}"
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-900/40">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-cinzel font-bold text-pink-300">
                      {msg.author}
                    </span>
                    {msg.favoriteSong && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                        🎵 {msg.favoriteSong}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-16 text-center text-xs font-mono text-purple-500/80">
        <p>BTS: A Journey Through Forever • Dedicated to BTS & ARMY worldwide.</p>
      </footer>
    </section>
  );
}
