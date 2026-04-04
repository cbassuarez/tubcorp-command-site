/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          elevated: 'var(--surface-elevated)',
          overlay: 'var(--surface-overlay)',
        },
        line: {
          DEFAULT: 'var(--border-primary)',
          subtle: 'var(--border-subtle)',
        },
        txt: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          signal: 'var(--accent-signal)',
          cyan: 'var(--accent-cyan)',
          amber: 'var(--accent-amber)',
          alert: 'var(--accent-alert)',
        },
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans"', '"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
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
