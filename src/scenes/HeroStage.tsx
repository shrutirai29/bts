import React from 'react';
import { ChevronDown, Sparkles, Music } from 'lucide-react';
import { members } from '../data/members';

interface HeroStageProps {
  onStartJourney: () => void;
  isAudioPlaying: boolean;
}

export default function HeroStage({ onStartJourney, isAudioPlaying }: HeroStageProps) {
  // Cinematic stage ordering for balanced stage depth (Wings -> Flanks -> Center)
  // [j-hope, Jin, SUGA, RM (Leader/Center), Jimin, V, Jung Kook]
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
    <section
      id="stage-entrance"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-20 pb-10 overflow-hidden"
    >
      {/* Cinematic Ambient Atmosphere & Stage Lighting Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-700/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Title & Introduction */}
      <div className="z-20 text-center px-4 max-w-4xl mx-auto mt-4 select-none">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
          <span className="text-[11px] font-montserrat uppercase tracking-[0.25em] text-purple-200">
            PROLOGUE • THE INFINITE STAGE
          </span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]">
          BTS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-400">A JOURNEY THROUGH FOREVER</span>
        </h1>

        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-200/90 mt-2 tracking-wide font-light max-w-2xl mx-auto">
          "Seven voices. Seven souls. One eternal constellation that redefined music."
        </p>
      </div>

      {/* Cinematic 7-Member Group Stage Composition (Unboxed, Authentic, Stage Depth) */}
      <div className="relative z-10 w-full max-w-6xl px-4 my-auto flex flex-col items-center justify-center">
        {/* Stage Platform Elevation */}
        <div className="relative w-full flex items-end justify-center pt-8 pb-4">
          <div className="flex items-end justify-center -space-x-4 sm:-space-x-8 md:-space-x-12 w-full max-w-5xl">
            {stageMembers.map((member, idx) => {
              // Depth calculation: Center members slightly in front, flanking slightly staggered
              const isCenter = member.id === 'rm';
              const zIndex = isCenter ? 20 : 10 + Math.abs(idx - 3);

              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col items-center cursor-pointer transition-all duration-500 hover:-translate-y-6"
                  style={{ zIndex }}
                  onClick={() => {
                    const el = document.getElementById(`member-chapter-${member.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      const el = document.getElementById(`member-chapter-${member.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  aria-label={`View chapter for ${member.name}`}
                >
                  {/* Volumetric Vertical Stage Light Column */}
                  <div
                    className="absolute -top-28 bottom-0 w-24 sm:w-36 rounded-full opacity-40 group-hover:opacity-90 blur-xl transition-all duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at bottom, ${member.themeGlow} 0%, transparent 75%)`,
                    }}
                  />

                  {/* Authentic Member Portrait with Gradient Edge Masking */}
                  <div className="relative w-28 sm:w-44 md:w-52 aspect-[3/5] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={member.portraitUrl}
                      alt={`${member.name} (${member.realName})`}
                      className="w-full h-full object-cover object-top filter saturate-[1.05] contrast-[1.08] drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]"
                      style={{
                        maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                      }}
                      loading="eager"
                    />

                    {/* Member Name Aura Tag on Hover */}
                    <div className="absolute top-2 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 border border-purple-400/50 backdrop-blur-md text-[10px] font-cinzel font-bold text-white tracking-widest uppercase">
                        {member.name}
                      </span>
                    </div>
                  </div>

                  {/* Spotlight Stage Puck at the floor */}
                  <div
                    className="w-16 sm:w-28 h-3 rounded-full blur-[4px] mt-1 transition-all duration-300 group-hover:blur-[2px] group-hover:scale-110"
                    style={{
                      backgroundColor: member.accentColor,
                      opacity: 0.6,
                      boxShadow: `0 0 20px ${member.accentColor}`,
                    }}
                  />

                  {/* Member Subtitle */}
                  <div className="mt-2 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <p className="font-cinzel text-xs font-bold text-purple-200">
                      {member.name}
                    </p>
                    <p className="text-[9px] font-mono text-purple-400">
                      {member.koreanName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reflective Glossy Stage Floor Line */}
        <div className="w-full max-w-4xl h-10 bg-gradient-to-b from-purple-500/20 via-purple-900/5 to-transparent blur-md -mt-3" />
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="z-20 flex flex-col items-center space-y-2 mt-4">
        <button
          onClick={onStartJourney}
          className="group flex flex-col items-center text-purple-300/80 hover:text-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl p-2"
          aria-label="Scroll to begin the journey"
        >
          <span className="text-xs font-montserrat uppercase tracking-[0.3em] group-hover:tracking-[0.35em] transition-all">
            Begin the Journey
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-purple-400/40 flex items-start justify-center p-1 mt-2 group-hover:border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <div className="w-1.5 h-2 bg-purple-300 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-purple-400 mt-1 animate-pulse" />
        </button>

        {!isAudioPlaying && (
          <p className="text-[11px] text-purple-400/70 font-montserrat flex items-center space-x-1.5 animate-pulse">
            <Music className="w-3 h-3 text-purple-400" />
            <span>Soft ambient soundtrack starts on interaction</span>
          </p>
        )}
      </div>
    </section>
  );
}
