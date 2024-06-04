/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#52525A",
        "secondary": "#F7BD21",
        "tertiary": "#E65A42",
        "typo-light": "#f1f1f1",
        "typo-dark": "#282828",
        "bg-dark": "#282828",
        "bg-light": "#f1f1f1",
      }
    },
    fontSize: {
      sm: '1rem',
      base: '1.25rem',
      lg: '1.625rem',
      xl: '1.953rem',
      '2xl': '2.441rem',
      '3xl': '3.052rem',
      '4xl': '3.625rem',
      '5xl': '4rem',
    }
  },
  plugins: [],
}

