import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Sparkles, X, FileText, Music } from 'lucide-react';
import { softSongPlaylist } from '../data/playlist';
import { PlaylistItem } from '../types';

interface PersistentAudioPlayerProps {
  isPlaying: boolean;
  currentTrackIndex: number;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectTrack: (index: number) => void;
  volume: number;
  onVolumeChange: (val: number) => void;
}

export default function PersistentAudioPlayer({
  isPlaying,
  currentTrackIndex,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSelectTrack,
  volume,
  onVolumeChange
}: PersistentAudioPlayerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const currentTrack: PlaylistItem = softSongPlaylist[currentTrackIndex] || softSongPlaylist[0];

  return (
    <>
      {/* Floating Audio Capsule */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-3">
        <div className="flex items-center space-x-3 px-4 py-2.5 rounded-full bg-[#120726]/90 border border-purple-500/40 shadow-[0_10px_35px_rgba(168,85,247,0.35)] backdrop-blur-xl transition-all duration-300">
          {/* Animated Vinyl Icon */}
          <button
            onClick={onTogglePlay}
            className={`w-9 h-9 rounded-full bg-purple-950 border-2 border-purple-400 flex items-center justify-center cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 ${
              isPlaying ? 'animate-vinyl-spin' : ''
            }`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-purple-500 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </button>

          {/* Track Info */}
          <div className="hidden sm:flex flex-col max-w-[140px] md:max-w-[170px] truncate">
            <span className="text-xs font-semibold text-white truncate font-montserrat">
              {currentTrack.title}
            </span>
            <span className="text-[10px] text-purple-300/80 truncate font-mono">
              {currentTrack.era.split('(')[0]}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onPrevTrack}
              className="p-1.5 text-purple-300 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 rounded-lg"
              title="Previous Track"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={onNextTrack}
              className="p-1.5 text-purple-300 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 rounded-lg"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="hidden md:flex items-center space-x-1.5 pl-2 border-l border-purple-800/60">
            {volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              aria-label="Volume control"
              className="w-16 h-1 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>

          {/* Lyrics Popover Toggle */}
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 ${
              showLyrics ? 'bg-purple-700 text-white' : 'text-purple-300 hover:text-white hover:bg-purple-900/50'
            }`}
            title="Lyrics excerpt"
            aria-label="Toggle lyrics excerpt"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Playlist Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 ${
              isDrawerOpen ? 'bg-purple-700 text-white' : 'text-purple-300 hover:text-white hover:bg-purple-900/50'
            }`}
            title="Soft playlist"
            aria-label="Toggle playlist drawer"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lyrics Excerpt Card */}
      {showLyrics && (
        <div className="fixed bottom-24 right-5 z-40 w-80 p-4 rounded-2xl bg-[#140a2a]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-2 mb-2">
            <span className="text-xs font-mono text-purple-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{currentTrack.title}</span>
            </span>
            <button onClick={() => setShowLyrics(false)} className="text-purple-400 hover:text-white" aria-label="Close lyrics">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="font-cormorant italic text-sm text-purple-100 leading-relaxed">
            "{currentTrack.lyricsExcerpt}"
          </p>
          <p className="text-[10px] text-purple-400 font-montserrat mt-2">
            {currentTrack.description}
          </p>
        </div>
      )}

      {/* Playlist Drawer */}
      {isDrawerOpen && (
        <div className="fixed bottom-24 right-5 z-40 w-80 sm:w-96 max-h-[420px] p-5 rounded-3xl bg-[#120726]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 text-purple-400" />
              <h4 className="font-cinzel text-sm font-bold text-white">
                Soft BTS Playlist
              </h4>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-lg text-purple-400 hover:text-white"
              aria-label="Close playlist drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 overflow-y-auto pr-1">
            {softSongPlaylist.map((track, idx) => {
              const isCurrent = currentTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => onSelectTrack(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-purple-600/40 border border-purple-400 text-white shadow-sm'
                      : 'hover:bg-purple-900/30 text-purple-200/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="text-[10px] font-mono text-purple-400 w-4">
                      0{idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-medium truncate font-montserrat">
                        {track.title}
                      </p>
                      <p className="text-[10px] text-purple-400 truncate">
                        {track.era}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-purple-400 flex-shrink-0 ml-2">
                    {track.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
