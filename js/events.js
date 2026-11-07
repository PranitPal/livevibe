/**
 * LIVEVIBE - Centralized Concert Event Dataset
 * Premier Live Music Tours & Festival Schedules
 */

const LIVEVIBE_EVENTS = [
  {
    id: 1,
    artist: "Arijit Singh",
    title: "The Soulful Nights Tour",
    genre: "Bollywood",
    categories: ["Bollywood", "Pop"],
    date: "15 February 2027",
    time: "7:00 PM",
    isoDate: "2027-02-15T19:00:00",
    venue: "YMCA Grounds",
    city: "Chennai",
    priceRange: "₹1,499 - ₹4,999",
    duration: "3 Hours",
    ageLimit: "All Ages",
    description: "An unforgettable evening featuring soulful Bollywood melodies and live orchestral performances.",
    additionalDescription: "Join India's most celebrated playback vocalist for a magical 3-hour journey through chart-topping romantic ballads and acoustic renditions. Backed by a 40-piece grand symphony orchestra, cutting-edge acoustic engineering, and breathtaking visual projections.",
    image: "assets/images/arijit-singh.jpg",
    highlights: [
      "Live 40-piece grand symphony orchestra accompaniment",
      "Special acoustic unplugged segment",
      "Exclusive visual projections and laser production",
      "Dedicated food & beverage village with live DJ sets"
    ]
  },
  {
    id: 2,
    artist: "A. R. Rahman",
    title: "Harmony of Legends",
    genre: "Classical Fusion",
    categories: ["Classical Fusion", "Indie"],
    date: "28 February 2027",
    time: "6:30 PM",
    isoDate: "2027-02-28T18:30:00",
    venue: "Phoenix Marketcity Open Grounds",
    city: "Mumbai",
    priceRange: "₹1,999 - ₹7,499",
    duration: "3.5 Hours",
    ageLimit: "All Ages",
    description: "Experience an extraordinary musical journey blending Indian classical sounds with contemporary compositions.",
    additionalDescription: "The maestro returns with a multi-genre ensemble uniting traditional Indian classical instrumentation, sufi harmonies, and world-class electronic synthesis. Featuring guest instrumentalists from across the globe.",
    image: "assets/images/ar-rahman.jpg",
    highlights: [
      "Over 35 iconic compositions performed in surround sound",
      "Fusion of Indian ragas and contemporary electronic synthesizers",
      "Renowned guest instrumentalists from five continents",
      "Synchronized state-of-the-art stage lighting"
    ]
  },
  {
    id: 3,
    artist: "Coldplay",
    title: "Electric Skies Live",
    genre: "Rock / Pop",
    categories: ["Rock", "Pop"],
    date: "14 March 2027",
    time: "7:30 PM",
    isoDate: "2027-03-14T19:30:00",
    venue: "Jawaharlal Nehru Stadium",
    city: "New Delhi",
    priceRange: "₹2,499 - ₹12,999",
    duration: "2.5 Hours",
    ageLimit: "All Ages",
    description: "A spectacular live music experience featuring energetic performances, immersive visuals, and unforgettable anthems.",
    additionalDescription: "Witness the stadium spectacle of the decade with LED wristband choreographies, confetti fireworks, and iconic anthems spanning two decades of worldwide chart domination. Powered entirely by 100% renewable kinetic energy.",
    image: "assets/images/coldplay.jpg",
    highlights: [
      "Interactive LED wristbands creating stadium-wide light shows",
      "Sustainable stage design powered by kinetic energy floors",
      "Confetti storms, laser displays, and holographic spheres",
      "Setlist spanning Yellow, Fix You, Viva La Vida, and new hits"
    ]
  },
  {
    id: 4,
    artist: "Diljit Dosanjh",
    title: "Born To Shine Live",
    genre: "Punjabi / Hip-Hop",
    categories: ["Hip-Hop", "Pop"],
    date: "21 March 2027",
    time: "7:00 PM",
    isoDate: "2027-03-21T19:00:00",
    venue: "NICE Grounds",
    city: "Bengaluru",
    priceRange: "₹1,799 - ₹6,499",
    duration: "3 Hours",
    ageLimit: "All Ages",
    description: "An energetic concert celebrating Punjabi music, contemporary beats, and electrifying stage performances.",
    additionalDescription: "High-octane bhangra rhythms, world-class hype dancers, urban streetwear visuals, and Diljit's iconic charm delivering an infectious global Punjabi party experience.",
    image: "assets/images/diljit-dosanjh.jpg",
    highlights: [
      "Energetic live band with authentic Punjabi dhol players",
      "Dynamic urban dance crew choreographed by international artists",
      "Spectacular pyrotechnics and stadium flame effects",
      "Unrivaled crowd energy and sing-along hits"
    ]
  },
  {
    id: 5,
    artist: "The Weeknd",
    title: "After Hours Experience",
    genre: "R&B / Pop",
    categories: ["Pop", "Electronic"],
    date: "10 April 2027",
    time: "8:00 PM",
    isoDate: "2027-04-10T20:00:00",
    venue: "HITEX Exhibition Centre",
    city: "Hyderabad",
    priceRange: "₹2,999 - ₹10,999",
    duration: "2.5 Hours",
    ageLimit: "16+",
    description: "An immersive night of atmospheric pop, R&B, and spectacular stage production.",
    additionalDescription: "Step into a cinematic synthwave metropolis with towering cyberpunk stage sets, hypnotic laser displays, and unforgettable falsettos spanning After Hours and Dawn FM masterpieces.",
    image: "assets/images/weeknd.jpg",
    highlights: [
      "Futuristic cinematic city skyline set design",
      "Continuous immersive synthwave soundscapes and live vocals",
      "Hypnotic laser architecture and atmospheric fog",
      "Global chart-toppers Blinding Lights, Starboy, and Save Your Tears"
    ]
  },
  {
    id: 6,
    artist: "Anirudh Ravichander",
    title: "Rockstar Musical Night",
    genre: "Tamil / Indie / Pop",
    categories: ["Indie", "Pop", "Rock"],
    date: "18 April 2027",
    time: "7:00 PM",
    isoDate: "2027-04-18T19:00:00",
    venue: "YMCA Grounds",
    city: "Chennai",
    priceRange: "₹1,299 - ₹4,499",
    duration: "3.5 Hours",
    ageLimit: "All Ages",
    description: "Experience an energetic night of chart-topping Tamil hits, electrifying beats, and live performances.",
    additionalDescription: "Feel the unbridled adrenaline rush of South India's musical powerhouse! Packed with viral anthems, heavy bass drops, blazing pyrotechnics, and surprise celebrity guest appearances.",
    image: "assets/images/anirudh.jpg",
    highlights: [
      "High-energy live rock and electronic drum solo showdowns",
      "Surprise guest star vocalist appearances",
      "Stunning 360-degree LED screen installations",
      "Fan-favourite hook steps and stadium-wide chant moments"
    ]
  },
  {
    id: 7,
    artist: "Imagine Dragons",
    title: "Thunder Live Tour",
    genre: "Alternative Rock",
    categories: ["Rock", "Electronic"],
    date: "2 May 2027",
    time: "7:30 PM",
    isoDate: "2027-05-02T19:30:00",
    venue: "Palace Grounds",
    city: "Bengaluru",
    priceRange: "₹2,499 - ₹8,999",
    duration: "2.5 Hours",
    ageLimit: "All Ages",
    description: "A high-energy rock concert featuring powerful vocals, memorable anthems, and immersive visuals.",
    additionalDescription: "Thunderous stadium drums, raw vocal intensity, and unforgettable stadium sing-alongs. An explosive rock experience celebrating resilience, passion, and arena-filling euphoria.",
    image: "assets/images/imagine-dragons.jpg",
    highlights: [
      "Massive arena drum battle solos and acoustic arrangements",
      "Raw, impassioned vocals and inspiring crowd speeches",
      "Heavy guitar riffs backed by cinematic visual storylines",
      "Anthems Believer, Radioactive, Demons, and Bones"
    ]
  },
  {
    id: 8,
    artist: "Ed Sheeran",
    title: "Acoustic Memories",
    genre: "Pop / Acoustic",
    categories: ["Pop", "Indie"],
    date: "16 May 2027",
    time: "6:30 PM",
    isoDate: "2027-05-16T18:30:00",
    venue: "Jio World Garden",
    city: "Mumbai",
    priceRange: "₹1,999 - ₹7,999",
    duration: "2.5 Hours",
    ageLimit: "All Ages",
    description: "An intimate musical experience featuring acoustic performances and popular original songs.",
    additionalDescription: "Just Ed, a custom loop pedal, and his acoustic guitar captivating tens of thousands with heartwarming storytelling, seamless loop-building, and record-breaking pop classics.",
    image: "assets/images/ed-sheeran.jpg",
    highlights: [
      "100% live looping station mastery with zero backing tracks",
      "Intimate storytelling behind global multi-platinum hits",
      "Starlit open-air amphitheater atmosphere",
      "Sing-alongs to Shape of You, Perfect, Thinking Out Loud, and Castle on the Hill"
    ]
  }
];

