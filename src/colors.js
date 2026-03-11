/**
 * COLOR COMBINATIONS & PALETTE
 * Extracted from App.jsx - SkillArena Design System
 */

// ═══════════════════════════════════════════
// PRIMARY COLOR PALETTE
// ═══════════════════════════════════════════
export const PRIMARY_COLORS = {
  indigo: "#4F6EF7",
  violet: "#7C3AED",
  teal: "#2DD4BF",
  gold: "#F5A623",
};

// ═══════════════════════════════════════════
// BACKGROUND & SURFACE COLORS
// ═══════════════════════════════════════════
export const BG_COLORS = {
  primary: "#06070F",     // --bg
  secondary: "#0D0F1E",   // --bg2
  dark: "#030408",        // footer background
  veryDark: "#1a1a2e",   // plate material
};

// ═══════════════════════════════════════════
// SEMANTIC COLORS (RGBA)
// ═══════════════════════════════════════════
export const RGBA_COLORS = {
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  white15: "rgba(255,255,255,0.15)",
  indigoTint10: "rgba(79,110,247,0.1)",
  indigoTint13: "rgba(79,110,247,0.13)",
  indigoTint15: "rgba(79,110,247,0.15)",
  indigoTint25: "rgba(79,110,247,0.25)",
  indigoTint35: "rgba(79,110,247,0.35)",
  indigoTint5: "rgba(79,110,247,0.03)",
  indigoTint6: "rgba(79,110,247,0.06)",
  indigoBorder6: "rgba(79,110,247,0.6)",
  goldTint6: "rgba(245,166,35,0.06)",
  glassMorphism: "rgba(255,255,255,0.04)",
};

// ═══════════════════════════════════════════
// TEXT & ACCENT COLORS
// ═══════════════════════════════════════════
export const TEXT_COLORS = {
  primary: "#F0F2FF",    // --text
  white: "#fff",
  lightIndigo: "#A5B4FC",
  gray: "#9CA3AF",
  medGray: "#6B7280",
  darkGray: "#4B5563",
  charcoal: "#374151",
  veryDark: "#1F2937",
};

// ═══════════════════════════════════════════
// COLOR COMBINATIONS (GRADIENTS & PAIRS)
// ═══════════════════════════════════════════
export const COLOR_COMBINATIONS = {
  // Gradient combinations
  gradients: {
    indigoViolet: "linear-gradient(135deg, #4F6EF7, #7C3AED)",
    indigoTeal: "linear-gradient(135deg, #4F6EF7, #2DD4BF)",
    indigoGold: "linear-gradient(135deg, #4F6EF7, #F5A623)",
    violetGold: "linear-gradient(135deg, #7C3AED, #F5A623)",
    tealGold: "linear-gradient(135deg, #2DD4BF, #F5A623)",
    whiteIndigo: "linear-gradient(135deg, #fff, #4F6EF7)",
    whiteTeal: "linear-gradient(135deg, #fff, #2DD4BF)",
    bgCardGlow: "linear-gradient(135deg, rgba(79,110,247,0.08), rgba(124,58,237,0.06))",
    trophyBgGlow: "linear-gradient(135deg, rgba(79,110,247,0.08), rgba(124,58,237,0.06))",
    goldTint: "linear-gradient(135deg, #fff, var(--indigo), var(--teal), #fff)",
  },

  // Radial gradients
  radialGradients: {
    heroOverlay: "radial-gradient(ellipse at 25% 50%, transparent 25%, rgba(6,7,15,.78) 100%)",
    cardGlow: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(79,110,247,.13), transparent 60%)",
    gridGradient: "radial-gradient(circle at 50% 0%, rgba(79,110,247,.06) 0%, transparent 60%)",
    rewardsBgLeft: "radial-gradient(circle at 20% 50%, rgba(79,110,247,.07) 0%, transparent 50%)",
    rewardsBgRight: "radial-gradient(circle at 80% 50%, rgba(245,166,35,.06) 0%, transparent 50%)",
    heroGlow: "radial-gradient(circle, rgba(79,110,247,.12) 0%, transparent 70%)",
  },

  // Badge combinations
  badges: {
    indigoBase: {
      bg: "rgba(79,110,247,0.1)",
      border: "rgba(79,110,247,0.25)",
      dot: "#2DD4BF",
    },
    tealDot: "#2DD4BF",
  },

  // Button combinations
  buttons: {
    primary: {
      bg: "linear-gradient(135deg, #4F6EF7, #7C3AED)",
      text: "#fff",
      glow: "0 8px 32px rgba(79,110,247,.35)",
      hoverGlow: "0 16px 48px rgba(79,110,247,.5)",
    },
    outline: {
      bg: "rgba(255,255,255,.04)",
      border: "1px solid rgba(255,255,255,.08)",
      hoverBorder: "rgba(79,110,247,.5)",
      hoverText: "#A5B4FC",
    },
  },

  // Category card colors
  categories: {
    fitness: {
      hex: "#2DD4BF",
      hexa: 0x2DD4BF,
      name: "Teal - Fitness Challenges",
    },
    cooking: {
      hex: "#F5A623",
      hexa: 0xF5A623,
      name: "Gold - Cooking Battles",
    },
    coding: {
      hex: "#4F6EF7",
      hexa: 0x4F6EF7,
      name: "Indigo - Coding Arenas",
    },
    creative: {
      hex: "#7C3AED",
      hexa: 0x7C3AED,
      name: "Violet - Creative Talent",
    },
  },

  // Reward badges
  rewardBadges: [
    { bg: "#2DD4BF", text: "🥇 1st Place", label: "Teal" },
    { bg: "#F5A623", text: "⚡ Top 1%", label: "Gold" },
    { bg: "#7C3AED", text: "🔥 7-Day Streak", label: "Violet" },
    { bg: "#4F6EF7", text: "⭐ Rising Star", label: "Indigo" },
  ],

  // Three.js light colors
  lights: {
    ambientIndigoLight: 0x4f6ef7,
    directionalTealLight: 0x2dd4bf,
    pointVioletLight: 0x7c3aed,
    pointGoldLight: 0xf5a623,
    particleIndigo: 0x4f6ef7,
    gemIndigo: 0x4f6ef7,
  },

  // Decorative shape colors
  shapes: {
    tealIcosahedron: 0x2dd4bf,
    goldOctahedron: 0xf5a623,
    violetTorus: 0x7c3aed,
    indigoTorusKnot: 0x4f6ef7,
  },

  // Trophy materials
  trophyMaterials: {
    goldMat: 0xf5a623,
    darkGold: 0xc8851b,
    gemMat: 0x4f6ef7,
    plateMat: 0x1a1a2e,
    starMat: 0xffffff,
  },
};

