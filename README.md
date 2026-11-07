# LiveVibe – Live Music Concert Event Management Website

> **"Feel the Music. Live the Moment."**

LiveVibe is a modern, responsive, and visually immersive frontend web application dedicated exclusively to live music concerts and music festivals across India. Designed with a dark-themed music festival aesthetic, it enables music fans to discover upcoming tours, explore diverse musical genres, view detailed concert schedules and production highlights, and register their interest via client-side validated forms.

---

## 🌟 Key Features

1. **Visually Impressive Homepage (`index.html`)**
   - High-impact hero section with concert crowd visuals, dynamic atmospheric glows, and dual call-to-actions.
   - Live **Event Countdown Timer Widget** that dynamically targets the nearest upcoming concert.
   - **Featured Concerts Showcase** highlighting premier stadium and arena tours.
   - **Interactive Genre Discovery Grid** linking directly to filtered views.
   - **Why Choose LiveVibe** value proposition highlights.
   - Platform overview, concert statistics, and demo contact touchpoints.

2. **Concert Exploration & Discovery Hub (`events.html`)**
   - Real-time **multi-parameter live search** across artist names, tour titles, cities, venues, and genres.
   - Multi-category **genre filter pills** (All Events, Pop, Rock, Bollywood, Hip-Hop, Electronic, Indie, Classical Fusion).
   - Dynamic **sorting engine** (Upcoming First, Event Name A–Z, Event Name Z–A).
   - Deep-linking support: incoming URL query parameters (e.g., `events.html?genre=Bollywood`) automatically trigger the respective category filter.
   - Real-time result counter and a user-friendly empty state with a one-click filter reset.

3. **Individual Concert Details Page (`event-details.html`)**
   - URL query parameter parsing (`event-details.html?id=1`).
   - Cinematic hero banner with artist spotlight and date/venue metadata.
   - Detailed tour narratives, 4-point production highlights, and venue entry guidelines.
   - Sticky booking interest sidebar with indicative ticket pricing tiers.
   - Robust error handling for invalid or missing IDs without broken layouts or undefined values.

4. **Client-Side Registration & Live Preview (`register.html`)**
   - Dynamic concert selection dropdown pre-populated from the centralized dataset.
   - Seamless pre-selection via URL query parameters (`register.html?event=1`).
   - Interactive live summary card that updates dynamically as different concerts are selected.
   - Comprehensive frontend validation sequence (minimum 2 characters for full name, RFC email regex, Indian 10-digit mobile number format with optional `+91`/`91`, concert selection, and mandatory terms agreement).
   - Real-time inline feedback and visual states.

5. **Registration Confirmation Modal**
   - Instant celebration overlay upon successful form validation.
   - Echoes participant name, selected artist, concert title, and concert date.
   - Quick one-click navigation to explore more concerts or register another attendee.
   - **Zero persistence / Zero server transmission compliance.**

6. **Bonus Enhancements**
   - **Dark / Light Mode Toggle**: Seamless, high-contrast theme switching implemented purely in-memory without persistent local storage.
   - **Live Countdown Timer**: Dynamically evaluates the closest future tour date from the dataset and counts down in days, hours, minutes, and seconds.
   - **Subtle Animations**: Smooth entrance keyframes, hover card lift effects, glowing borders, and scroll-triggered reveals via `IntersectionObserver`.
   - **Responsive Navigation**: Glassmorphic sticky navbar with an accessible mobile hamburger drawer.

---

## 💻 Technologies Used

- **HTML5**: Clean, accessible, semantic markup with ARIA landmarks.
- **CSS3**: Custom design system using CSS variables, flexbox, CSS grid, glassmorphism, responsive breakpoints, and keyframe animations.
- **Vanilla JavaScript (ES6+)**: Modular client-side architecture without any external framework dependencies.
- **Google Fonts**: Modern typography pairing *Space Grotesk* (headings) and *Inter* (body).
- **Font Awesome 6 (CDN)**: Comprehensive iconography for intuitive user actions.

---

## 📁 Project Structure

