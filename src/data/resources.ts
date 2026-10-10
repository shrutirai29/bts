import { ResourceCategory } from '../types';

export const resourceCategories: ResourceCategory[] = [
  {
    id: "mvs",
    category: "Official Music Videos",
    iconName: "Film",
    description: "Cinematic story universes and ground-breaking choreography visuals.",
    items: [
      { title: "Spring Day (봄날)", category: "Music Video", views: "550M+", year: "2017", destinationUrl: "https://www.youtube.com/watch?v=xEeFrLSkMm8", highlight: "The Queen of Korean Charts and BU cinematic foundation.", verified: true },
      { title: "Blood Sweat & Tears (피 땀 눈물)", category: "Music Video", views: "980M+", year: "2016", destinationUrl: "https://www.youtube.com/watch?v=hmE9f-TEutc", highlight: "Demian-inspired visual art masterpiece.", verified: true },
      { title: "Dynamite", category: "Music Video", views: "1.8B+", year: "2020", destinationUrl: "https://www.youtube.com/watch?v=gdZLi9oWNZg", highlight: "1st Korean Billboard Hot 100 #1 history-maker.", verified: true },
      { title: "Boy With Luv (feat. Halsey)", category: "Music Video", views: "1.7B+", year: "2019", destinationUrl: "https://www.youtube.com/watch?v=XsX3ATc3FbA", highlight: "Joyous homage to classic musical cinema.", verified: true },
      { title: "DNA", category: "Music Video", views: "1.6B+", year: "2017", destinationUrl: "https://www.youtube.com/watch?v=MBdVXkS44Bo", highlight: "First BTS music video to cross 1 Billion views.", verified: true },
      { title: "MIC Drop (Steve Aoki Remix)", category: "Music Video", views: "1.4B+", year: "2017", destinationUrl: "https://www.youtube.com/watch?v=kTlv5_Bs8aw", highlight: "Fierce anthem silencing critics.", verified: true }
    ]
  },
  {
    id: "concerts",
    category: "Concerts & Live Performances",
    iconName: "Music",
    description: "Iconic stadium spectacles and purple oceans across the globe.",
    items: [
      { title: "Love Yourself: Speak Yourself at Wembley Stadium", category: "Live Concert", year: "2019", venue: "London, UK", highlight: "Sold-out 120,000 attendance with historic Young Forever surprise.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "Yet To Come in Busan", category: "Live Concert", year: "2022", venue: "Busan, South Korea", highlight: "50,000 in-person + 49M global live viewers supporting World Expo bid.", destinationUrl: "https://weverse.io/bts", verified: true },
      { title: "Permission to Dance on Stage - LA", category: "Live Concert", year: "2021", venue: "SoFi Stadium, Los Angeles", highlight: "First in-person stadium reunion following global pandemic.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "5th Muster: Magic Shop", category: "Fan Meeting", year: "2019", venue: "Seoul Olympic Gymnastics Arena", highlight: "Comforting fan meeting dedicated to the healing Magic Shop.", destinationUrl: "https://weverse.io/bts", verified: true }
    ]
  },
  {
    id: "dance-practices",
    category: "Dance Practices & Rehearsals",
    iconName: "Flame",
    description: "Famous synchronized footwork and razor-sharp rehearsal precision.",
    items: [
      { title: "Blood Sweat & Tears Dance Practice", category: "Dance Practice", year: "2016", platform: "BANGTANTV", highlight: "Legendary footwork synchronization in practice room.", destinationUrl: "https://www.youtube.com/watch?v=v8z1TdaXA3U", verified: true },
      { title: "Dionysus Practice (2019 MMA ver.)", category: "Dance Practice", year: "2019", platform: "BANGTANTV", highlight: "Intense table acrobatics and Roman Dionysus choreography.", destinationUrl: "https://www.youtube.com/watch?v=KzF187_f6gA", verified: true },
      { title: "Black Swan Dance Practice", category: "Dance Practice", year: "2020", platform: "BANGTANTV", highlight: "Barefoot contemporary dance expression.", destinationUrl: "https://www.youtube.com/watch?v=gqhB8ZKSTHM", verified: true },
      { title: "Butter (Special Performance Video)", category: "Dance Practice", year: "2021", platform: "BANGTANTV", highlight: "Charismatic 3J (j-hope, Jimin, Jung Kook) unit choreography.", destinationUrl: "https://www.youtube.com/watch?v=0lapF4DQPKQ", verified: true }
    ]
  },
  {
    id: "behind-the-scenes",
    category: "Behind-the-Scenes & Bangtan Bombs",
    iconName: "Camera",
    description: "Unfiltered dressing room moments, music video shoots, and laughter.",
    items: [
      { title: "BANGTAN BOMB Collection", category: "BTS Archive", platform: "BANGTANTV (YouTube)", highlight: "Over 800+ short candid backstage moments documented since 2013.", destinationUrl: "https://www.youtube.com/@BANGTANTV", verified: true },
      { title: "EPISODE: Music Video Shoot Diaries", category: "BTS Archive", platform: "BANGTANTV", highlight: "Behind-the-scenes documentaries for every album title track.", destinationUrl: "https://www.youtube.com/@BANGTANTV", verified: true }
    ]
  },
  {
    id: "interviews",
    category: "Interviews & Historic Speeches",
    iconName: "Globe",
    description: "Diplomatic addresses, cultural diplomacy, and inspiring youth worldwide.",
    items: [
      { title: "UN 73rd General Assembly: Speak Yourself", category: "Global Speech", year: "2018", context: "UNICEF Generation Unlimited launch", highlight: "RM's timeless message urging every youth to find their name and voice.", destinationUrl: "https://www.youtube.com/watch?v=oTe4f-bBEKg", verified: true },
      { title: "UN 76th General Assembly: The Welcome Generation", category: "Global Speech", year: "2021", context: "Special Presidential Envoys", highlight: "Reframing youth not as a 'lost generation' but a 'welcome generation'.", destinationUrl: "https://www.youtube.com/watch?v=wX8B5qJ22Zg", verified: true },
      { title: "The White House Press Briefing with President Biden", category: "Diplomatic Address", year: "2022", context: "AANHPI Heritage Month", highlight: "Advocating for anti-Asian hate prevention and diversity celebration.", destinationUrl: "https://www.youtube.com/watch?v=2r5p_Y9Y7hA", verified: true }
    ]
  },
  {
    id: "variety",
    category: "Variety & Entertainment Content",
    iconName: "Tv",
    description: "Unfiltered brotherhood, cooking hilarity, and travel adventures.",
    items: [
      { title: "Run BTS! (달려라 방탄)", category: "Variety Show", seasons: "156+ Episodes", platform: "Weverse / YouTube", highlight: "Iconic challenges: water park games, pottery, mafia, photo story.", destinationUrl: "https://weverse.io/bts", verified: true },
      { title: "In the SOOP BTS ver. (Season 1 & 2)", category: "Healing Reality", seasons: "13 Episodes", platform: "Weverse / JTBC", highlight: "Peaceful retreat in nature with cooking, painting, and rest.", destinationUrl: "https://weverse.io/bts", verified: true },
      { title: "Bon Voyage (Seasons 1 - 4)", category: "Travel Reality", seasons: "4 Seasons", platform: "Norway, Hawaii, Malta, NZ", highlight: "Spontaneous backpacking journeys around the globe.", destinationUrl: "https://weverse.io/bts", verified: true },
      { title: "Suchwita (슈취타)", category: "Talk Show", seasons: "25+ Episodes", platform: "YouTube (BANGTANTV)", highlight: "SUGA's intimate drink conversations with members and legends.", destinationUrl: "https://www.youtube.com/@BANGTANTV", verified: true }
    ]
  },
  {
    id: "documentaries",
    category: "Documentaries & Official Films",
    iconName: "Clapperboard",
    description: "Raw backstage vulnerability, tours, and personal philosophies.",
    items: [
      { title: "Burn the Stage: The Movie (2018)", category: "Docu-Film", runtime: "84 mins", highlight: "First BTS feature film documenting the 2017 WINGS Live Trilogy Tour.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "Bring the Soul: The Movie (2019)", category: "Docu-Film", runtime: "103 mins", highlight: "Reflective conversations on a Paris rooftop after European shows.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "Break the Silence: The Movie (2020)", category: "Docu-Film", runtime: "90 mins", highlight: "Personal narratives during the Love Yourself: Speak Yourself stadium tour.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "BTS Monuments: Beyond the Star (2023)", category: "Disney+ Docuseries", seasons: "8 Episodes", highlight: "10-year definitive retrospective spanning debut to solo journeys.", destinationUrl: "https://www.disneyplus.com", verified: true }
    ]
  },
  {
    id: "charity",
    category: "Charity & LOVE MYSELF Social Impact",
    iconName: "Heart",
    description: "Spreading unconditional love, ending violence, and empowering youth.",
    items: [
      { title: "UNICEF #ENDviolence / LOVE MYSELF Campaign", category: "Global Philanthropy", impact: "Over $6.6 Million USD raised", highlight: "Empowering children and youth against violence and mental distress.", destinationUrl: "https://www.love-myself.org", verified: true },
      { title: "Black Lives Matter Solidarity Donation", category: "Social Justice", impact: "$1,000,000 USD from BTS + $1M matched by ARMY in 24h", highlight: "Global solidarity with racial equality movements (#MatchAMillion).", destinationUrl: "https://bts.ibighit.com/eng/", verified: true },
      { title: "Live Nation Crew Nation Relief Fund", category: "Industry Support", impact: "$1,000,000 USD donated", highlight: "Providing relief to touring concert production staff and crew.", destinationUrl: "https://bts.ibighit.com/eng/", verified: true }
    ]
  },
  {
    id: "official-destinations",
    category: "Official Platforms & Communities",
    iconName: "ExternalLink",
    description: "Direct verified links to official BTS portals and global communities.",
    items: [
      { title: "Official BTS Website (Big Hit Music)", category: "Portal", destinationUrl: "https://bts.ibighit.com/eng/", highlight: "Official discography, member profiles, and schedule.", verified: true },
      { title: "BTS on Weverse", category: "Community", destinationUrl: "https://weverse.io/bts", highlight: "Artist notices, live broadcasts, and official fan club community.", verified: true },
      { title: "Weverse Shop", category: "Merchandise", destinationUrl: "https://shop.weverse.io/en/shop/USD/artists/2", highlight: "Official albums, lightsticks (ARMY Bomb), and goods.", verified: true },
      { title: "BTS on Spotify", category: "Music", destinationUrl: "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX", highlight: "Over 35+ Billion streams on Spotify.", verified: true },
      { title: "BTS on Apple Music", category: "Music", destinationUrl: "https://music.apple.com/artist/bts/883131348", highlight: "Complete Spatial Audio catalog.", verified: true }
    ]
  }
];