// ═══════════════════════════════════════════
// COMPOSITE COLOR SCHEMES
// ═══════════════════════════════════════════
export const COLOR_SCHEMES = {
  // Hero section
  hero: {
    bgGradient: "#06070F",
    accentIndigo: "#4F6EF7",
    accentViolet: "#7C3AED",
    overlayGradient: "radial-gradient(ellipse at 25% 50%, transparent 25%, rgba(6,7,15,.78) 100%)",
  },

  // Categories section
  categories: {
    bg: "#0D0F1E",
    bgGradient: "rgba(79,110,247,.06)",
    cards: [
      { title: "Fitness", color: "#2DD4BF", icon: "🏃" },
      { title: "Cooking", color: "#F5A623", icon: "👨‍🍳" },
      { title: "Coding", color: "#4F6EF7", icon: "💻" },
      { title: "Creative", color: "#7C3AED", icon: "🎨" },
    ],
  },

  // Interactive hover states
  hoverStates: {
    cardHover: {
      borderColor: "rgba(79,110,247,.35)",
      boxShadow: "0 32px 80px rgba(79,110,247,.15)",
    },
    linkHover: {
      color: "#fff",
      fromColor: "#9CA3AF",
      toColor: "#fff",
    },
  },

  // Shimmer animation
  shimmerGradient: "linear-gradient(135deg, #fff 0%, #4F6EF7 40%, #2DD4BF 60%, #fff 100%)",
};

// ═══════════════════════════════════════════
// UTILITY: Generate color with opacity
// ═══════════════════════════════════════════
export function getColorWithOpacity(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// ═══════════════════════════════════════════
// UTILITY: Convert hex to RGB
// ═══════════════════════════════════════════
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// ═══════════════════════════════════════════
// UTILITY: Convert hex to Three.js color
// ═══════════════════════════════════════════
export function hexToThreeColor(hex) {
  return parseInt(hex.slice(1), 16);
}

// ═══════════════════════════════════════════
// SUMMARY: All Unique Colors Used
// ═══════════════════════════════════════════
export const ALL_COLORS = {
  count: 15,
  colors: [
    "#4F6EF7 - Indigo (Primary accent)",
    "#7C3AED - Violet (Secondary accent)",
    "#2DD4BF - Teal (Tertiary accent)",
    "#F5A623 - Gold (Quaternary accent)",
    "#06070F - Dark BG (Primary background)",
    "#0D0F1E - Darker BG (Secondary background)",
    "#030408 - Very Dark BG (Footer)",
    "#1a1a2e - Dark Surface",
    "#F0F2FF - Off-white text",
    "#fff - Pure white",
    "#9CA3AF - Light gray",
    "#6B7280 - Medium gray",
    "#4B5563 - Dark gray",
    "#374151 - Charcoal",
    "#1F2937 - Very dark gray",
  ],
};
