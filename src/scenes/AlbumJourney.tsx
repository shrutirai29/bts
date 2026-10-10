import React, { useState } from 'react';
import { Sparkles, Disc, ChevronLeft, ChevronRight, BookOpen, Info, Play, ExternalLink } from 'lucide-react';
import { discography } from '../data/discography';
import { GroupRelease, SongDetail } from '../types';
import TrackModal from '../components/TrackModal';
import { soundEngine } from '../utils/audioEngine';

interface AlbumJourneyProps {
  onPlayPreviewSong?: (song: SongDetail) => void;
}

export default function AlbumJourney({ onPlayPreviewSong }: AlbumJourneyProps) {
  const [selectedAlbumIdx, setSelectedAlbumIdx] = useState(4); // Default to Love Yourself Answer
  const [isBookOpen, setIsBookOpen] = useState(true);
  const [isVinylSpinning, setIsVinylSpinning] = useState(true);
  const [activeSongModal, setActiveSongModal] = useState<SongDetail | null>(null);

  const currentAlbum: GroupRelease = discography[selectedAlbumIdx] || discography[0];

  const handleSelectAlbum = (index: number) => {
    setSelectedAlbumIdx(index);
    setIsBookOpen(false);
    setIsVinylSpinning(false);

    soundEngine.playVinylScratch();

    setTimeout(() => {
      setIsBookOpen(true);
      setIsVinylSpinning(true);
    }, 220);
  };

  const handleNext = () => {
    const nextIdx = (selectedAlbumIdx + 1) % discography.length;
    handleSelectAlbum(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (selectedAlbumIdx - 1 + discography.length) % discography.length;
    handleSelectAlbum(prevIdx);
  };

  return (
    <section id="living-discography" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Narrative Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            03 • THE LIVING DISCOGRAPHY
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wider">
          CHRONICLES IN VINYL & GOLD
        </h2>
        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-300/80 mt-2 max-w-2xl mx-auto">
          "From raw rookie hip-hop to stadium anthems: as each sleeve opens, the vinyl settles on the golden gramophone."
        </p>
      </div>

      {/* Chronological Timeline Navigator */}
      <div className="relative mb-12 flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 hover:text-white hover:bg-purple-800 transition-all z-20 shadow-lg mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Previous album in timeline"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto py-4 px-2 no-scrollbar scroll-smooth max-w-4xl">
          {discography.map((album, idx) => {
            const isSelected = selectedAlbumIdx === idx;
            return (
              <button
                key={album.id}
                onClick={() => handleSelectAlbum(idx)}
                className={`flex-shrink-0 group flex flex-col items-center p-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                  isSelected
                    ? 'bg-purple-900/50 border-2 border-purple-400 scale-105 shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                    : 'bg-[#140b28]/60 border border-purple-900/40 hover:border-purple-600/70 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-purple-400/30 bg-black">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/4/4b/BTS_-_Love_Yourself_Answer.png";
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-purple-300 mt-1.5 font-bold">
                  {album.year}
                </span>
                <span className="text-[11px] font-cinzel text-purple-100 truncate max-w-[85px] text-center">
                  {album.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 hover:text-white hover:bg-purple-800 transition-all z-20 shadow-lg ml-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Next album in timeline"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Interactive Stage: 3D Photobook + Sliding Vinyl + Gramophone + Tracklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#100724]/80 border border-purple-700/30 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: currentAlbum.accentGlow }}
        />

        {/* 1. 3D Open Photobook & Sliding Vinyl (Col 1-6) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[400px]">
          <div className="relative flex items-center justify-center w-full max-w-md perspective-[1000px]">
            {/* Opened Photobook */}
            <div
              className={`relative flex transition-all duration-700 ${
                isBookOpen
                  ? 'rotate-y-[-10deg] scale-100 shadow-[0_25px_50px_rgba(0,0,0,0.9)]'
                  : 'rotate-y-0 scale-95'
              }`}
            >
              {/* Left Page (Album Art Cover) */}
              <div className="w-36 sm:w-48 h-48 sm:h-64 rounded-l-2xl overflow-hidden border-2 border-r-0 border-purple-400/40 bg-gradient-to-tr from-[#1a0f35] to-[#2e1859] relative shadow-2xl">
                <img
                  src={currentAlbum.cover}
                  alt={currentAlbum.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/4/4b/BTS_-_Love_Yourself_Answer.png";
                  }}
                />
                <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-black/60 to-transparent" />
              </div>

              {/* Right Page (Inside Liner Notes) */}
              <div className="w-36 sm:w-48 h-48 sm:h-64 rounded-r-2xl border-2 border-l-0 border-purple-400/40 bg-[#160a2c] p-3 sm:p-4 flex flex-col justify-between relative shadow-2xl">
                <div className="space-y-1 sm:space-y-2">
                  <span className="text-[9px] sm:text-[10px] font-mono text-purple-400 uppercase tracking-widest block">
                    Verified Release
                  </span>
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white leading-tight">
                    {currentAlbum.title}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-purple-300/80 font-montserrat line-clamp-3 sm:line-clamp-4">
                    {currentAlbum.concept}
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-purple-400">
                    {currentAlbum.totalTracks} Tracks
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Sliding Vinyl Record */}
            <div
              className={`absolute right-4 sm:right-6 transition-all duration-1000 z-30 ${
                isVinylSpinning
                  ? 'translate-x-12 sm:translate-x-16 rotate-[720deg] scale-100'
                  : 'translate-x-0 rotate-0 scale-90 opacity-0'
              }`}
            >
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#111111] border-4 border-[#222222] shadow-[0_15px_35px_rgba(0,0,0,0.95)] flex items-center justify-center animate-vinyl-spin">
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-neutral-800/80" />
                <div className="absolute inset-4 rounded-full border border-neutral-700/60" />
                <div className="absolute inset-7 rounded-full border border-neutral-800/80" />
                <div className="absolute inset-10 rounded-full border border-neutral-700/60" />

                {/* Center Label */}
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center p-1 shadow-inner"
                  style={{ background: currentAlbum.vinylColor }}
                >
                  <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center text-center p-0.5">
                    <span className="text-[7px] sm:text-[8px] font-cinzel font-bold text-white leading-none">
                      BTS
                    </span>
                  </div>
                </div>

                <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-sm border border-neutral-900" />
              </div>
            </div>
          </div>

          {/* Antique Gramophone Turntable Visual */}
          <div className="mt-8 flex items-center space-x-4 bg-purple-950/40 border border-purple-700/40 px-5 py-3 rounded-2xl backdrop-blur-md">
            <div className="relative">
              <svg className="w-10 h-10 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M12 6l9-3v14l-9-3V6z" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M7 12h2" />
              </svg>
              <span className="absolute -top-2 -right-1 text-xs animate-bounce">🎶</span>
            </div>

            <div>
              <p className="text-xs font-cinzel font-bold text-amber-200">
                Gramophone Active
              </p>
              <p className="text-[11px] text-purple-300/80 font-montserrat">
                Selected Era: <span className="text-white font-medium">{currentAlbum.keyTrack}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Album Details & Tracklist (Col 7-12) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <div className="border-b border-purple-800/60 pb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-purple-900/60 border border-purple-500/40 text-purple-200">
                {currentAlbum.type}
              </span>
              <span className="text-xs font-mono text-purple-400">
                Release: {currentAlbum.releaseDate}
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mt-2">
              {currentAlbum.title}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/90 font-montserrat mt-1">
              {currentAlbum.description}
            </p>
          </div>

          {/* Interactive Tracks with Popup Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Disc className="w-3.5 h-3.5" />
                <span>Tracklist (Select to inspect songwriting & credits)</span>
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {currentAlbum.tracks.map((song, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => setActiveSongModal(song)}
                  className="group flex items-center justify-between p-3 rounded-xl bg-purple-950/40 hover:bg-purple-800/40 border border-purple-800/30 hover:border-purple-500/60 cursor-pointer transition-all duration-200 shadow-sm"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveSongModal(song);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="w-6 h-6 rounded-full bg-purple-900/80 border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      {sIdx + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-medium text-white group-hover:text-purple-200 truncate font-montserrat">
                        {song.title}
                      </p>
                      <p className="text-[10px] text-purple-400 truncate">
                        {song.genre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0 ml-2">
                    <span className="text-xs font-mono text-purple-400/80">
                      {song.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSongModal(song);
                      }}
                      className="p-1.5 rounded-lg bg-purple-900/40 group-hover:bg-purple-500 text-purple-300 group-hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-purple-300"
                      title="Inspect song details"
                      aria-label={`Inspect ${song.title}`}
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Track Detail Modal */}
      {activeSongModal && (
        <TrackModal
          song={activeSongModal}
          album={currentAlbum}
          onClose={() => setActiveSongModal(null)}
          onPlayPreview={(s) => {
            if (onPlayPreviewSong) onPlayPreviewSong(s);
          }}
        />
      )}
    </section>
  );
}
