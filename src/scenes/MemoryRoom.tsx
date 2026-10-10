import React, { useState } from 'react';
import { Sparkles, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Film, Clock, Heart, Maximize } from 'lucide-react';
import { memoryChapters } from '../data/memories';
import { MemoryChapter } from '../types';

export default function MemoryRoom() {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentChapter: MemoryChapter = memoryChapters[currentChapterIdx] || memoryChapters[0];

  const handleSelectChapter = (idx: number) => {
    setCurrentChapterIdx(idx);
    setIsPlayingVideo(true);
  };

  const togglePlay = () => {
    setIsPlayingVideo(!isPlayingVideo);
  };

  return (
    <section id="memory-room" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            04 • THE MEMORY ROOM
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wider">
          BTS & ARMY RETROSPECTIVE
        </h2>
        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-300/80 mt-2 max-w-2xl mx-auto">
          "Inside the nostalgic room where 10+ years of laughter, tears, and triumph illuminate the screen."
        </p>
      </div>

      {/* Cozy Living Room Container */}
      <div className="relative rounded-3xl border border-purple-800/40 bg-gradient-to-br from-[#120726] via-[#1a0c36] to-[#0d041c] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Ambient Lamp Light & Wallpaper Glow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />

        {/* Ambient Neon Wall Sign */}
        <div className="absolute top-6 right-8 sm:right-16 z-10 flex items-center space-x-2">
          <div className="px-4 py-1.5 rounded-xl border border-pink-500/60 bg-pink-950/30 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <span className="font-cursive text-2xl sm:text-3xl text-pink-300 drop-shadow-[0_0_12px_#ec4899]">
              BTS forever 💜
            </span>
          </div>
        </div>

        {/* Dual-Pane Composition: Big TV on Left | Members on Sofa on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          {/* 1. BIG 4K VINTAGE TELEVISION (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[#2a1b4d] to-[#120a24] border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              {/* Television Screen */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-900/60 flex flex-col justify-between">
                {isPlayingVideo ? (
                  <div className="relative w-full h-full">
                    {/* Official YouTube Embed Player for Real Video Playback */}
                    <iframe
                      src={`${currentChapter.videoEmbedUrl}&mute=${isMuted ? 1 : 0}`}
                      title={currentChapter.chapterTitle}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* TV Standby Screen with Milestone Banner */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#180d33] to-[#0a0418]">
                    <img
                      src="/assets/bts_group.jpg"
                      alt="BTS Memories Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-35"
                    />
                    <div className="relative z-10 space-y-3">
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 rounded-full bg-purple-600/80 border border-purple-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300"
                        aria-label="Start 5-minute memory film"
                      >
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </button>
                      <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                        BTS: 10 Years of Beautiful Moments
                      </h4>
                      <p className="text-xs sm:text-sm text-purple-300 font-montserrat max-w-sm mx-auto">
                        A retrospective spanning debut, HYYH, Wembley, UN General Assembly, and the 2026 promise.
                      </p>
                    </div>
                  </div>
                )}

                {/* TV Video Controller Bar */}
                <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between border-t border-purple-800/40 z-30">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
                      title={isPlayingVideo ? "Stop" : "Play"}
                      aria-label={isPlayingVideo ? "Stop film" : "Play film"}
                    >
                      {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => {
                        const prev = (currentChapterIdx - 1 + memoryChapters.length) % memoryChapters.length;
                        handleSelectChapter(prev);
                      }}
                      className="p-1 text-purple-400 hover:text-white"
                      title="Previous Chapter"
                      aria-label="Previous chapter"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const next = (currentChapterIdx + 1) % memoryChapters.length;
                        handleSelectChapter(next);
                      }}
                      className="p-1 text-purple-400 hover:text-white"
                      title="Next Chapter"
                      aria-label="Next chapter"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-300">
                      <span>{currentChapter.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-purple-400 hover:text-white"
                      title={isMuted ? "Unmute" : "Mute"}
                      aria-label={isMuted ? "Unmute film" : "Mute film"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* TV Stand Visual */}
              <div className="w-32 h-3 mx-auto bg-[#180f2d] rounded-b-lg border-t border-purple-800" />
              <div className="w-48 h-1.5 mx-auto bg-purple-600/30 rounded-full blur-[2px]" />
            </div>

            {/* Chapter Navigation Chips */}
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {memoryChapters.map((chap, cIdx) => (
                <button
                  key={chap.id}
                  onClick={() => handleSelectChapter(cIdx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                    currentChapterIdx === cIdx
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                      : 'bg-purple-950/40 text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/30'
                  }`}
                >
                  <span>Ch. 0{cIdx + 1}</span>
                  <span className="hidden sm:inline ml-1 text-[10px] opacity-75">
                    ({chap.timestamp.split(' ')[0]})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. BTS MEMBERS GATHERED (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-purple-700/40 bg-[#160a2c]/80 p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                    Living Room Setup
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-300 flex items-center space-x-1">
                  <span>☕ 7 Members Together</span>
                </span>
              </div>

              {/* Authentic BTS Group Photo in the Living Room */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-purple-500/30 bg-black">
                <img
                  src="/assets/bts_group.jpg"
                  alt="BTS Seated Together"
                  className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0720] via-transparent to-transparent opacity-75" />

                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-black/75 border border-purple-500/30 backdrop-blur-md text-center">
                  <p className="font-cinzel text-xs font-bold text-purple-200">
                    RM • JIN • SUGA • J-HOPE • JIMIN • V • JUNG KOOK
                  </p>
                  <p className="text-[10px] text-purple-400 font-montserrat">
                    Watching memories from 2013 to forever
                  </p>
                </div>
              </div>

              {/* Memory Chapter Story Excerpt */}
              <div className="mt-4 p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40">
                <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Chapter Lore</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-200/90 font-montserrat leading-relaxed">
                  {currentChapter.description}
                </p>
                <p className="font-cormorant italic text-xs text-purple-300 mt-2 border-l border-purple-500 pl-2">
                  "{currentChapter.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
