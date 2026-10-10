import React from 'react';
import { ChevronDown, Sparkles, Music } from 'lucide-react';
import { members } from '../data/members';

interface HeroStageProps {
  onStartJourney: () => void;
  isAudioPlaying: boolean;
}

export default function HeroStage({ onStartJourney, isAudioPlaying }: HeroStageProps) {
  return (
    <section
      id="stage-entrance"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* Cinematic Title & Narrative Header */}
      <div className="z-10 text-center px-4 max-w-4xl mx-auto mt-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            PROLOGUE • THE INFINITE STAGE
          </span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_40px_rgba(168,85,247,0.7)]">
          BTS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-400">A JOURNEY THROUGH FOREVER</span>
        </h1>

        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-200/90 mt-2 tracking-wide font-light max-w-2xl mx-auto">
          "Seven voices. Seven souls. One eternal constellation that redefined global music."
        </p>
      </div>

      {/* 7 Members Full-Length Stage Composition */}
      <div className="relative z-10 w-full max-w-6xl px-4 my-auto flex flex-col items-center justify-center">
        <div className="grid grid-cols-7 gap-2 sm:gap-4 md:gap-6 items-end w-full max-w-5xl py-6">
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-500 hover:-translate-y-4"
              onClick={() => {
                const target = document.getElementById(`member-chapter-${member.id}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const target = document.getElementById(`member-chapter-${member.id}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {/* Volumetric Member Light Beam */}
              <div
                className="absolute -inset-x-2 -top-14 -bottom-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-md"
                style={{ background: `radial-gradient(ellipse at bottom, ${member.accentColor}33 0%, transparent 80%)` }}
              />

              {/* Full-Length Member Portrait Frame */}
              <div className="relative w-full aspect-[9/20] sm:aspect-[9/22] rounded-2xl overflow-hidden border border-purple-400/20 group-hover:border-purple-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#1c1133] to-[#0a0418] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]">
                <img
                  src={member.portraitUrl}
                  alt={`${member.name} (${member.realName})`}
                  className="w-full h-full object-cover object-top filter saturate-[0.9] contrast-[1.1] group-hover:scale-105 group-hover:saturate-[1.15] transition-all duration-500"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090314] via-transparent to-purple-900/10 opacity-70 group-hover:opacity-20 transition-opacity duration-300" />

                {/* Member Index Indicator */}
                <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-purple-950/80 border border-purple-400/40 flex items-center justify-center text-[10px] font-mono text-purple-300">
                  0{idx + 1}
                </div>
              </div>

              {/* Member Stage Tag */}
              <div className="mt-3 text-center transition-all duration-300">
                <p className="font-cinzel text-xs sm:text-sm font-bold text-purple-100 group-hover:text-purple-300 tracking-wider">
                  {member.name}
                </p>
                <p className="text-[10px] text-purple-400/80 font-montserrat hidden sm:block">
                  {member.koreanName}
                </p>
              </div>

              {/* Floor Spotlight Base */}
              <div
                className="w-8 sm:w-12 h-2 rounded-full blur-[3px] mt-1 transition-all"
                style={{ backgroundColor: member.accentColor, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Reflective Glossy Stage Floor */}
        <div className="w-full h-8 bg-gradient-to-b from-purple-500/20 to-transparent blur-md -mt-4" />
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="z-10 flex flex-col items-center space-y-3">
        <button
          onClick={onStartJourney}
          className="group flex flex-col items-center text-purple-300/80 hover:text-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl p-2"
          aria-label="Scroll to begin the BTS journey"
        >
          <span className="text-xs font-montserrat uppercase tracking-[0.3em] group-hover:tracking-[0.35em] transition-all">
            Begin the Journey
          </span>
          <div className="w-7 h-11 rounded-full border-2 border-purple-400/40 flex items-start justify-center p-1.5 mt-2 group-hover:border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <div className="w-1.5 h-2.5 bg-purple-300 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-purple-400 mt-1 animate-pulse" />
        </button>

        {!isAudioPlaying && (
          <p className="text-[11px] text-purple-400/70 font-montserrat flex items-center space-x-1.5 animate-pulse">
            <Music className="w-3 h-3 text-purple-400" />
            <span>Soft BTS melodies begin on scroll</span>
          </p>
        )}
      </div>
    </section>
  );
}
