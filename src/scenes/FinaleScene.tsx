import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookMessage } from '../types';

interface FinaleSceneProps {
  onReplayJourney: () => void;
}

export default function FinaleScene({ onReplayJourney }: FinaleSceneProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([
    { id: 1, author: "Seoul ARMY", text: "Thank you for walking with us through our youth. Seven forever 💜", timestamp: "Just now", favoriteSong: "Spring Day" },
    { id: 2, author: "Maria (London)", text: "Wembley Young Forever singalong will stay in my heart forever. Apobangpo!", timestamp: "2m ago", favoriteSong: "Mikrokosmos" },
    { id: 3, author: "Aarav (Mumbai)", text: "Zero O'Clock healed me during my toughest days. Borahae BTS!", timestamp: "6m ago", favoriteSong: "00:00" },
    { id: 4, author: "Chloe (New York)", text: "Seven solo masterworks and counting. Can't wait for 2025/2026!", timestamp: "14m ago", favoriteSong: "Life Goes On" }
  ]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newSong, setNewSong] = useState("");

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
      author: newAuthor.trim() || "Anonymous ARMY",
      text: newText.trim(),
      timestamp: "Just now",
      favoriteSong: newSong.trim() || undefined
    };

    setMessages([newMsg, ...messages]);
    setNewText("");
    setNewAuthor("");
    setNewSong("");
    triggerPurpleConfetti();
  };

  return (
    <section id="final-goodbye" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
      {/* Ambient Floor Glow */}
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-purple-700/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Reunited 7 Members Spotlight Stage */}
      <div className="relative z-10 w-full max-w-4xl text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            06 • THE FINAL GOODBYE
          </span>
        </div>

        {/* 7 Members Spotlight Artwork */}
        <div className="relative my-8 rounded-3xl overflow-hidden border-2 border-purple-500/40 bg-gradient-to-b from-[#1c0f38] to-[#0b0518] p-4 shadow-[0_0_60px_rgba(168,85,247,0.4)]">
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-black">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
              alt="BTS Reunited on Stage"
              className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0720] via-purple-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0e0720] to-transparent" />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-purple-300">
            <span>RM</span> • <span>JIN</span> • <span>SUGA</span> • <span>J-HOPE</span> • <span>JIMIN</span> • <span>V</span> • <span>JUNG KOOK</span>
          </div>
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

      {/* Borahae Fan Guestbook Wall */}
      <div className="w-full max-w-4xl mt-12 p-6 sm:p-8 rounded-3xl border border-purple-800/40 bg-[#120726]/90 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="w-5 h-5 text-pink-400" />
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
              Borahae Fan Wall (보라해 방명록)
            </h3>
            <p className="text-xs text-purple-300 font-montserrat">
              Leave your personal tribute or message of love for BTS.
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
              placeholder="Message to BTS..."
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
              <span>Post Message to Constellation</span>
            </button>
          </div>
        </form>

        {/* Live Messages Grid */}
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
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs font-mono text-purple-500/80">
        <p>BTS: A Journey Through Forever • Created with 💜 for BTS and ARMY worldwide.</p>
      </footer>
    </section>
  );
}
