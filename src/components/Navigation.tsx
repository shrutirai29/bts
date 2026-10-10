import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Disc, Tv, Globe, Heart, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { PlaylistItem } from '../types';

interface NavigationProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  currentTrack: PlaylistItem;
}

export default function Navigation({ isAudioPlaying, onToggleAudio, currentTrack }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledPct);
      setScrolled(winScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Prologue', href: '#stage-entrance', icon: Sparkles },
    { name: '7 Members', href: '#members-journey', icon: Users },
    { name: 'Discography', href: '#living-discography', icon: Disc },
    { name: 'Memories', href: '#memory-room', icon: Tv },
    { name: 'Universe', href: '#resource-universe', icon: Globe },
    { name: 'Epilogue', href: '#final-goodbye', icon: Heart },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Thin Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 bg-purple-950/50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#090314cc]/90 backdrop-blur-xl border-b border-purple-900/40 py-3 shadow-[0_4px_30px_rgba(139,92,246,0.15)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* BTS Brand Crest */}
          <a
            href="#stage-entrance"
            onClick={(e) => handleNavClick(e, '#stage-entrance')}
            className="flex items-center space-x-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-700 via-purple-500 to-fuchsia-400 p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d071d] rounded-[6px] flex items-center justify-center font-bold text-xs tracking-widest text-purple-200">
                BTS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base sm:text-lg tracking-[0.2em] font-extrabold text-white group-hover:text-purple-300 transition-colors">
                FOREVER
              </span>
              <span className="text-[9px] tracking-[0.3em] text-purple-400 font-montserrat uppercase -mt-1">
                방탄소년단 💜
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Pills */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-purple-950/40 border border-purple-500/20 px-4 py-1.5 rounded-full backdrop-blur-lg">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-purple-200/80 hover:text-white hover:bg-purple-600/30 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                <item.icon className="w-3.5 h-3.5 text-purple-400" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Quick Soundtrack Indicator & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleAudio}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                isAudioPlaying
                  ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-purple-950/50 border-purple-800/60 text-purple-400 hover:border-purple-500'
              }`}
              title="Toggle Soft BTS Music"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-purple-300" />
                  <span className="hidden sm:inline text-[11px] font-mono tracking-tight text-purple-200 truncate max-w-[110px]">
                    {currentTrack?.title?.split('(')[0] || 'Playing'}
                  </span>
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-0.5 h-3 bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-2 bg-fuchsia-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-3.5 bg-purple-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-purple-400/80" />
                  <span className="hidden sm:inline text-[11px]">Soft Music</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d061f]/95 border-b border-purple-800/60 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-100 hover:bg-purple-800/40"
              >
                <item.icon className="w-4 h-4 text-purple-400" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