// Centralized helper functions for accessing events
const LiveVibeData = {
  events: LIVEVIBE_EVENTS,

  getAllEvents() {
    return [...this.events];
  },

  getEventById(id) {
    const numId = parseInt(id, 10);
    return this.events.find(e => e.id === numId) || null;
  },

  getNextUpcomingEvent() {
    const now = new Date();
    // Sort events by date ascending
    const sorted = [...this.events].sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    // Find first event whose date is in the future
    const upcoming = sorted.find(e => new Date(e.isoDate) > now);
    return upcoming || sorted[0]; // Fallback to first if all in past
  },

  getAllGenres() {
    return [
      "Pop",
      "Rock",
      "Electronic",
      "Bollywood",
      "Hip-Hop",
      "Indie",
      "Classical Fusion"
    ];
  },

  filterEvents({ searchTerm = "", genre = "All Events", sortBy = "upcoming" } = {}) {
    let result = [...this.events];

    // Filter by genre
    if (genre && genre !== "All Events" && genre !== "All") {
      const gLower = genre.toLowerCase().trim();
      result = result.filter(e => {
        // Match in genre string or categories array
        const matchMain = e.genre.toLowerCase().includes(gLower);
        const matchCats = e.categories && e.categories.some(c => c.toLowerCase() === gLower);
        return matchMain || matchCats;
      });
    }

    // Filter by search term
    if (searchTerm && searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(e => {
        return (
          e.artist.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.genre.toLowerCase().includes(q) ||
          (e.categories && e.categories.some(c => c.toLowerCase().includes(q))) ||
          e.description.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    if (sortBy === "upcoming") {
      result.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }
};

// Make available globally in browser
if (typeof window !== "undefined") {
  window.LiveVibeData = LiveVibeData;
  window.LIVEVIBE_EVENTS = LIVEVIBE_EVENTS;
}
