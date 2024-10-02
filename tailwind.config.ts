import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-out': {
          '0%': { opacity: '1', transform: 'scale(1.5)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
      },
      animation: {
        'fade-out': 'fade-out 1s ease-in-out forwards', // Adjust duration and easing as needed
      },
      screens: {
        '2xl': '1600px',
        'lg': '1201px',
        'md': '997px',
        'between-md-and-sm': '800px',
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
        'brand-red' : '#ff2d2d',
        'lime-green' : '#00ff0a',
        'brand-royal-purple': '#6d1bf0',
        'brand-lavender-purple': '#ab78ff',
        'brand-white-36': '#ffffff36',
        'brand-white-7': '#ffffff12',
        'cursed-black': '#131313',
        'pale-lavender': '#E1CFFF',
        'sunset-orange' : '#FF8527',
        'teal-blue' : '#009090',
        'dark-green' : '#005B04',
        'dark-red' : '#5B0000'
      },
      backgroundImage:{
        'hero-section-bg-desktop': "url('/images/hero_section_bg_desktop.avif')",
        'hero-section-bg-tab': "url('/images/hero_section_bg_tab.avif')",
        'hero-section-bg-mobile': "url('/images/hero_section_bg_mobile.avif')",
        'tournament-bg': "url('/images/tournament_bg.avif')",
        'unlock-badge-bg': "url('/images/unlock_badge_bg.avif')",
        'unlock-badge-bg-mobile': "url('/images/unlock_badge_bg_mobile.avif')",
        'redeem-points-coming-soon-bg': "url('/images/redeem_points_coming_soon_bg.avif')",
        'redeem-points-bg': "url('/images/redeem_points_bg.avif')",
        'redeem_points_bg_mobile': "url('/images/redeem_points_bg_mobile.avif')",
        'redeem_points_coming_soon_bg_mobile': "url('/images/redeem_points_coming_soon_bg_mobile.avif')",
        'room-bg-desktop': "url('/images/room_bg_desktop.avif')",
        'room-bg-mobile': "url('/images/room_bg_mobile.avif')",
        'room-bg-tab': "url('/images/room_bg_tab.avif')",
        'game-page-bg-image': "url('/images/game_page_bg.avif')",
        'campas-bg-image': "url('/images/campas_bg.png')",

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
