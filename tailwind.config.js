/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stage: {
          black: '#f5f0e4',
          line: '#d8cfbc',
          text: '#1c1a16',
          muted: '#736c5d',
          signal: '#0a9f45',
          cyan: '#0b7480',
          amber: '#9b6a00',
          alert: '#b1283f',
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
