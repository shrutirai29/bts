export interface SoloTrack {
  title: string;
  duration?: string;
  featured?: string;
  isTitleTrack?: boolean;
}

export interface SoloAlbum {
  id: string;
  title: string;
  year: string;
  releaseDate: string;
  cover: string;
  description: string;
  tracks: string[];
  streamingUrl?: string;
  officialMvUrl?: string;
}

export interface Member {
  id: string;
  index: number;
  name: string;
  koreanName: string;
  realName: string;
  role: string;
  artisticIdentity: string;
  birth: string;
  zodiac: string;
  mbti: string;
  quote: string;
  biography: string;
  color: string;
  accentColor: string;
  themeGlow: string;
  alignment: 'left' | 'right';
  portraitUrl: string;
  fullCutoutUrl: string;
  soloAlbums: SoloAlbum[];
  achievements: string[];
  facts: string[];
  officialSourceUrl: string;
}

export interface SongDetail {
  title: string;
  koreanTitle?: string;
  duration: string;
  composers: string[];
  producers?: string[];
  genre: string;
  theme: string;
  lyricsSnippet: string;
  englishMeaning: string;
  officialMvUrl?: string;
  streamingUrl?: string;
}

export interface GroupRelease {
  id: string;
  title: string;
  koreanTitle: string;
  type: string;
  year: string;
  releaseDate: string;
  vinylColor: string;
  cover: string;
  accentGlow: string;
  concept: string;
  description: string;
  totalTracks: number;
  keyTrack: string;
  tracks: SongDetail[];
  officialSourceUrl: string;
}

export interface MemoryChapter {
  id: string;
  startTime: number;
  endTime: number;
  timestamp: string;
  chapterTitle: string;
  tagline: string;
  description: string;
  videoEmbedUrl: string;
  thumbnail: string;
  milestone: string;
  quote: string;
  sourceUrl: string;
}

export interface ResourceItem {
  title: string;
  category: string;
  year?: string;
  runtime?: string;
  seasons?: string;
  venue?: string;
  views?: string;
  impact?: string;
  context?: string;
  highlight?: string;
  destinationUrl: string;
  platform?: string;
  verified: boolean;
}

export interface ResourceCategory {
  id: string;
  category: string;
  iconName: string;
  description: string;
  items: ResourceItem[];
}

export interface PlaylistItem {
  id: string;
  title: string;
  koreanTitle?: string;
  era: string;
  duration: string;
  bpm: number;
  key: string;
  description: string;
  lyricsExcerpt: string;
  audioUrl?: string;
  notes: Array<{ pitch: string; duration: number }>;
}

export interface GuestbookMessage {
  id: string | number;
  author: string;
  text: string;
  timestamp: string;
  favoriteSong?: string;
}
