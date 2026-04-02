/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'metin-dark': '#0a0a0f',
        'metin-card': '#1a1a2e',
        'metin-border': '#2a2a3e',
        'metin-primary': '#6d28d9',
        'metin-secondary': '#10b981',
        'metin-danger': '#ef4444',
        'metin-warning': '#f59e0b',
        'metin-info': '#3b82f6',
        'metin-hp': '#dc2626',
        'metin-exp': '#10b981',
        'metin-gold': '#fbbf24'
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      fontFamily: {
        'rpg': ['"Press Start 2P"', 'monospace'],
        'mono': ['"Roboto Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}