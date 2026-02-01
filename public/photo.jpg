# PRD — “Unlock the Question” Valentine Puzzle App

## 1) Product Summary
A mobile-first, colorful, cute micro-web-app where your girlfriend solves a short, personal 4-digit puzzle to “unlock” a final screen that shows a photo of you together and asks: **“Will you be my Valentine?”** The experience ends with an adorable, animated “Yes” celebration, plus a gentle, respectful alternative path if she chooses “Not this year”.

**Platform:** Responsive web app (PWA-ready optional) optimized for phones.  
**Primary device:** Mobile (portrait).  
**Session length:** 30–90 seconds.  
**Tone:** Cute, playful, warm, personal, not coercive.

---

## 2) Goals & Success Metrics

### Goals
1. Create a delightful, memorable Valentine ask.
2. Keep interaction friction low (works on one link).
3. Ensure the “No/Not now” option is respected (no guilt/pressure).
4. Make the end-screen feel like a reward: photo + animation + optional “next step” (date plan).

### Success Metrics (informal)
- Completion rate (reaches unlocked screen): >80% for first-time user
- Time-to-unlock: 30–60 seconds average
- “Yes” click happiness: subjective delight (laugh/smile reaction)
- No confusion: <1 drop-off at puzzle due to unclear hints

---

## 3) Target User
- **Primary:** Your girlfriend (one-time user).
- **Secondary:** You (creator) who sets up the code and photo.

### User Context
- Receives a link on WhatsApp/DM.
- Opens on mobile quickly.
- Expects cute visuals and a short interaction.
- Wants an easy, safe experience without weird permissions.

---

## 4) User Stories
1. As a user, I want the puzzle to be obvious and solvable quickly so I feel clever, not stuck.
2. As a user, I want the app to feel cute and smooth with playful animations.
3. As a user, I want the “Yes” moment to feel like a celebration and something I can replay/share with you.
4. As a user, if I select “Not this year,” I want the app to respond kindly and not pressure me.

---

## 5) Key Experience Flow (Mobile-First)

### Screen A — Welcome
- Cute header: “Hi [Her Nickname] 💖” (optional)
- Subtitle: “Small game. Big question.”
- CTA: **Start**
- Ambient animation: floating hearts/confetti bubbles (subtle).
- Tiny footer: “Made with love by Brilly” (optional).

