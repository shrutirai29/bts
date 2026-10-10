/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bts: {
          purple: '#8B5CF6',
          darkPurple: '#1F1135',
          deepPurple: '#0E0720',
          night: '#080314',
          neon: '#C084FC',
          lightViolet: '#E9D5FF',
          accent: '#A855F7',
          gold: '#F6E05E',
          silver: '#E2E8F0',
          card: 'rgba(26, 16, 49, 0.75)',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spotlight-sweep': 'spotlightSweep 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(192, 132, 252, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spotlightSweep: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        }
      }
    },
  },
  plugins: [],
}
