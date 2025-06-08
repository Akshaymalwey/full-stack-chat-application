import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-sync': 'pulseSync 2s linear infinite',
      },
      keyframes: {
        pulseSync: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#1D4ED8",    // blue
          "secondary": "#9333EA",  // violet
          "accent": "#F59E0B",     // amber
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
      {
        dark: {
          "primary": "#F59E0B",    // amber
          "secondary": "#10B981",  // emerald
          "accent": "#6366F1",     // indigo
          "neutral": "#1F2937",
          "base-100": "#111827",
        },
      },
    ],
  },
};
