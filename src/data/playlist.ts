import { PlaylistItem } from '../types';

export interface VerifiedPlaylistItem extends PlaylistItem {
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeMusicUrl: string;
}

export const softSongPlaylist: VerifiedPlaylistItem[] = [
  {
    id: "spring_day",
    title: "Spring Day (봄날)",
    koreanTitle: "봄날",
    era: "You Never Walk Alone (2017)",
    duration: "4:34",
    bpm: 108,
    key: "E Major",
    description: "The timeless ballad of longing and friendship across winter until spring flowers bloom.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/2j1fvnEWsATMuEl7H6KiO8",
    appleMusicUrl: "https://music.apple.com/song/spring-day/1203713057",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=xEeFrLSkMm8",
    notes: [
      { pitch: "E4", duration: 0.8 }, { pitch: "G#4", duration: 0.8 }, { pitch: "B4", duration: 1.2 },
      { pitch: "C#5", duration: 1.0 }, { pitch: "B4", duration: 0.8 }, { pitch: "G#4", duration: 1.2 },
      { pitch: "A4", duration: 0.8 }, { pitch: "G#4", duration: 0.8 }, { pitch: "F#4", duration: 1.4 },
      { pitch: "E4", duration: 1.6 }
    ]
  },
  {
    id: "mikrokosmos",
    title: "Mikrokosmos (소우주)",
    koreanTitle: "소우주",
    era: "Map of the Soul: Persona (2019)",
    duration: "3:44",
    bpm: 92,
    key: "Ab Major",
    description: "Stadium anthem about finding light and cosmic connection in the dark night sky.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/5hnbE5nO3E45z0n3E9k9M",
    appleMusicUrl: "https://music.apple.com/song/mikrokosmos/1458763567",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=kX0vO4vlJuU",
    notes: [
      { pitch: "Ab4", duration: 0.6 }, { pitch: "C5", duration: 0.6 }, { pitch: "Eb5", duration: 1.2 },
      { pitch: "F5", duration: 0.8 }, { pitch: "Eb5", duration: 0.8 }, { pitch: "C5", duration: 1.0 }
    ]
  },
  {
    id: "zero_oclock",
    title: "00:00 (Zero O'Clock)",
    koreanTitle: "Zero O'Clock",
    era: "Map of the Soul: 7 (2020)",
    duration: "4:10",
    bpm: 80,
    key: "F# Major",
    description: "A comforting vocal line ballad about resetting your heart when midnight strikes.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/6Utnb7g4Q3G9k7xV5d1t5W",
    appleMusicUrl: "https://music.apple.com/song/00-00-zero-oclock/1498453478",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=kXpOEzNZ8hQ",
    notes: [
      { pitch: "F#4", duration: 0.8 }, { pitch: "A#4", duration: 0.8 }, { pitch: "C#5", duration: 1.2 },
      { pitch: "D#5", duration: 1.0 }, { pitch: "C#5", duration: 0.8 }, { pitch: "A#4", duration: 1.0 }
    ]
  },
  {
    id: "life_goes_on",
    title: "Life Goes On",
    koreanTitle: "Life Goes On",
    era: "BE (2020)",
    duration: "3:27",
    bpm: 81,
    key: "Ab Major",
    description: "An acoustic lullaby assuring us that even in global isolation, life gently moves forward.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/24NuAhFYCQVTm0Za5AlT74",
    appleMusicUrl: "https://music.apple.com/song/life-goes-on/1539744116",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=-5q5mZbe3V8",
    notes: [
      { pitch: "Eb4", duration: 0.8 }, { pitch: "Ab4", duration: 0.8 }, { pitch: "C5", duration: 1.0 },
      { pitch: "Bb4", duration: 0.8 }, { pitch: "Ab4", duration: 0.8 }, { pitch: "F4", duration: 1.2 }
    ]
  },
  {
    id: "magic_shop",
    title: "Magic Shop",
    koreanTitle: "Magic Shop",
    era: "Love Yourself: Tear (2018)",
    duration: "4:36",
    bpm: 86,
    key: "G Major",
    description: "Dedicated to ARMY: a sanctuary in your heart to find warm comfort and brotherhood.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/4bHsxqRoxv4g6Op4vRzZ",
    appleMusicUrl: "https://music.apple.com/song/magic-shop/1384388432",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=7C2z4GqqS5E",
    notes: [
      { pitch: "G4", duration: 0.8 }, { pitch: "B4", duration: 0.8 }, { pitch: "D5", duration: 1.2 },
      { pitch: "E5", duration: 1.0 }, { pitch: "D5", duration: 0.8 }, { pitch: "B4", duration: 1.0 }
    ]
  },
  {
    id: "epiphany",
    title: "Epiphany",
    koreanTitle: "Epiphany",
    era: "Love Yourself: Answer (2018)",
    duration: "4:00",
    bpm: 78,
    key: "F Major",
    description: "The monumental awakening that your own soul deserves all the love you give away.",
    lyricsExcerpt: "",
    spotifyUrl: "https://open.spotify.com/track/10tWhR1gG8h4H8G9t1b4P",
    appleMusicUrl: "https://music.apple.com/song/epiphany/1433647185",
    youtubeMusicUrl: "https://www.youtube.com/watch?v=fIkZOLsnoqY",
    notes: [
      { pitch: "F4", duration: 0.8 }, { pitch: "A4", duration: 0.8 }, { pitch: "C5", duration: 1.2 },
      { pitch: "D5", duration: 1.0 }, { pitch: "C5", duration: 0.8 }, { pitch: "A4", duration: 1.0 }
    ]
  }
];
