import React, { useState } from 'react';
import { Sparkles, Disc, Award, Info, Quote, ExternalLink, Play } from 'lucide-react';
import { members } from '../data/members';
import { Member, SoloAlbum } from '../types';

interface MemberChoreographyProps {
  onPlaySong?: (songName: string) => void;
}

export default function MemberChoreography({ onPlaySong }: MemberChoreographyProps) {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'albums' | 'achievements' | 'trivia'>>({
    rm: 'albums',
    jin: 'albums',
    suga: 'albums',
    jhope: 'albums',
    jimin: 'albums',
    v: 'albums',
    jungkook: 'albums',
  });

  const [selectedAlbumIdx, setSelectedAlbumIdx] = useState<Record<string, number>>({
    rm: 0,
    jin: 0,
    suga: 0,
    jhope: 0,
    jimin: 0,
    v: 0,
    jungkook: 0,
  });

  const handleTabChange = (memberId: string, tab: 'albums' | 'achievements' | 'trivia') => {
    setActiveTabs((prev) => ({ ...prev, [memberId]: tab }));
  };

  const handleAlbumSelect = (memberId: string, idx: number) => {
    setSelectedAlbumIdx((prev) => ({ ...prev, [memberId]: idx }));
  };

  return (
    <div id="members-journey" className="relative w-full">
      {/* Chapter Section Introduction Header */}
      <div className="py-20 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            02 • SEVEN MEMBERS, SEVEN STORIES
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wider">
          THE ARTISTIC CONSTELLATION
        </h2>
        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-300/80 mt-2">
          "Each member shines with their own unmistakable light, converging into history's most united brotherhood."
        </p>
      </div>

      {/* 7 Individual Member Chapters (Alternating Left / Right) */}
      <div className="space-y-32 md:space-y-44 pb-28">
        {members.map((member: Member, index: number) => {
          const isLeft = member.alignment === 'left';
          const activeTab = activeTabs[member.id] || 'albums';
          const currentAlbumIdx = selectedAlbumIdx[member.id] || 0;
          const currentSoloAlbum: SoloAlbum = member.soloAlbums[currentAlbumIdx] || member.soloAlbums[0];

          return (
            <section
              key={member.id}
              id={`member-chapter-${member.id}`}
              className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
              {/* Member Ambient Glow Nebula */}
              <div
                className="absolute w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full blur-[130px] pointer-events-none opacity-25 transition-all duration-700"
                style={{
                  background: member.color,
                  left: isLeft ? '8%' : '56%',
                  top: '15%',
                }}
              />

              <div
                className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isLeft ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* 1. Member Portrait & Stage Spotlight Frame */}
                <div
                  className={`lg:col-span-5 flex flex-col items-center justify-center ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative group w-full max-w-[360px] sm:max-w-[430px]">
                    {/* Glowing Spotlight Halo */}
                    <div
                      className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl transition-all duration-700 group-hover:opacity-90"
                      style={{ background: `radial-gradient(circle, ${member.themeGlow} 0%, transparent 70%)` }}
                    />

                    {/* Member Frame Card */}
                    <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#150a2b]/80 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:border-purple-300">
                      {/* Member Index Indicator */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 border border-purple-400/40 backdrop-blur-md flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: member.accentColor }} />
                        <span className="font-mono text-xs text-purple-200">
                          CHAPTER 0{index + 1} / 07
                        </span>
                      </div>

                      {/* Official Verified Badge */}
                      <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-600/40 backdrop-blur-md text-[10px] font-mono text-purple-300">
                        {member.zodiac} • {member.mbti}
                      </div>

                      {/* Full-Length Member Portrait */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={member.portraitUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top filter saturate-[1.05] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0720] via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Card Overlay Bottom Details */}
                      <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-[#0b0518] via-[#0b0518]/90 to-transparent">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-cinzel text-3xl font-extrabold text-white tracking-wider">
                            {member.name}
                          </h3>
                          <span className="font-montserrat text-xs text-purple-300">
                            {member.koreanName}
                          </span>
                        </div>
                        <p className="text-xs font-montserrat text-purple-300/80 mt-1 uppercase tracking-wider font-semibold">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Spotlight Base Pod */}
                    <div
                      className="w-3/4 h-3 mx-auto rounded-full blur-[6px] mt-3"
                      style={{ background: member.accentColor, opacity: 0.6 }}
                    />
                  </div>
                </div>

                {/* 2. Member Biography, Solo Discography, and Achievements */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-center ${
                    isLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-cormorant italic text-sm text-purple-300">
                        {member.realName}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span className="text-xs font-mono text-purple-300/80">
                        Born {member.birth}
                      </span>
                    </div>

                    {/* Artistic Identity Callout */}
                    <p className="font-cinzel text-sm sm:text-base font-semibold text-purple-200 tracking-wide border-l-2 border-purple-400 pl-3 py-0.5">
                      {member.artisticIdentity}
                    </p>

                    {/* Verified Biography */}
                    <p className="text-xs sm:text-sm text-purple-100/90 font-montserrat leading-relaxed">
                      {member.biography}
                    </p>

                    {/* Iconic Quote */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-950/40 border border-purple-600/30 flex items-start space-x-3 backdrop-blur-sm">
                      <Quote className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <p className="font-cormorant italic text-sm sm:text-base text-purple-200 leading-snug">
                        "{member.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Interactive Editorial Tab Navigation */}
                  <div className="flex items-center space-x-2 mt-6 border-b border-purple-900/60 pb-3">
                    <button
                      onClick={() => handleTabChange(member.id, 'albums')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                        activeTab === 'albums'
                          ? 'bg-purple-600/40 border border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
                      }`}
                    >
                      <Disc className="w-4 h-4 text-purple-400" />
                      <span>Solo Discography ({member.soloAlbums.length})</span>
                    </button>

                    <button
                      onClick={() => handleTabChange(member.id, 'achievements')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                        activeTab === 'achievements'
                          ? 'bg-purple-600/40 border border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
                      }`}
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Milestones</span>
                    </button>

                    <button
                      onClick={() => handleTabChange(member.id, 'trivia')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                        activeTab === 'trivia'
                          ? 'bg-purple-600/40 border border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
                      }`}
                    >
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span>Persona & Lore</span>
                    </button>
                  </div>

                  {/* Tab Panes */}
                  <div className="mt-4 min-h-[220px]">
                    {/* TAB 1: Solo Discography */}
                    {activeTab === 'albums' && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Album Picker Pills */}
                        <div className="flex flex-wrap gap-2">
                          {member.soloAlbums.map((album, aIdx) => (
                            <button
                              key={album.id}
                              onClick={() => handleAlbumSelect(member.id, aIdx)}
                              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                                currentAlbumIdx === aIdx
                                  ? 'bg-purple-500/40 border border-purple-300 text-white shadow-sm'
                                  : 'bg-[#180d2e]/80 border border-purple-800/50 text-purple-300/70 hover:border-purple-600'
                              }`}
                            >
                              <span>{album.title}</span>
                              <span className="text-[10px] text-purple-400">({album.year})</span>
                            </button>
                          ))}
                        </div>

                        {/* Selected Solo Album Card */}
                        {currentSoloAlbum && (
                          <div className="p-4 sm:p-5 rounded-2xl bg-[#140b28]/90 border border-purple-700/40 backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3">
                              <div className="w-16 h-16 rounded-xl overflow-hidden border border-purple-400/40 flex-shrink-0 shadow-lg bg-black">
                                <img
                                  src={currentSoloAlbum.cover}
                                  alt={currentSoloAlbum.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80";
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2">
                                    <span>{currentSoloAlbum.title}</span>
                                    <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                                      {currentSoloAlbum.releaseDate}
                                    </span>
                                  </h4>

                                  {currentSoloAlbum.streamingUrl && (
                                    <a
                                      href={currentSoloAlbum.streamingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white"
                                    >
                                      <span>Spotify</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-xs text-purple-300/80 font-montserrat mt-1">
                                  {currentSoloAlbum.description}
                                </p>
                              </div>
                            </div>

                            {/* Tracklist Pills */}
                            <div className="mt-3">
                              <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-2">
                                Tracklist:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {currentSoloAlbum.tracks.map((trk, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-[11px] text-purple-200 flex items-center space-x-1 hover:border-purple-500 transition-colors"
                                  >
                                    <span className="text-purple-400 font-mono text-[9px]">0{tIdx + 1}</span>
                                    <span>{trk}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 2: Key Milestones */}
                    {activeTab === 'achievements' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                        {member.achievements.map((ach, aIdx) => (
                          <div
                            key={aIdx}
                            className="p-3.5 rounded-xl bg-[#140b28]/80 border border-purple-700/30 flex items-start space-x-3"
                          >
                            <Award className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-purple-200 font-montserrat leading-relaxed">
                              {ach}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 3: Persona & Lore */}
                    {activeTab === 'trivia' && (
                      <div className="space-y-2.5 animate-fadeIn">
                        {member.facts.map((fact, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-3.5 rounded-xl bg-[#140b28]/80 border border-purple-700/30 flex items-start space-x-3"
                          >
                            <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-purple-200 font-montserrat leading-relaxed">
                              {fact}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
