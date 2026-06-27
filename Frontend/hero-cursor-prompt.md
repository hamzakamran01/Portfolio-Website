# HERO SECTION — CURSOR IMPLEMENTATION PROMPT
# Portfolio: Hamza Kamran | AI Engineer & Founder
# Design concept: "SIGNAL" — precision engineering meets live intelligence

---

## VISION BRIEF

Build a world-class, enterprise-developer-level hero section that feels like a live system, not a static portfolio page. The hero should immediately communicate: this person does not just use AI tools — he builds the infrastructure behind them. The visual language is: dark, precise, kinetic, editorial. One jaw-dropping element (WebGL particles) surrounded by disciplined, silent typography. Every animation has purpose. Nothing is decorative.

This should look like the intersection of Lusion.co, Linear.app, and Vercel's marketing site — but distinctly personal.

---

## TECH STACK — INSTALL THESE PACKAGES

```bash
npm install three @react-three/fiber @react-three/drei
npm install gsap
npm install @studio-freight/lenis
npm install simplex-noise
npm install clsx
```

Fonts — add to Next.js layout or global CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400&display=swap');
```

---

## DESIGN TOKENS — USE THESE EXACTLY

```css
:root {
  /* Backgrounds */
  --bg-base: #080808;
  --bg-surface: #0F0F0F;
  --bg-elevated: #161616;

  /* Text */
  --text-primary: #E8E6E0;
  --text-secondary: #888580;
  --text-muted: #3D3B38;

  /* Accents */
  --accent-cyan: #00D4FF;
  --accent-purple: #7C3AED;
  --accent-cyan-dim: rgba(0, 212, 255, 0.12);
  --accent-purple-dim: rgba(124, 58, 237, 0.08);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

---

## FILE STRUCTURE TO CREATE

```
components/
  hero/
    HeroSection.tsx          ← main container, orchestrates everything
    ParticleField.tsx        ← WebGL Three.js particle system (full-screen canvas)
    HeroContent.tsx          ← all text content and CTAs
    CustomCursor.tsx         ← magnetic custom cursor
    AvailableBadge.tsx       ← pulsing green availability badge
    StackTags.tsx            ← tech stack tags row
    ScrollIndicator.tsx      ← bottom scroll prompt

hooks/
  useCursorPosition.ts       ← global cursor tracker
  useGSAPReveal.ts           ← reusable GSAP animation hook
  useLenis.ts                ← smooth scroll init hook
```

---

## COMPONENT 1: ParticleField.tsx

This is the signature element of the entire page. A full-screen WebGL canvas sits behind all content. Do NOT use React Three Fiber for this — use raw Three.js mounted via useEffect for performance and control. The canvas must be `position: fixed`, `z-index: 0`, full viewport.

### Particle behavior specs:

**Setup:**
- 2500 particles total
- Each particle is a Point with size between 1.0 and 2.5 (randomized)
- Base color: mix of --accent-cyan (#00D4FF) and --accent-purple (#7C3AED), randomized per particle with 60% cyan, 40% purple
- Base opacity per particle: random between 0.15 and 0.55

**Organic drift (idle state):**
- Use simplex-noise to displace each particle position every frame
- Noise input: (particle.x * 0.002 + time * 0.0003, particle.y * 0.002 + time * 0.0002)
- Displacement magnitude: 0.8 units max
- This creates slow, breathing, organic movement — like a live neural field

**Constellation lines:**
- Every frame, check pairs of particles within 120px of each other (screen space)
- Draw a line between them using a LineSegments object
- Line opacity: inversely proportional to distance (closer = more opaque, max opacity 0.15)
- Line color: #00D4FF at 15% opacity
- Limit to 800 active lines maximum for performance

**Mouse interaction:**
- Track mouse position in world space
- Particles within 180px of cursor experience repulsion
- Repulsion force: (distance_to_mouse / 180) inverted, multiplied by 3.0
- Particles smoothly return to their noise-driven position when cursor leaves (lerp factor 0.05)
- This creates a "breathing field that parts for you" effect

**Camera:**
- Orthographic camera
- Position: (0, 0, 1)
- No controls, no rotation

**Performance:**
- Use BufferGeometry with Float32Array for all positions
- Update positions in-place every frame (do not create new arrays)
- Use requestAnimationFrame through Three.js renderer
- Dispose all geometries and materials on component unmount

```tsx
// Implementation structure:
useEffect(() => {
  // 1. Scene, camera, renderer setup
  // 2. Generate initial particle positions (random across viewport)
  // 3. Create particle geometry + ShaderMaterial with custom vertex/fragment shaders
  // 4. Create line geometry for constellations
  // 5. Animation loop: update noise displacement, mouse repulsion, constellation lines
  // 6. Handle resize: update camera and renderer
  // 7. Return cleanup function
}, [])
```

**Custom shader for particles (for size and opacity control):**
```glsl
// Vertex shader
uniform float uTime;
attribute float aSize;
attribute float aOpacity;
varying float vOpacity;

void main() {
  vOpacity = aOpacity;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}

// Fragment shader
varying float vOpacity;
uniform vec3 uColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = (1.0 - dist * 2.0) * vOpacity;
  gl_FragColor = vec4(uColor, alpha);
}
```

---

## COMPONENT 2: CustomCursor.tsx

Replace the default browser cursor entirely. The custom cursor has two layers that move independently.

**Layer 1 — Inner dot:**
- 8px circle
- Color: #E8E6E0 (white)
- Follows cursor with zero lag (direct position sync)
- On hover over interactive elements: scale to 0 (disappears)

**Layer 2 — Outer ring:**
- 36px circle
- Border: 1px solid rgba(0, 212, 255, 0.5)
- Background: rgba(0, 212, 255, 0.03)
- Follows cursor with lerp factor 0.12 (smooth lag creates sense of weight)
- On hover over buttons: scale to 1.8x, border color becomes --accent-cyan solid, background becomes rgba(0, 212, 255, 0.08)
- On hover over the main headline text: scale to 2.5x, mix-blend-mode: difference, background becomes white
- Transition all states with gsap.to duration 0.3

**Magnetic effect on buttons:**
- When cursor is within 80px of a button element, the button moves toward cursor by 25% of the distance
- Use GSAP to animate button's transform
- Button returns to origin when cursor leaves (spring ease)

**Implementation:**
```tsx
// Use useRef for cursor elements, useCursorPosition hook for mouse coords
// gsap.set() for zero-latency inner dot
// gsap.to() with ease for outer ring (creates the lag)
// Add data-cursor="text" or data-cursor="button" attributes to elements
// CustomCursor reads these to switch states
```

**Hide on mobile/touch devices.**

---

## COMPONENT 3: HeroContent.tsx

This is the typographic content layer. It sits above the particle canvas at z-index: 10.

### Layout — full viewport height, flex column, justified to stretch:

```
[top area]
  AVAILABLE FOR PROJECTS ●
  
[center area — main content]
  HAMZA
  KAMRAN
  ───────────────────────────── (thin line, 1px, --border-default, 60% width)
  AI Engineer · Founder · Builder
  
  I build production-ready AI systems for US and EU
  founders. From architecture to deployment in 30 days.
  
  [See My Work  ↗]    [View Case Studies]
  
[bottom area]
  Next.js   TypeScript   Node.js   OpenAI SDK   Postgres   React Native
  
                              ↓ scroll
```

### Typography specs:

**Main name "HAMZA KAMRAN":**
- Font: Syne, weight 800
- Size: clamp(72px, 10vw, 140px) — massive and responsive
- Letter spacing: -0.03em (tight, editorial)
- Color: --text-primary (#E8E6E0)
- Line height: 0.9
- Both lines left-aligned
- Text transform: uppercase

**Role line "AI Engineer · Founder · Builder":**
- Font: DM Sans, weight 300
- Size: clamp(14px, 1.5vw, 18px)
- Letter spacing: 0.2em
- Color: --text-secondary (#888580)
- Text transform: uppercase

**Description paragraph:**
- Font: DM Sans, weight 400
- Size: clamp(16px, 1.8vw, 20px)
- Line height: 1.6
- Color: --text-secondary
- Max width: 480px
- Margin-top: 24px

**Available badge:**
- Small pill: border 1px solid rgba(34, 197, 94, 0.3)
- Background: rgba(34, 197, 94, 0.06)
- Text: "AVAILABLE FOR PROJECTS" in Space Mono, 11px, #22C55E, letter-spacing: 0.15em
- Green pulsing dot (●) before text — use CSS keyframe animation:
  ```css
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  ```

**Divider line:**
- 1px horizontal rule
- Width: clamp(200px, 40%, 400px)
- Color: --border-default
- Margin: 20px 0
- Drawn via clip-path animation on load: clip-path goes from inset(0 100% 0 0) to inset(0 0% 0 0)

### CTA Buttons:

**Primary CTA — "See My Work":**
- No fill, border: 1px solid --border-default
- Padding: 14px 32px
- Font: DM Sans 500, 15px
- Color: --text-primary
- Border radius: 2px (very subtle — not rounded, editorial)
- Arrow icon (↗) after text, positioned absolutely
- Hover: border color transitions to --accent-cyan, text color to --accent-cyan, arrow moves 3px right and 3px up
- Background: transparent → rgba(0, 212, 255, 0.04) on hover
- Transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)

**Secondary CTA — "View Case Studies":**
- Completely transparent, no border
- Font: DM Sans 400, 15px
- Color: --text-secondary
- Underline: 1px solid --text-muted, offset 4px
- Hover: color transitions to --text-primary, underline color to --text-primary
- Transition: 0.2s ease

---

## COMPONENT 4: StackTags.tsx

Row of tech stack tags at the very bottom of the hero, above the scroll indicator.

**Each tag:**
- Font: Space Mono, 11px
- Color: --text-muted (#3D3B38)
- Letter spacing: 0.1em
- Separated by thin vertical dividers: "│"
- On hover: color transitions to --text-secondary
- No border, no background — pure text, minimal

**Tech items in order:**
Next.js · TypeScript · Node.js · OpenAI SDK · PostgreSQL · React Native · Three.js

---

## COMPONENT 5: ScrollIndicator.tsx

**Design:**
- Position: absolute, bottom 32px, left 50%, transform translateX(-50%)
- Text: "SCROLL" in Space Mono 10px, --text-muted, letter-spacing: 0.3em
- Below text: a thin vertical line 40px tall
- Inside the line: a small dot that animates from top to bottom on a 2s loop
  ```css
  @keyframes scroll-dot {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(36px); opacity: 0; }
  }
  ```

---

## ANIMATION ORCHESTRATION — useLenis.ts + GSAP Timeline

This is critical. The animations must feel like a film sequence, not scattered CSS transitions.

### Load sequence (GSAP timeline):

```
t=0ms     ParticleField canvas fades in: opacity 0 → 1, duration 1200ms, ease: power2.out
t=300ms   AvailableBadge: y: 20 → 0, opacity 0 → 1, duration 600ms, ease: power3.out
t=500ms   "HAMZA" — split into individual characters
          Each character: y: 80 → 0, opacity 0 → 1
          Stagger: 0.04s per character
          Duration per character: 700ms
          Ease: power4.out (very sharp, snappy drop)
t=700ms   "KAMRAN" — same as above
t=900ms   Divider line draws: clip-path from right to left, duration 600ms, ease: power2.inOut
t=1000ms  Role text: y: 20 → 0, opacity 0 → 1, duration 500ms
t=1100ms  Description: y: 20 → 0, opacity 0 → 1, duration 500ms
t=1300ms  CTAs: y: 20 → 0, opacity 0 → 1, stagger 0.1s
t=1500ms  StackTags: each tag fades in with stagger 0.05s
t=1700ms  ScrollIndicator: opacity 0 → 1, duration 400ms
```

**Character splitting (no SplitText library needed):**
```tsx
// Split text into spans manually in the component
const splitText = (text: string) => text.split('').map((char, i) => (
  <span key={i} className="char" style={{ display: 'inline-block' }}>
    {char === ' ' ? '\u00A0' : char}
  </span>
))
// Then gsap.from('.char', { y: 80, opacity: 0, stagger: 0.04, duration: 0.7, ease: 'power4.out' })
```

### Scroll behavior (Lenis + GSAP ScrollTrigger):

```
ScrollTrigger: hero → next section
- As user scrolls from 0 to 100vh:
  - Main name text: scale 1 → 0.85, opacity 1 → 0 (start at 20% scroll, end at 60%)
  - Particle field: opacity remains full until 70% scroll, then fades
  - Hero content y: 0 → -60px (slow parallax upward movement)
  - This creates a cinematic dissolve into the next section
```

---

## LAYOUT ARCHITECTURE — HeroSection.tsx

```tsx
<section className="hero">
  {/* Layer 0: WebGL background */}
  <ParticleField />

  {/* Layer 1: Subtle gradient vignette overlay */}
  {/* radial-gradient: rgba(8,8,8,0) center → rgba(8,8,8,0.7) edges */}
  <div className="vignette" />

  {/* Layer 2: Subtle grid overlay (optional but adds depth) */}
  {/* CSS background-image: repeating-linear-gradient lines, 60px grid, 1px, rgba(255,255,255,0.02) */}
  <div className="grid-overlay" />

  {/* Layer 3: Content */}
  <CustomCursor />
  <HeroContent />
  <ScrollIndicator />
</section>
```

**Section CSS:**
```css
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-base);
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(8, 8, 8, 0.75) 100%);
  z-index: 1;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 2;
  pointer-events: none;
}
```

**Content positioning:**
```css
.hero-content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(40px, 6vw, 100px);
  padding-top: 120px; /* clear the navbar */
}
```

---

## NAVBAR — minimal, sits above hero

**Design:**
- Position: fixed, top 0, full width, z-index: 100
- Background: transparent (glass effect only on scroll: backdrop-filter: blur(20px), background: rgba(8,8,8,0.6))
- Left: "HK" monogram in Syne 700, 18px, --text-primary
- Right: three text links: "Work" "About" "Contact"
- Links: DM Sans 400, 14px, --text-secondary, hover to --text-primary transition 0.2s
- Plus a small arrow "↗" CTA button at far right: "Get In Touch" with border style matching primary CTA

---

## MOBILE RESPONSIVE

At breakpoint < 768px:
- ParticleField: reduce to 1200 particles, disable constellation lines for performance
- Name size: clamp(48px, 12vw, 72px)
- Remove CustomCursor entirely
- Reduce animation complexity: disable character-by-character splits, use simple fade-up for text blocks
- Layout: padding 24px
- Stack tags: wrap onto 2 lines, font-size 10px

---

## PERFORMANCE NON-NEGOTIABLES

1. ParticleField canvas MUST be position:fixed and rendered with willChange:'transform' — never reflow-triggers
2. All GSAP animations use transform and opacity ONLY — no layout-triggering properties
3. Lenis smooth scroll must be initialized before any ScrollTrigger instances
4. Add `@media (prefers-reduced-motion: reduce)` block that disables ALL animations, shows elements in final state immediately
5. Three.js renderer pixel ratio: Math.min(window.devicePixelRatio, 2) — never higher
6. On component unmount: dispose Three.js scene, kill all GSAP animations (gsap.killTweensOf)

---

## WHAT SUCCESS LOOKS LIKE

When this is built correctly:
- First 2 seconds feel like booting up a live intelligent system
- The particle field makes you want to move your mouse around immediately
- The name typography is so large and precise it commands the entire viewport
- The whole thing screams enterprise-level technical taste, not student portfolio
- Someone who visits spends 30+ seconds on the hero alone before scrolling
- The dark + cyan color story is instantly recognizable and consistently applied

Build this component by component, starting with ParticleField.tsx first to validate the WebGL layer, then HeroContent.tsx, then adding animations last. Test particle performance at 2500 count before proceeding.