### Screen B — Puzzle: 4-digit Code Lock
- UI: Big “lock” card with 4 digit slots ( _ _ _ _ ) and a keypad.
- 3–4 “hint cards” (tap to flip) with personal clues:
  - Example hints (customizable):
    - “The month we first met (MM)”
    - “Our favorite café table number (##)”
    - “Your birth day (DD)”
- Keep hints *gentle* and not too private.
- Feedback:
  - Wrong code: lock wiggle + tiny “boop” animation (no harsh error).
  - Right code: lock opens with sparkle burst + haptic (optional on supported devices).

**Recommended approach:** Make it easy. If she gets 2 wrong attempts, show a “Need a tiny hint?” button that reveals a final hint.

### Screen C — Reward Reveal (Pre-Question)
- A short animation: envelope opens / ribbon unties.
- Copy: “You unlocked it!”
- CTA: **Open the Letter**

### Screen D — The Ask (Photo + Question)
- Shows **your photo together** in a cute rounded frame with animated stickers (sparkles, hearts).
- Text: **“Will you be my Valentine?”**
- Two buttons:
  - **Yes 💘**
  - **Not this year 🤍** (or “Not now”)
- Both must be clickable and stable (no moving-away button).
- Optional microcopy: “No pressure, I just wanted to ask.”

### Screen E1 — “Yes” Celebration
- Celebration animation (choose 1–2, not all at once):
  - Confetti hearts burst
  - Floating balloons
  - Cute character pops (e.g., blob/cat sticker)
- Big text: “YAY!! 💖💖💖”
- Follow-up options:
  - **Pick our date vibe** (mini selection)
  - **Send a cute message** (generates a prefilled WhatsApp message)
  - **Replay**

### Screen E2 — “Not this year” Respectful End
- Soft animation: gentle sparkles (no sad vibes).
- Text: “Thanks for being honest 🤍”
- Optional: “Still want a cute date sometime?” with options:
  - **Coffee date** / **Dinner** / **Movie night** / **Hug now**
- **Exit** and **Replay**.

---

## 6) How to Make It Extra Cute When She Answers (Delight Spec)

### When she taps “Yes” (Delight)
1. **Immediate micro-animation:** Button “pops” (scale up 1.05 then back) + tiny sparkle trail.
2. **Photo reacts:** Add a quick “glow” pulse around the photo frame.
3. **Celebration burst:** Hearts/confetti burst from bottom center.
4. **Personal payoff:** Reveal a short “reward card” like:
   - “Voucher: 1 Valentine date 💌”
   - “Redeem for: seafood / coffee with a view / spa (choose one)"
5. **Interactive cute moment (best):** “Tap to catch 5 hearts” mini interaction (2–3 seconds). Each tap makes a heart giggle/pop. After 5 hearts: show final message.

**Copy examples:**
- “Okay it’s official. You’re stuck with me (in the cutest way). 💘”
- “I’m smiling like an idiot right now.”
- “Date mission unlocked!”


### High-Delight “YES” Animation Storyboard (Phone-Optimized)
Goal: Make the “Yes” tap feel *magical* without jank, while staying smooth at 60fps on mid-range phones.

**Sequence (recommended):**
1. **Button Pop (0–180ms)**  
   - Tap feedback: scale 1.0 → 1.06 → 1.0 with easing + tiny sparkle trail.
2. **Photo Glow Pulse (180–450ms)**  
   - Photo frame emits a soft neon/pastel glow ring that expands slightly then fades.
3. **Heart Confetti Burst (250–1200ms)**  
   - Hearts/confetti emit from bottom-center with upward drift + slight parallax.
4. **Envelope/Sticker Drop-in (600–1400ms)**  
   - A cute “voucher” card slides/bounces in: “Date Mission Unlocked 💌”
5. **Mini Interaction: “Collect 5 Hearts” (immediately after voucher appears)**  
   - Five floating hearts appear (big, tappable). Each tap pops with a tiny “boop” + micro particle sparkle.
   - After 5/5: big “YAY!!” text + optional “Pick our date vibe” screen.

**Controls:**
- “Skip animation” link (top-right) after 600ms.
- Sound toggle (default OFF) and respect `prefers-reduced-motion` (replace bursts with fade/glow).

**Performance rules:**
- Prefer CSS transforms (translate/scale/opacity) and requestAnimationFrame for particles.
- Cap particles to a safe number (e.g., 80–150) and throttle on low-power devices.
- Use WebP/AVIF for sticker sprites; keep each asset < 200KB.



### When she taps “Not this year” (Respectful-cute)
1. **Gentle response:** No dramatic effects. Soft sparkles or calm gradient shift.
2. **Kind copy:** “All good 🤍 I’m glad you told me.”
3. **Optional next step without pressure:** “If you’re open to it, pick a cozy hangout sometime.”
4. **Keep it warm:** A small “Send hug” animation: a tiny heart floats to the top.

---

## 7) Functional Requirements

### FR-1 Mobile-first UI
- Layout optimized for 360×800 and up.
- All interactions reachable with one thumb.
- Large tap targets: >= 44px height.

### FR-2 Puzzle mechanics
- 4-digit entry via on-screen keypad.
- Accepts only digits 0–9.
- Backspace and clear.
- Attempt counter + optional hint reveal after N attempts.

### FR-3 Unlock state
- On correct code:
  - Animate lock open
  - Persist “unlocked” in localStorage so refresh doesn’t reset (optional).

### FR-4 Photo display on the ask screen
- Photo in a rounded container.
- Lazy-load image; show skeleton shimmer while loading.

### FR-5 Answer capture (optional)
- If you want to know her response, provide one of:
  - A “Share result” button to send you a message
  - Or a lightweight backend endpoint (optional) to record response
- By default: no data collection necessary.

### FR-6 Cute animations
- Use GPU-friendly CSS transforms; avoid heavy JS loops.
- Respect “prefers-reduced-motion”.

### FR-7 Share / Replay
- “Replay” resets to start (with confirmation).
- Optional “Copy link” or “Share” using Web Share API.

---

## 8) Non-Functional Requirements

### Performance
- First load < 2 seconds on 4G (target).
- Total JS bundle small (prefer < 200–300KB gzipped if possible).
- Use compressed image (WebP/AVIF).

### Accessibility
- Color contrast readable.
- Support reduced motion.
- Buttons and text large enough for mobile.

### Privacy & Safety
- Do not auto-upload photo; host it in-app or as a static asset.
- No tracking by default.
- Do not guilt-trip on “Not now.”

---

## 9) Visual & Motion Direction (Cute, Colorful)
**Style keywords:** pastel gradients, candy colors, soft shadows, rounded corners, sticker-like icons, bubbly typography.

### Color System (example)
- Background gradient: pink → peach → lavender
- Accents: mint, sky blue, sunshine yellow
- Buttons: high-contrast, glossy highlight effect

### Components
- “Lock card” with bevel + shine
- Hint cards that flip (3D transform)
- Photo frame with animated sticker layers (sparkles + hearts)

### Animation Principles
- Micro animations: 120–250ms
- Celebration animations: 800–1500ms
- Avoid nausea: keep motion gentle, mostly scale/opacity, limited rotation

---

## 10) Content Requirements (Configurable)
- Her nickname (optional)
- Your names
- 3–4 hints text
- 4-digit code (or auto-generated from hints)
- Your photo (image file)
- Final “Yes” message and “Not now” message
- Optional “date vibe” options (3–5)

---

## 11) Technical Scope & Recommended Tech Stack

### Recommended Stack (Fast to build, great animations)
- **Framework:** Next.js (App Router) + **TypeScript**
- **Styling:** Tailwind CSS (cute design system via tokens)
- **Animations:** Framer Motion for UI transitions + (optional) Lottie (lightweight JSON) for special scenes  
  - Alternative (premium feel): **Rive** animations exported as `.riv` (great for cute characters)
- **Particles/Confetti:** lightweight canvas confetti or custom particle layer (GPU-friendly)
- **Image:** Next/Image with AVIF/WebP; pre-sized and lazy-loaded
- **Hosting:** Vercel (simple) or Netlify / GitHub Pages (if not using server features)
- **Optional Backend (only if you want logging):** Supabase (single table: response + timestamps)

### Implementation Notes (Mobile-first)
- Single-page flow with state machine (e.g., `WELCOME → PUZZLE → REVEAL → ASK → YES/NO`).
- Use localStorage to persist progress (optional).
- Ensure tap targets >= 44px; keep main CTA near bottom.
- Respect `prefers-reduced-motion` and provide a “Skip animations” control.

### Optional PWA
- Add manifest + icons to allow “Add to Home Screen” for an app-like feel.
- Offline not required; keep it simple.

---

## 12) Analytics (Optional)
- Only if you want:
  - opened_at, unlocked_at, answered_at, answer
- Do **not** use third-party trackers by default.

---

## 13) Edge Cases
- Photo fails to load: show fallback illustration + “Photo loading…”
- User stuck on puzzle: “Give me a hint” reveals the code or a stronger clue
- Refresh: optionally keep progress in localStorage
- Reduced motion: turn off confetti burst and replace with fade/glow

---

## 14) Definition of Done
- Mobile layout looks great on common Android/iPhone sizes.
- Puzzle can be solved quickly with clear hints.
- Unlock + ask + answer flows complete.
- Photo appears reliably.
- “Yes” celebration feels adorable and responsive.
- “Not this year” path is gentle and respectful.
- Works on Chrome and Safari mobile.

---

## 15) Nice-to-Have Enhancements
1. **PWA install**: “Add to Home Screen” for a cute “app” feel.
2. **Custom stickers**: include her favorite animal/character style (original artwork).
3. **Mini “date picker”**: choose 2–3 date ideas; it generates a message to send you.
4. **Sound effects toggle**: tiny “boop”, “sparkle” (off by default).
5. **Haptics**: vibrate lightly on unlock/yes (if supported).

---

## 16) Open Questions (for you)
- Do you want the code to be:
  1) fixed (you define it), or
  2) derived from hint answers (more “puzzle-like”)?
- Do you want the “Yes” screen to include a real next step (date plan / calendar link), or just a celebration?
- Do you want to record the response automatically, or let her tap “Send you a message”?
