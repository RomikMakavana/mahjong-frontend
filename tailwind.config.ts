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
        'light-blue': '#9553FF',
        'brand-purple': '#604685',
        'brand-yellow': '#fcb427',
        'brand-yellow-27': '#fcb42742',
        'brand-yellow2': '#fcd227',
        'brand-dark-grey': '#474747',
        'brand-dark': '#1a1a1a',
        'brand-aqua': '#00ffe0',
        'brand-black-87': '#000000de',
        'brand-spanish-gray': '#92929280',
        'brand-spanish-gray-8': '#929292cc',
        'brand-blue-grey': '#4d5a5d',
        'brand-royal-purple': '#6d1bf0',
        'brand-lavender-purple': '#ab78ff',
        'brand-white-36': '#ffffff36',
        'brand-white-7': '#ffffff12'
      },
      backgroundImage:{
        'hero-section-bg-desktop': "url('/images/hero_section_bg_desktop.avif')",
        'hero-section-bg-tab': "url('/images/hero_section_bg_tab.avif')",
        'hero-section-bg-mobile': "url('/images/hero_section_bg_mobile.avif')",
        'tournament-bg': "url('/images/tournament_bg.png')"
      },
      boxShadow:{
        'headerShadowLeft': '0 30px 120px 50px rgba(158, 98, 255, 1)',
        'headerShadowRight': '0 0 300px 110px rgba(158, 98, 255, 1)',
        'purpleShadow': '0px 20px 44.9px 0px rgba(63, 0, 166, 0.17)',  
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