```
livevibe/
│
├── index.html                  # Homepage (Hero, countdown, featured shows, genres, about)
├── events.html                 # Concert exploration hub (Live search, genre filter, sort)
├── event-details.html          # Dynamic concert details page (Query param ?id=X)
├── register.html               # Registration page with interactive preview & confirmation modal
│
├── css/
│   └── style.css               # Design system, themes (dark/light), responsive layout
│
├── js/
│   ├── events.js               # Centralized dataset of 8 demonstration concerts & helper methods
│   ├── main.js                 # Global nav, theme toggle, countdown timer, scroll reveal
│   ├── events-page.js          # Search, genre filtering, and sorting logic for events.html
│   ├── event-details.js        # ID query param handler & error state for event-details.html
│   └── registration.js         # Strict client-side form validation & confirmation logic
│
├── assets/
│   ├── images/
│   │   ├── hero-concert.jpg    # High-resolution crowd concert background
│   │   ├── arijit-singh.jpg    # Arijit Singh concert visual
│   │   ├── ar-rahman.jpg       # A. R. Rahman concert visual
│   │   ├── coldplay.jpg        # Coldplay concert visual
│   │   ├── diljit-dosanjh.jpg  # Diljit Dosanjh concert visual
│   │   ├── weeknd.jpg          # The Weeknd concert visual
│   │   ├── anirudh.jpg         # Anirudh Ravichander concert visual
│   │   ├── imagine-dragons.jpg # Imagine Dragons concert visual
│   │   └── ed-sheeran.jpg      # Ed Sheeran concert visual
│   │
│   └── favicon.ico             # Custom gradient audio wave favicon
│
├── README.md                   # Project documentation & deployment guide
├── .gitignore                  # Git exclusions for OS & editor metadata
└── vercel.json                 # Vercel static cleanUrls configuration
```

---

## 🎶 Centralized Concert Dataset

The application comes pre-loaded with eight demonstration concert tours:

1. **Arijit Singh** – *The Soulful Nights Tour* (Bollywood) &bull; 15 Feb 2027 &bull; YMCA Grounds, Chennai
2. **A. R. Rahman** – *Harmony of Legends* (Classical Fusion) &bull; 28 Feb 2027 &bull; Phoenix Marketcity Open Grounds, Mumbai
3. **Coldplay** – *Electric Skies Live* (Rock / Pop) &bull; 14 Mar 2027 &bull; Jawaharlal Nehru Stadium, New Delhi
4. **Diljit Dosanjh** – *Born To Shine Live* (Punjabi / Hip-Hop) &bull; 21 Mar 2027 &bull; NICE Grounds, Bengaluru
5. **The Weeknd** – *After Hours Experience* (R&B / Pop) &bull; 10 Apr 2027 &bull; HITEX Exhibition Centre, Hyderabad
6. **Anirudh Ravichander** – *Rockstar Musical Night* (Tamil / Indie / Pop) &bull; 18 Apr 2027 &bull; YMCA Grounds, Chennai
7. **Imagine Dragons** – *Thunder Live Tour* (Alternative Rock) &bull; 2 May 2027 &bull; Palace Grounds, Bengaluru
8. **Ed Sheeran** – *Acoustic Memories* (Pop / Acoustic) &bull; 16 May 2027 &bull; Jio World Garden, Mumbai

---

## 🚀 Local Installation & Usage

Because LiveVibe is built purely with vanilla HTML, CSS, and JavaScript, no complex build process or package installation is needed.

### Method 1: Direct File Access
Simply double-click `index.html` or open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local Static Server (Recommended)
Running through a local static server ensures seamless handling of URL query parameters across all browsers:

**Using Python:**
```bash
# Navigate to the project root
cd livevibe

# Start local server on port 8000
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node / npx:**
```bash
npx serve .
```

---

## ☁️ Deployment Guide (GitHub & Vercel)

The repository is configured for instantaneous deployment on **Vercel** with **GitHub** as the source:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LiveVibe event management platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/livevibe.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New...** &rarr; **Project**.
   - Select your `livevibe` GitHub repository and click **Import**.
   - Under **Framework Preset**, select **Other**.
   - Leave **Root Directory** as `./`.
   - Leave **Build Command** and **Output Directory** empty (static project).
   - Click **Deploy**.

The included `vercel.json` ensures clean URLs:
```json
{
  "cleanUrls": true
}
```

---

## 🎫 Platform Architecture & User Experience

- **High-Performance Edge Architecture:** LiveVibe is architected as an ultra-fast, responsive live music discovery platform suitable for static edge CDN deployment (e.g., Vercel, Netlify, Cloudflare Pages).
- **Instant Client-Side Verification:** The registration engine validates participant names, RFC email patterns, Indian mobile numbers, and event preferences directly in the browser with zero latency, instantly generating official digital pass confirmations.
- **Privacy & Security First:** Form submissions are validated seamlessly with zero third-party tracking, ensuring a swift and clean user experience.
- **Dynamic Live Tour Schedule:** Concert schedules, venues, dates, and stage production specs are centrally managed for lightning-fast multi-parameter search and genre-based filtering.

---

## 📄 License
© 2027 LIVEVIBE. All rights reserved. Live Music Concert Platform.
