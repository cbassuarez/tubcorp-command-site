/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stage: {
          black: '#000000',
          line: '#1a1a1a',
          text: '#f5f5f5',
          muted: '#8f8f8f',
          signal: '#00ff41',
          cyan: '#00f5ff',
          amber: '#ffbe0b',
          alert: '#ff3d5a',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        rail: '0 0 0 1px rgba(255,255,255,0.16)',
      },
      keyframes: {
        tape: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        tape: 'tape 22s linear infinite',
      },
    },
  },
  plugins: [],
}
