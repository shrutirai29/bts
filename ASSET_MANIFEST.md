# ASSET MANIFEST: BTS — A JOURNEY THROUGH FOREVER 💜

This document records the asset sources, creator attributions, license statuses, and intended usage locations across the application.

---

## 1. Visual & Photographic Assets

| Asset Name / Key | Target Section | Original Source / Rights Holder | License / Permission Status | Purpose & Notes |
| :--- | :--- | :--- | :--- | :--- |
| `hero_bts_stage.png` | Scene 01 (HeroStage) | Unsplash / Pexels Stage Photo (Curated Atmospheric Texture) | Unsplash License (Free commercial & personal use) | Atmospheric backdrop and concert lighting aura. |
| `rm_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Kim Namjoon (RM). |
| `jin_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Kim Seokjin (Jin). |
| `suga_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Min Yoongi (SUGA / Agust D). |
| `jhope_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Jung Hoseok (j-hope). |
| `jimin_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Park Jimin (Jimin). |
| `v_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Kim Taehyung (V). |
| `jungkook_portrait` | Scene 02 (MemberChoreography) | Unsplash Curated Model Representation | Unsplash License / CC0 | Editorial portrait placeholder for Jeon Jungkook (Jung Kook). |
| `living_room_sofa` | Scene 04 (MemoryRoom) | Unsplash Interior Architecture | Unsplash License (Free commercial use) | Cozy living room environment where members gather. |
| `reunion_stage_photo` | Scene 06 (FinaleScene) | Unsplash Concert Venue Architecture | Unsplash License (Free commercial use) | Stage backdrop for final reunited constellation scene. |

---

## 2. Album Covers & Official Discography

| Release Title | Release Year | Source Authority | Usage | Status |
| :--- | :--- | :--- | :--- | :--- |
| *2 Cool 4 Skool* | 2013 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *DARK & WILD* | 2014 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *HYYH: Young Forever* | 2016 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *WINGS / YNWA* | 2016-2017 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *Love Yourself: Answer* | 2018 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *Map of the Soul: 7* | 2020 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |
| *BE / Proof* | 2020-2022 | Big Hit Music / Wikimedia Commons | Discography sleeve rendering & tracklist | Fair use / Official reference |

---

## 3. Audio & Music Assets

| Track / Sound FX | Source / Engine | License | Implementation |
| :--- | :--- | :--- | :--- |
| Soft Piano & Rhodes Synth Stems | Web Audio API Custom Tone Generator | MIT (Generated procedurally in `src/utils/audioEngine.js`) | Synthesized soothing melodies (Spring Day, Mikrokosmos, 00:00, Butterfly, Epiphany, Life Goes On). |
| Vinyl Scratch & Stylus Drop FX | Web Audio API White Noise + Bandpass Filter | MIT (Procedural Web Audio) | Played upon album selection and gramophone turntable engagement. |
| Ambient Lofi Audio Streams | Pixabay Sound Library | Pixabay License (Free for non-commercial and commercial use) | Fallback soothing ambient piano stream for continuous listening. |

---

## 4. Typography & Iconography

| Font / Library | Provider | License | Intended Use |
| :--- | :--- | :--- | :--- |
| **Cinzel** | Google Fonts | Open Font License (OFL) | Dramatic luxury headlines & group titles |
| **Cormorant Garamond** | Google Fonts | Open Font License (OFL) | Poetic quotes & emotional reflections |
| **Great Vibes** | Google Fonts | Open Font License (OFL) | Hand-written cursive "Thank You" typography |
| **Montserrat** | Google Fonts | Open Font License (OFL) | Editorial body copy, tracklists & metadata |
| **Lucide Icons** | Lucide Open Source | ISC License | Controls, navigation pills, media icons |

---

## 5. 3D & Procedural Graphics

| Component | Library / Engine | Implementation | Performance |
| :--- | :--- | :--- | :--- |
| 3D Volumetric Spotlights (x7) | Three.js WebGL | Cylinder meshes with additive blending and dynamic opacity attenuation | Disposed properly on component unmount |
| Stardust Particle Galaxy | Three.js Points | 1,200 floating particles with violet/gold vertex colors | Single draw call with requestAnimationFrame |
| 3D Photobook & Rotating Vinyl | CSS 3D Transforms & Keyframes | Perspective `1000px` with transform-style `preserve-3d` | GPU hardware accelerated |
