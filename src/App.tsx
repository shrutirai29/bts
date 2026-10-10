import React, { useState, useEffect } from 'react';
import ThreeStageCanvas from './components/ThreeStageCanvas';
import Navigation from './components/Navigation';
import HeroStage from './scenes/HeroStage';
import MemberChoreography from './scenes/MemberChoreography';
import AlbumJourney from './scenes/AlbumJourney';
import MemoryRoom from './scenes/MemoryRoom';
import ResourceGallery from './scenes/ResourceGallery';
import FinaleScene from './scenes/FinaleScene';
import PersistentAudioPlayer from './components/PersistentAudioPlayer';
import CustomCursor from './components/CustomCursor';
import { softSongPlaylist } from './data/playlist';
import { soundEngine } from './utils/audioEngine';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);

  // Initialize Sound Engine listener
  useEffect(() => {
    soundEngine.onStateChange = (state: any) => {
      setIsAudioPlaying(state.isPlaying);
      if (state.currentTrackIndex !== undefined) {
        setCurrentTrackIndex(state.currentTrackIndex);
      }
    };
  }, []);

  // Listen for first user scroll to initiate soft soundtrack
  useEffect(() => {
    let hasTriggered = false;

    const handleFirstInteraction = () => {
      if (!hasTriggered && !soundEngine.isPlaying) {
        hasTriggered = true;
        soundEngine.init();
        soundEngine.playTrack(softSongPlaylist, 0);
        setIsAudioPlaying(true);
      }
    };

    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  // Track active member viewport position for Three.js spotlight focusing
  useEffect(() => {
    const memberIds = ['rm', 'jin', 'suga', 'jhope', 'jimin', 'v', 'jungkook'];

    const handleScrollSpotlight = () => {
      const windowHeight = window.innerHeight;
      let activeIndex = 0;

      for (let i = 0; i < memberIds.length; i++) {
        const el = document.getElementById(`member-chapter-${memberIds[i]}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3) {
            activeIndex = i + 1;
            break;
          }
        }
      }
      setActiveMemberIndex(activeIndex);
    };

    window.addEventListener('scroll', handleScrollSpotlight, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpotlight);
  }, []);

  // Audio Handlers
  const handleToggleAudio = () => {
    soundEngine.toggle(softSongPlaylist);
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % softSongPlaylist.length;
    setCurrentTrackIndex(nextIdx);
    soundEngine.playTrack(softSongPlaylist, nextIdx);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + softSongPlaylist.length) % softSongPlaylist.length;
    setCurrentTrackIndex(prevIdx);
    soundEngine.playTrack(softSongPlaylist, prevIdx);
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    soundEngine.playTrack(softSongPlaylist, idx);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundEngine.setVolume(newVol);
  };

  const handleStartJourney = () => {
    if (!isAudioPlaying) {
      soundEngine.playTrack(softSongPlaylist, 0);
      setIsAudioPlaying(true);
    }
    const memberSection = document.getElementById('members-journey');
    if (memberSection) {
      memberSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#07020d] text-white selection:bg-purple-600 selection:text-white font-montserrat overflow-x-hidden">
      {/* Three.js Stage WebGL Canvas with 3D Volumetric Lights and Particles */}
      <ThreeStageCanvas activeMemberIndex={activeMemberIndex} />

      {/* Desktop Glowing Cursor */}
      <CustomCursor />

      {/* Top Glassmorphic Navigation with Scroll Progress Indicator */}
      <Navigation
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        currentTrack={softSongPlaylist[currentTrackIndex]}
      />

      {/* 6 Core Scenes */}
      <main className="relative z-10 space-y-12">
        {/* Scene 1: The Grand Entrance */}
        <HeroStage
          onStartJourney={handleStartJourney}
          isAudioPlaying={isAudioPlaying}
        />

        {/* Scene 2: Seven Members, Seven Stories */}
        <MemberChoreography />

        {/* Scene 3: The Living Discography */}
        <AlbumJourney
          onPlayPreviewSong={() => {
            soundEngine.playTrack(softSongPlaylist, currentTrackIndex);
          }}
        />

        {/* Scene 4: The Memory Room */}
        <MemoryRoom />

        {/* Scene 5: The BTS Resource Universe */}
        <ResourceGallery />

        {/* Scene 6: The Final Goodbye */}
        <FinaleScene onReplayJourney={handleReplayJourney} />
      </main>

      {/* Persistent Soft Music Player */}
      <PersistentAudioPlayer
        isPlaying={isAudioPlaying}
        currentTrackIndex={currentTrackIndex}
        onTogglePlay={handleToggleAudio}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onSelectTrack={handleSelectTrack}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
