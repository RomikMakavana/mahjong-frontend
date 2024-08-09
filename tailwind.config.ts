import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1600px',
        'lg': '1201px',
        'md': '997px',
        'sm': '769px',
        'xs': '583px',
        'xxs': '361px',
      },
      colors:{
        'brand-blue': '#5500df',
        'brand-purple': '#604685',
        'brand-yellow': '#fcb427',
        'brand-yellow-27': '#fcb42742',
        'brand-dark-grey': '#474747',
        'brand-dark': '#1a1a1a'
      },
      boxShadow:{
        'headerShadowLeft': '0 30px 110px 50px rgba(158, 98, 255, 1)',
        'headerShadowRight': '0 0 250px 100px rgba(158, 98, 255, 1)',
      },
      borderRadius:{
        '9': '0.56rem'
      },
      spacing:{
        '295': '73.75rem'
      }
    },
  },
  plugins: [],
};
export default config;
