/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      height: {
        'screen-dynamic': '100dvh',
        'screen-small': '100svh',
        'screen-large': '100lvh',
      },
      maxHeight: {
        'screen-dynamic': '100dvh',
        'screen-small': '100svh',
        'screen-large': '100lvh',
      },
    },
  },
  plugins: [],
}

