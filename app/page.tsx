"use client";

import { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   CONFIGURATION
   ─ Update ARTIST and ARTWORKS before deploying
   ─ Images go in /public/artworks/ and /public/images/
══════════════════════════════════════════════════════════════ */

const ARTIST = {
  name: "Ayinla Oke",
  tagline: "Master of Hyper-Realistic Charcoal & Graphite",
  bio: " Operating between Lagos and Ibadan, Nigeria, Ayinla Oke creates more than just portraits; he captures the soul of his subjects through a meticulous, high-contrast style that mirrors the masters of Chiaroscuro. Specializing in large-scale, heirloom-quality commissions, Oke’s work is defined by its anatomical precision and an almost cinematic play between light and shadow. \nEach piece represents hundreds of hours of disciplined craftsmanship, designed to serve as a timeless legacy for families and collectors who value the intersection of fine art and human emotion.",
  // Recommended size: 400×400px square (will be auto-cropped to circle)
  profileSrc: "/images/artiste-profile.png",
  contacts: {
    phone: "+234 813 441 8593",
    whatsapp: "+234 813 441 8593",
    email: "Collinsoluwafemi6@gmail.com",
    x: "Ayinlaoke_",
    instagram: "ayinla_oke",
    snapchat: "collinsoluwafem",
  },
};

// Recommended artwork size: 800×1000px (portrait, 4:5 ratio)
// Place files in: /public/artworks/
const ARTWORKS = [
  {
    id: 0,
    src: "/artworks/artwork-2.png",
    title: "Iron Mike; The Gaze",
    description:
      "A visceral study of intensity and focus. This piece highlights the technical challenge of rendering skin texture and moisture under extreme lighting, capturing the raw psychological weight of a combat sports legend.",
    year: "2023",
  },
  {
    id: 1,
    src: "/artworks/artwork-4.png",
    title: "The Surreal portrait; Sensory Overload",
    description:
      "An exploration of human expression and reflection. The contrast between the high-gloss eyewear and the matte skin texture creates a surreal depth, pushing the boundaries of traditional portraiture into a modern, cinematic space.",
    year: "2024",
  },
  {
    id: 2,
    src: "/artworks/artwork-7.png",
    title: "The Messi Portrait; THE GOAT",
    description:
      "A definitive study of greatness. This portrait captures the quiet determination of Lionel Messi, utilizing fine-line precision in the beard and subtle skin-texture rendering to create an intimate, life-like tribute.",
    year: "2025",
  },
  {
    id: 3,
    src: "/artworks/artwork-3.png",
    title: "The Melanin Study; Radiance",
    description:
      "A striking exploration of light on melanin-rich skin. This piece pushes the technical limits of charcoal, capturing a sculptural elegance through intricate pore detailing and the delicate rendering of moisture.",
    year: "2022",
  },
  {
    id: 4,
    src: "/artworks/artwork-1.png",
    title: "The Dual Portrait; Equilibrium",
    description:
      "A rhythmic exploration of symmetry and connection. This piece balances soft, blended tones with sharp anatomical precision, capturing a moment of stillness and shared intimacy.",
    year: "2022",
  },
  {
    id: 5,
    src: "/artworks/artwork-6.png",
    title: "The Modern Portrait; Perspective",
    description:
      "A contemporary study of light and character. This piece focuses on the subtle interplay of shadow across the face, utilizing soft blending and sharp highlights to capture a moment of quiet, modern reflection.",
    year: "2024",
  },
  {
    id: 6,
    src: "/artworks/artwork-5.png",
    title: "The Portrait Study; Identity",
    description:
      "A detailed study in grooming and texture. This piece showcases technical mastery in hair rendering, contrasting the sharp lines of a fresh fade with the intricate, layered depth of a full beard.",
    year: "2024",
  },
  {
    id: 7,
    src: "/artworks/artwork-11.png",
    title: "The Macro Study; Perception",
    description:
      "A masterclass in macro-realism.\n This piece focuses on the extreme intricacies of the human eye, capturing the interplay of moisture, skin-pore architecture, and the crystalline reflections within the iris.",
    year: "2025",
  },
  {
    id: 8,
    src: "/artworks/artwork-8.png",
    title: "The Editorial Portrait; Luminance",
    description:
      "Hyper-Realistic Charcoal & Graphite\n A study in high-contrast textures. This piece captures the interplay of light on silver jewelry and the delicate structure of hair, showcasing a refined mastery of value and depth.",
    year: "2025",
  },
  {
    id: 9,
    src: "/artworks/artwork-10.png",
    title: "The Mythological Masterpiece; Ascension of the Phoenix",
    description:
      "Mixed Media Charcoal & Pastel\n A fusion of classical mythology and hyper-realism. This piece utilizes dramatic chiaroscuro and subtle gold tones to explore themes of rebirth and transcendence, grounded in an anatomical study of power and grace.",
    year: "2025",
  },
  {
    id: 10,
    src: "/artworks/artwork-14.png",
    title: "The Commissioned Portrait; The Patriarch",
    description:
      "Large-Scale Charcoal & Graphite (30 x 40 inches).\n A significant commission exploring authority and wisdom. This large-scale work showcases a meticulous focus on skin-texture architecture and the crisp geometry of professional attire, designed to serve as a commanding presence in a private collection.",
    year: "2025",
  },
  {
    id: 11,
    src: "/artworks/artwork-13.png",
    title: "The Commissioned Portrait; The Patriarch",
    description:
      "Large-Scale Charcoal & Graphite (30 x 40 inches).\n A significant commission exploring authority and wisdom. This large-scale work showcases a meticulous focus on skin-texture architecture and the crisp geometry of professional attire, designed to serve as a commanding presence in a private collection.",
    year: "2025",
  },
  {
    id: 12,
    src: "/artworks/artwork-12.png",
    title: "The Sight Study; Soul Window",
    description:
      "Graphite on Paper.\n An intimate study of expression and focus. This piece highlights the delicate balance of light within the eyes, utilizing fine-line precision to capture the depth and vulnerability of a singular gaze.",
    year: "2026",
  },
  {
    id: 13,
    src: "/artworks/artwork-9.png",
    title: "The Conceptual Study; Echoes of Silence",
    description:
      "Conceptual Charcoal & Graphite\n A visceral exploration of sensory suppression and the weight of influence. This piece highlights advanced textural contrasts between weathered hands and the vulnerable expression of the subject, creating a haunting, narrative-driven experience.",
    year: "2025",
  },
];

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

type Phase = "intro" | "opening" | "gallery";
type IntroStep = "text" | "fading" | "button";

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */

export default function GalleryPage() {
  const [isDark, setIsDark] = useState(true);
  const [phase, setPhase] = useState<Phase>("intro");
  const [introStep, setIntroStep] = useState<IntroStep>("text");
  const [activeIndex, setActiveIndex] = useState(0);
  const [descOpen, setDescOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [swipeStartY, setSwipeStartY] = useState(0);

  // Apply theme to <html> and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  // Init theme from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") setIsDark(false);
      else if (saved === "dark") setIsDark(true);
    } catch {}
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 680);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Intro sequence: text → fading → button
  useEffect(() => {
    if (phase !== "intro") return;
    const t1 = setTimeout(() => setIntroStep("fading"), 3400);
    const t2 = setTimeout(() => setIntroStep("button"), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  const enterGallery = () => {
    setPhase("opening");
    setTimeout(() => setPhase("gallery"), 1700);
  };

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    if (phase !== "gallery") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [phase]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxClosing(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightboxIndex(null);
      setLightboxClosing(false);
    }, 320);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox]);

  const goNext = useCallback(() => {
    if (activeIndex < ARTWORKS.length - 1) setActiveIndex((i) => i + 1);
  }, [activeIndex]);

  const goBack = useCallback(() => {
    if (activeIndex > 0) setActiveIndex((i) => i - 1);
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
    openLightbox(index);
  };

  // CoverFlow transform values
  // Tap left or right card to navigate; tap center to toggle description
  const getCardTransform = (offset: number) => {
    const m = isMobile ? 0.56 : 1; // scale offsets down on mobile
    const configs: Record<string, { x: number; z: number; ry: number; scale: number; opacity: number; blur: number; zi: number }> = {
      "-2": { x: -460 * m, z: 0,      ry:  54, scale: 0.54, opacity: 0.22, blur: 4,   zi: 4  },
      "-1": { x: -264 * m, z: 40,     ry:  38, scale: 0.80, opacity: 0.68, blur: 0,   zi: 7  },
       "0": { x: 0,         z: 170,    ry:  0,  scale: 1.12, opacity: 1,    blur: 0,   zi: 10 },
       "1": { x:  264 * m, z: 40,     ry: -38, scale: 0.80, opacity: 0.68, blur: 0,   zi: 7  },
       "2": { x:  460 * m, z: 0,      ry: -54, scale: 0.54, opacity: 0.22, blur: 4,   zi: 4  },
    };
    return configs[String(offset)] ?? null;
  };

  return (
    <>
      {/* ══ COMPONENT STYLES ══════════════════════════════════ */}
      <style>{`

        /* ── THEME TOGGLE ─────────────────────────────────── */
        .theme-toggle {
          position: fixed;
          top: 22px;
          right: 24px;
          z-index: 9999;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          background: var(--surface);
          color: var(--accent);
          font-size: 17px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
          box-shadow: 0 2px 14px var(--shadow-deep);
          line-height: 1;
        }
        .theme-toggle:hover {
          background: var(--accent);
          color: var(--bg);
          transform: rotate(20deg) scale(1.08);
          box-shadow: 0 4px 22px var(--accent-glow);
        }

        /* ── INTRO SCREEN ─────────────────────────────────── */
        .intro-screen {
          position: fixed;
          inset: 0;
          z-index: 500;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #07070a;
        }

        /* Subtle warm glow in center — like a stage spotlight */
        .intro-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 45%, #1e140a 0%, #07070a 70%);
          z-index: 0;
          pointer-events: none;
        }

        /* ── CURTAINS ─────────────────────────────────────── */
        .curtain {
          position: absolute;
          top: 0;
          height: 100%;
          width: 52%;
          z-index: 2;
          transition: none;
        }

        .curtain-left {
          left: 0;
          background: repeating-linear-gradient(
            to right,
            var(--curtain-dark)   0px,
            var(--curtain-mid)    7px,
            var(--curtain-light)  14px,
            var(--curtain-bright) 20px,
            var(--curtain-light)  26px,
            var(--curtain-mid)    33px,
            var(--curtain-dark)   40px
          );
          box-shadow:
            inset -12px 0 28px rgba(0,0,0,0.7),
            6px 0 40px rgba(0,0,0,0.9);
        }

        .curtain-right {
          right: 0;
          background: repeating-linear-gradient(
            to left,
            var(--curtain-dark)   0px,
            var(--curtain-mid)    7px,
            var(--curtain-light)  14px,
            var(--curtain-bright) 20px,
            var(--curtain-light)  26px,
            var(--curtain-mid)    33px,
            var(--curtain-dark)   40px
          );
          box-shadow:
            inset 12px 0 28px rgba(0,0,0,0.7),
            -6px 0 40px rgba(0,0,0,0.9);
        }

        /* Gold fringe at bottom of each curtain */
        .curtain-left::after,
        .curtain-right::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 5px,
            #c9a84c 5px,
            #c9a84c 7px,
            transparent 7px,
            transparent 12px
          );
          opacity: 0.75;
        }

        /* Gold tie-back medallion */
        .curtain-left::before {
          content: '✦';
          position: absolute;
          right: 6px;
          top: 42%;
          font-size: 22px;
          color: #c9a84c;
          text-shadow: 0 0 14px rgba(201, 168, 76, 0.9);
          z-index: 3;
        }
        .curtain-right::before {
          content: '✦';
          position: absolute;
          left: 6px;
          top: 42%;
          font-size: 22px;
          color: #c9a84c;
          text-shadow: 0 0 14px rgba(201, 168, 76, 0.9);
          z-index: 3;
        }

        /* Gold pelmet bar at the very top */
        .curtain-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          z-index: 10;
          background: linear-gradient(90deg,
            #4a3208, #8a6418, #c9a84c, #f0d878, #e4c460, #c9a84c, #8a6418, #4a3208
          );
          box-shadow: 0 3px 18px rgba(201, 168, 76, 0.6);
        }

        /* Curtain opening animations */
        .curtain-left.opening {
          animation: curtainSlideLeft 1.5s cubic-bezier(0.68, 0.02, 0.95, 0.50) forwards;
        }
        .curtain-right.opening {
          animation: curtainSlideRight 1.5s cubic-bezier(0.68, 0.02, 0.95, 0.50) forwards;
        }

        /* ── INTRO CONTENT ───────────────────────────────── */
        .intro-content {
          position: relative;
          z-index: 20;
          text-align: center;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          pointer-events: none;
        }

        .welcome-text {
          animation: fadeInUp 1s ease forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .welcome-text.fading {
          animation: fadeOutUp 0.75s ease forwards;
        }

        .welcome-sub {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(11px, 1.6vw, 14px);
          font-weight: 300;
          font-style: normal;
          color: rgba(0, 245, 212, 0.55);
          letter-spacing: 0.45em;
          text-transform: uppercase;
        }

        .welcome-name {
          font-family: var(--font-playfair), var(--font-cinzel), serif;
          font-size: clamp(28px, 6.5vw, 68px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #006b5c 0%, #00c5a8 25%, #00F5D4 45%, #80ffed 55%, #00F5D4 70%, #00c5a8 85%, #006b5c 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 3.5s linear infinite;
          margin-top: 4px;
        }

        .welcome-gallery {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(11px, 1.8vw, 16px);
          font-weight: 300;
          color: rgba(232, 234, 246, 0.7);
          letter-spacing: 0.6em;
          text-transform: uppercase;
          margin-top: 6px;
        }

        /* Enter button */
        .enter-btn {
          pointer-events: all;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #07070a;
          background: linear-gradient(135deg, #00c5a8, #00F5D4, #80ffed, #00F5D4, #00c5a8);
          background-size: 200% auto;
          border: none;
          padding: 16px 52px;
          cursor: pointer;
          border-radius: 3px;
          box-shadow: 0 4px 28px rgba(0, 245, 212, 0.35), 0 0 60px rgba(0, 245, 212, 0.1);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          position: relative;
          overflow: hidden;
          animation: goldShimmer 2.8s linear infinite, fadeInUp 0.65s ease forwards;
        }
        .enter-btn:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 36px rgba(0, 245, 212, 0.55), 0 0 90px rgba(0, 245, 212, 0.18);
        }
        .enter-btn:active {
          transform: scale(0.98);
        }

        /* ── GALLERY PAGE ─────────────────────────────────── */
        .gallery-page {
          animation: galleryEntrance 0.85s ease forwards;
        }

        /* ── GALLERY STAGE ───────────────────────────────── */
        .gallery-stage {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 90px 20px 48px;
          position: relative;
          overflow: hidden;
        }

        /* Deep space background */
        .gallery-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 35%, #141b35 0%, var(--bg) 72%);
          z-index: 0;
          pointer-events: none;
        }

        /* Perspective floor grid */
        .gallery-stage::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) perspective(350px) rotateX(65deg);
          transform-origin: bottom center;
          width: 200%;
          height: 45%;
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 59px,
            rgba(0, 245, 212, 0.04) 59px,
            rgba(0, 245, 212, 0.04) 60px
          ),
          repeating-linear-gradient(
            180deg,
            transparent 0,
            transparent 59px,
            rgba(0, 245, 212, 0.03) 59px,
            rgba(0, 245, 212, 0.03) 60px
          );
          pointer-events: none;
          z-index: 0;
        }

        [data-theme="light"] .gallery-stage::before {
          background: radial-gradient(ellipse 80% 60% at 50% 35%, #dde0f8 0%, var(--bg) 72%);
        }
        [data-theme="light"] .gallery-stage::after {
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 59px,
            rgba(79, 70, 229, 0.06) 59px,
            rgba(79, 70, 229, 0.06) 60px
          ),
          repeating-linear-gradient(
            180deg,
            transparent 0,
            transparent 59px,
            rgba(79, 70, 229, 0.04) 59px,
            rgba(79, 70, 229, 0.04) 60px
          );
        }

        .gallery-eyebrow {
          position: relative;
          z-index: 1;
          font-family: var(--font-montserrat), var(--font-cinzel), serif;
          font-size: 10px;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 52px;
          opacity: 0.65;
        }

        /* ── COVERFLOW ───────────────────────────────────── */
        .coverflow-outer {
          position: relative;
          z-index: 2;
          width: 100%;
          perspective: 1400px;
          perspective-origin: 50% 50%;
        }

        .coverflow-track {
          position: relative;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .card-wrapper {
          position: absolute;
          transition:
            transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .art-card {
          width: 248px;
          border-radius: 6px;
          overflow: visible;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px var(--shadow-card);
          border: 1px solid var(--glass-border);
          position: relative;
          transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .art-image-wrapper {
          width: 248px;
          height: 330px;
          overflow: hidden;
          position: relative;
          background: var(--surface);
          border-radius: 5px 5px 0 0;
        }

        /* Glassmorphism gradient overlay at bottom of each gallery card */
        .art-image-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 45%;
          background: linear-gradient(
            to top,
            rgba(10, 15, 30, 0.85) 0%,
            rgba(10, 15, 30, 0.4) 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        [data-theme="light"] .art-image-wrapper::after {
          background: linear-gradient(
            to top,
            rgba(248, 249, 255, 0.75) 0%,
            rgba(248, 249, 255, 0.3) 50%,
            transparent 100%
          );
        }

        .art-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .art-card:hover {
          box-shadow: 0 16px 56px var(--shadow-card), 0 0 0 1px var(--border-bright);
          transform: translateY(-3px) scale(1.03);
        }

        .art-card:hover .art-image {
          transform: scale(1.05);
        }

        /* Placeholder shown when image path is not yet set */
        .art-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: linear-gradient(160deg, var(--surface) 0%, var(--card) 100%);
          padding-bottom: 16px;
        }

        .art-placeholder-label {
          font-family: var(--font-cinzel), serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-align: center;
          padding: 0 12px;
        }

        /* Description overlay — center card only */
        .desc-overlay {
          position: absolute;
          inset: 0;
          background: rgba(7, 7, 10, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 18px 16px 14px;
          animation: fadeIn 0.3s ease forwards;
          border-radius: 5px 5px 0 0;
          overflow-y: auto;
        }

        [data-theme="light"] .desc-overlay {
          background: rgba(248, 249, 255, 0.88);
        }

        .desc-title {
          font-family: var(--font-playfair), var(--font-cinzel), serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          text-transform: none;
          margin-bottom: 2px;
          line-height: 1.3;
        }

        .desc-year {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .desc-text {
          font-family: var(--font-montserrat), var(--font-cormorant), sans-serif;
          font-size: 11px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--text-primary);
          opacity: 0.9;
          flex: 1;
          overflow-y: auto;
          white-space: pre-line;
        }

        /* Card bottom label */
        .card-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          gap: 8px;
        }

        .card-title-text {
          font-family: var(--font-playfair), var(--font-montserrat), sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }

        .card-tap-hint {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--accent);
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid var(--border-bright);
          padding: 4px 8px;
          border-radius: 3px;
        }

        /* Card glow when center */
        .card-wrapper-center .art-card {
          box-shadow:
            0 0 0 1px var(--border-bright),
            0 8px 32px var(--shadow-card);
        }

        /* ── NAVIGATION ──────────────────────────────────── */
        .nav-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 44px;
        }

        .nav-btn {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border-bright);
          padding: 11px 22px;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.15s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-btn:hover:not(:disabled) {
          background: var(--accent-dim);
          border-color: var(--accent);
          box-shadow: 0 0 18px var(--accent-glow);
          transform: translateY(-1px);
        }
        .nav-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .nav-btn:disabled {
          opacity: 0.18;
          cursor: default;
        }

        .dot-row {
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .dot:hover {
          background: var(--text-secondary);
        }
        .dot.dot-active {
          background: var(--accent);
          transform: scale(1.6);
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .nav-counter {
          position: relative;
          z-index: 2;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          margin-top: 18px;
        }

        /* ── BIO SECTION ─────────────────────────────────── */
        .bio-section {
          padding: 64px 24px 88px;
          max-width: 800px;
          margin: 0 auto;
        }

        .section-divider {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 56px;
        }

        .div-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-bright), transparent);
        }

        .div-label {
          font-family: var(--font-montserrat), var(--font-cinzel), sans-serif;
          font-size: 9px;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.75;
          white-space: nowrap;
        }

        /* Profile row */
        .bio-profile-row {
          display: flex;
          align-items: center;
          gap: 26px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        /* Profile picture — 400×400px recommended, auto-crops to circle */
        .profile-ring {
          width: 120px;
          height: 120px;
          min-width: 120px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          box-shadow:
            0 0 0 5px var(--accent-dim),
            0 10px 30px var(--shadow-deep);
          position: relative;
          background: var(--surface);
          overflow: hidden;
          flex-shrink: 0;
        }

        .profile-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          z-index: 1;
        }

        .profile-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-cinzel), serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.1em;
          z-index: 0;
        }

        .bio-name-block {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .bio-name {
          font-family: var(--font-playfair), var(--font-cinzel), serif;
          font-size: clamp(20px, 4vw, 30px);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .bio-tagline {
          font-family: var(--font-montserrat), var(--font-cormorant), sans-serif;
          font-size: 14px;
          font-weight: 300;
          font-style: normal;
          color: var(--accent);
          letter-spacing: 0.12em;
        }

        .bio-text {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(20px, 2.4vw, 26px);
          line-height: 1.9;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 40px;
          border-left: 2px solid var(--accent-dim);
          padding-left: 20px;
        }

        /* ── CONTACT GRID ────────────────────────────────── */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 10px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-item:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px var(--shadow-card);
        }

        .contact-icon {
          font-size: 20px;
          min-width: 28px;
          text-align: center;
          flex-shrink: 0;
          color: var(--accent);
          line-height: 1;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          overflow: hidden;
        }

        .contact-label {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 8px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .contact-value {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── FOOTER ──────────────────────────────────────── */
        .site-footer {
          text-align: center;
          padding: 24px 20px;
          border-top: 1px solid var(--border);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.14em;
        }

        /* ── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 680px) {
          .coverflow-track { height: 360px; }
          .art-card { width: 200px; border-radius: 5px; }
          .art-image-wrapper { width: 200px; height: 266px; }
          .nav-row { gap: 12px; }
          .nav-btn { padding: 9px 14px; font-size: 9px; }
          .bio-profile-row { gap: 18px; }
          .profile-ring { width: 96px; height: 96px; min-width: 96px; }
        }

        @media (min-width: 1024px) {
          .coverflow-track { height: 480px; }
          .bio-section { padding: 80px clamp(24px, 8vw, 120px) 100px; }
        }

        /* ── LIGHTBOX ────────────────────────────────────── */
        @keyframes lbFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes lbSlideLeft  {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes lbSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: stretch;
        }
        .lightbox-overlay.lightbox-open {
          animation: lbFadeIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .lightbox-overlay.lightbox-closing {
          animation: lbFadeOut 0.3s ease-in forwards;
          pointer-events: none;
        }

        .lightbox-inner {
          display: flex;
          flex-direction: row;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          align-items: stretch;
          overflow: hidden;
        }

        .lightbox-img-panel {
          flex: 0 0 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          animation: lbSlideLeft 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .lightbox-closing .lightbox-img-panel {
          animation: none;
          transition: transform 0.3s ease-in, opacity 0.3s ease-in;
          transform: translateX(-40px);
          opacity: 0;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 88vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.75);
          filter: none !important;
          display: block;
        }

        .lightbox-desc-panel {
          flex: 0 0 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 40px;
          overflow-y: auto;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid var(--glass-border);
          animation: lbSlideRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .lightbox-closing .lightbox-desc-panel {
          animation: none;
          transition: transform 0.3s ease-in, opacity 0.3s ease-in;
          transform: translateX(40px);
          opacity: 0;
        }

        .lightbox-eyebrow {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }

        .lightbox-title {
          font-family: var(--font-playfair), var(--font-cinzel), serif;
          font-size: clamp(18px, 2.8vw, 30px);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .lightbox-divider {
          width: 48px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          margin-bottom: 22px;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .lightbox-description {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(15px, 1.6vw, 19px);
          line-height: 1.9;
          color: var(--text-secondary);
          white-space: pre-line;
          flex: 1;
        }

        .lightbox-close {
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 10001;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--text-primary);
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease;
        }
        .lightbox-close:hover {
          transform: rotate(90deg) scale(1.1);
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        @media (max-width: 767px) {
          .lightbox-inner {
            flex-direction: column;
            overflow-y: auto;
          }
          .lightbox-img-panel {
            flex: 0 0 auto;
            height: 50vh;
            padding: 16px 16px 8px;
          }
          .lightbox-img {
            max-height: calc(50vh - 24px);
            max-width: 100%;
          }
          .lightbox-desc-panel {
            flex: 1 0 auto;
            border-left: none;
            border-top: 1px solid var(--glass-border);
            padding: 24px 20px 48px;
            justify-content: flex-start;
            animation: lbSlideRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .lightbox-title {
            font-size: clamp(17px, 5vw, 24px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lightbox-overlay,
          .lightbox-img-panel,
          .lightbox-desc-panel {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

      `}</style>

      {/* ══ THEME TOGGLE ════════════════════════════════════ */}
      <button
        className="theme-toggle"
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle dark/light mode"
        title="Toggle theme"
      >
        <i className={`lni ${isDark ? "lni-sun" : "lni-night"}`} aria-hidden="true" />
      </button>

      {/* ══ INTRO / CURTAIN SCREEN ══════════════════════════ */}
      {(phase === "intro" || phase === "opening") && (
        <div className="intro-screen">
          {/* Gold pelmet at top */}
          <div className="curtain-top-bar" />

          {/* Left curtain panel */}
          <div className={`curtain curtain-left ${phase === "opening" ? "opening" : ""}`} />

          {/* Right curtain panel */}
          <div className={`curtain curtain-right ${phase === "opening" ? "opening" : ""}`} />

          {/* Centered welcome content */}
          <div className="intro-content">
            {introStep === "text" && (
              <div className="welcome-text">
                <p className="welcome-sub">Welcome to</p>
                <h1 className="welcome-name">Collins OluwaFemi</h1>
                <p className="welcome-gallery">Art &nbsp; Gallery</p>
              </div>
            )}

            {introStep === "fading" && (
              <div className="welcome-text fading">
                <p className="welcome-sub">Welcome to</p>
                <h1 className="welcome-name">Collins OluwaFemi</h1>
                <p className="welcome-gallery">Art &nbsp; Gallery</p>
              </div>
            )}

            {introStep === "button" && phase === "intro" && (
              <button className="enter-btn" onClick={enterGallery}>
                Enter Gallery
              </button>
            )}
          </div>
        </div>
      )}

      {/* ══ GALLERY PAGE ════════════════════════════════════ */}
      {phase === "gallery" && (
        <div className="gallery-page">

          {/* ── Gallery Stage ── */}
          <section className="gallery-stage">
            <p className="gallery-eyebrow">— Art Gallery —</p>

            {/* CoverFlow Carousel */}
            <div className="coverflow-outer">
              <div className="coverflow-track">
                {ARTWORKS.map((art, i) => {
                  const offset = i - activeIndex;
                  if (Math.abs(offset) > 2) return null;

                  const t = getCardTransform(offset);
                  if (!t) return null;

                  const isCenter = offset === 0;

                  return (
                    <div
                      key={art.id}
                      className={`card-wrapper ${isCenter ? "card-wrapper-center" : ""}`}
                      style={{
                        transform: `translateX(${t.x}px) translateZ(${t.z}px) rotateY(${t.ry}deg) scale(${t.scale})`,
                        opacity: t.opacity,
                        zIndex: t.zi,
                        filter: t.blur > 0 ? `blur(${t.blur}px)` : "none",
                        cursor: "zoom-in",
                      }}
                      onClick={() => handleCardClick(i)}
                    >
                      <div className="art-card">
                        {/* ── Artwork image ── */}
                        <ArtworkImage src={art.src} title={art.title} />

                        {/* ── Description overlay (center only, tap to toggle) ── */}
                        {isCenter && descOpen && (
                          <div className="desc-overlay">
                            <p className="desc-title">{art.title}</p>
                            <p className="desc-year">{art.year}</p>
                            <p className="desc-text">{art.description}</p>
                          </div>
                        )}

                        {/* ── Card bottom label (center only) ── */}
                        {isCenter && (
                          <div className="card-label-row">
                            <span className="card-title-text">{art.title}</span>
                            <span className="card-tap-hint">View</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Navigation controls ── */}
            <div className="nav-row">
              <button
                className="nav-btn"
                onClick={goBack}
                disabled={activeIndex === 0}
                aria-label="Previous artwork"
              >
                <i className="lni lni-arrow-left" aria-hidden="true" />
                Back
              </button>

              <div className="dot-row" role="tablist" aria-label="Artwork selector">
                {ARTWORKS.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === activeIndex ? "dot-active" : ""}`}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to artwork ${i + 1}`}
                    onClick={() => {
                      setActiveIndex(i);
                      setDescOpen(false);
                    }}
                  />
                ))}
              </div>

              <button
                className="nav-btn"
                onClick={goNext}
                disabled={activeIndex === ARTWORKS.length - 1}
                aria-label="Next artwork"
              >
                Next
                <i className="lni lni-arrow-right" aria-hidden="true" />
              </button>
            </div>

            <p className="nav-counter">
              {activeIndex + 1}&nbsp;/&nbsp;{ARTWORKS.length}&ensp;—&ensp;Tap the dots or side cards to navigate
            </p>
          </section>

          {/* ── Artist Bio & Contacts ── */}
          <section className="bio-section reveal">
            <div className="section-divider">
              <span className="div-line" />
              <span className="div-label">The Artist</span>
              <span className="div-line" />
            </div>

            {/* Profile picture + name */}
            <div className="bio-profile-row">
              <div className="profile-ring">
                {/* Initials fallback (always behind image) */}
                <div className="profile-initials" aria-hidden="true">
                  {ARTIST.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {/* Profile photo — 400×400px recommended */}
                <img
                  src={ARTIST.profileSrc}
                  alt={ARTIST.name}
                  className="profile-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="bio-name-block">
                <h2 className="bio-name">{ARTIST.name}</h2>
                <p className="bio-tagline">{ARTIST.tagline}</p>
              </div>
            </div>

            {/* Artist bio text */}
            <p className="bio-text">{ARTIST.bio}</p>

            {/* Contact links */}
            <div className="contact-grid">
              <a
                href={`tel:${ARTIST.contacts.phone}`}
                className="contact-item"
                aria-label="Phone"
              >
                <span className="contact-icon"><i className="lni lni-phone" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">{ARTIST.contacts.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${ARTIST.contacts.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="contact-item"
                aria-label="WhatsApp"
              >
                <span className="contact-icon"><i className="lni lni-whatsapp" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">{ARTIST.contacts.whatsapp}</span>
                </div>
              </a>

              <a
                href={`mailto:${ARTIST.contacts.email}`}
                className="contact-item"
                aria-label="Email"
              >
                <span className="contact-icon"><i className="lni lni-envelope" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{ARTIST.contacts.email}</span>
                </div>
              </a>

              <a
                href={`https://x.com/${ARTIST.contacts.x}`}
                target="_blank"
                rel="noreferrer"
                className="contact-item"
                aria-label="X / Twitter"
              >
                <span className="contact-icon"><i className="lni lni-twitter-original" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">X (Twitter)</span>
                  <span className="contact-value">@{ARTIST.contacts.x}</span>
                </div>
              </a>

              <a
                href={`https://instagram.com/${ARTIST.contacts.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="contact-item"
                aria-label="Instagram"
              >
                <span className="contact-icon"><i className="lni lni-instagram" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@{ARTIST.contacts.instagram}</span>
                </div>
              </a>

              <a
                href={`https://snapchat.com/add/${ARTIST.contacts.snapchat}`}
                target="_blank"
                rel="noreferrer"
                className="contact-item"
                aria-label="Snapchat"
              >
                <span className="contact-icon"><i className="lni lni-snapchat" aria-hidden="true" /></span>
                <div className="contact-info">
                  <span className="contact-label">Snapchat</span>
                  <span className="contact-value">@{ARTIST.contacts.snapchat}</span>
                </div>
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Collins OluwaFemi. All rights reserved.</p>
          </footer>
        </div>
      )}
      {/* ══ LIGHTBOX OVERLAY ════════════════════════════════ */}
      {lightboxIndex !== null && (() => {
        const art = ARTWORKS[lightboxIndex];
        return (
          <div
            className={`lightbox-overlay ${lightboxClosing ? "lightbox-closing" : "lightbox-open"}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
            onTouchStart={(e) => setSwipeStartY(e.touches[0].clientY)}
            onTouchEnd={(e) => {
              if (e.changedTouches[0].clientY - swipeStartY > 70) closeLightbox();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Artwork: ${art.title}`}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <i className="lni lni-close" aria-hidden="true" />
            </button>

            <div className="lightbox-inner">
              {/* Left: artwork image — always crystal clear */}
              <div className="lightbox-img-panel">
                <img
                  src={art.src}
                  alt={art.title}
                  className="lightbox-img"
                  draggable={false}
                />
              </div>

              {/* Right: description panel */}
              <div className="lightbox-desc-panel">
                <p className="lightbox-eyebrow">{art.year}</p>
                <h2 className="lightbox-title">{art.title}</h2>
                <div className="lightbox-divider" />
                <p className="lightbox-description">{art.description}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   ARTWORK IMAGE SUB-COMPONENT
   Shows a styled placeholder if the image hasn't been added yet
══════════════════════════════════════════════════════════════ */

function ArtworkImage({ src, title }: { src: string; title: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="art-image-wrapper">
      {!errored ? (
        <img
          src={src}
          alt={title}
          className="art-image"
          onError={() => setErrored(true)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="art-placeholder">
          <p className="art-placeholder-label">{title}</p>
        </div>
      )}
    </div>
  );
}
