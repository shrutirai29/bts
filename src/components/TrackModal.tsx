import React, { useEffect, useRef } from 'react';
import { X, Disc, Sparkles, User, FileText, Globe, Play, ExternalLink } from 'lucide-react';
import { SongDetail, GroupRelease } from '../types';

interface TrackModalProps {
  song: SongDetail | null;
  album: GroupRelease | null;
  onClose: () => void;
  onPlayPreview?: (song: SongDetail) => void;
}

export default function TrackModal({ song, album, onClose, onPlayPreview }: TrackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!song) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#120826] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] overflow-hidden"
      >
        {/* Ambient Glow */}
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: album?.accentGlow || 'rgba(168, 85, 247, 0.5)' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 hover:text-white hover:bg-purple-800 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Close track details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Album Artwork & Song Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 border-b border-purple-900/60 pb-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-lg flex-shrink-0 bg-black">
            <img
              src={album?.cover}
              alt={album?.title || "Album Cover"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/4/4b/BTS_-_Love_Yourself_Answer.png";
              }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Disc className="w-8 h-8 text-white/70 animate-spin-slow" />
            </div>
          </div>

          <div className="flex-1 pr-8">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-900/60 border border-purple-500/40 text-purple-300">
                {album?.title} ({album?.year})
              </span>
              <span className="text-xs font-mono text-purple-400">
                • {song.duration}
              </span>
            </div>
            <h3 id="track-modal-title" className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-wide">
              {song.title}
            </h3>
            <p className="text-xs font-montserrat text-purple-300/80 mt-0.5">
              Genre: <span className="text-purple-200">{song.genre}</span>
            </p>
          </div>
        </div>

        {/* Verified Metadata Content */}
        <div className="space-y-5 mt-6 max-h-[55vh] overflow-y-auto pr-2">
          {/* Lyrical Concept */}
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40">
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Concept & Narrative</span>
            </div>
            <p className="text-xs sm:text-sm font-montserrat text-purple-100">
              {song.theme}
            </p>
          </div>

          {/* Lyric Excerpt & Translation */}
          <div className="p-4 rounded-2xl bg-[#180d33]/90 border border-purple-700/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300">
              <span className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Lyric Highlight</span>
              </span>
            </div>
            <p className="font-cormorant italic text-base sm:text-lg text-purple-200 border-l-2 border-purple-400 pl-3 py-0.5">
              "{song.lyricsSnippet}"
            </p>

            <div className="pt-2 border-t border-purple-900/50">
              <span className="text-[11px] font-mono text-purple-400 uppercase block mb-1">
                English Meaning:
              </span>
              <p className="text-xs sm:text-sm text-purple-200/90 font-montserrat leading-relaxed">
                {song.englishMeaning}
              </p>
            </div>
          </div>

          {/* Composers & Producers */}
          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/30 flex items-start space-x-3">
            <User className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
                Composers & Lyricists:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {song.composers?.map((comp, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2.5 py-0.5 rounded bg-purple-900/50 border border-purple-600/30 text-xs font-medium text-purple-200"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="mt-6 pt-4 border-t border-purple-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-400">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Big Hit Music • HYBE</span>
          </div>

          <div className="flex items-center space-x-2">
            {song.officialMvUrl && (
              <a
                href={song.officialMvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-purple-950 border border-purple-700 text-purple-200 text-xs hover:text-white hover:border-purple-400 transition-all"
              >
                <span>Official MV</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {onPlayPreview && (
              <button
                onClick={() => onPlayPreview(song)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Soft Preview</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
