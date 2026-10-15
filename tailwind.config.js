/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      body: ['Brandon Grotesque', 'sans-serif'],
      button: ['Brandon Grotesque Bold', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        black: '#000000',
        bubblegum: '#ffbcf2',
        chartreuse: '#ebff02',
        fog: '#f5f7ef',
        Fuchsia: '#ff00fb',
        goldenrod: '#ffe011',
        periwinkle: '#645eff',
        persimmon: '#ff4401',
        pumpkin: '#ff7500',
        psc: {
          blue: '#206EF6',
          count: '#676767',
          gray: '#EEEEEE',
          hr: '#D1D1D1',
          red: '#DD2834',
          yellow: '#ffb736'
        },
        purple: '#500f99',
        rust: '#db3a00',
        steel: '#c8c8dc',
        stone: '#6d6d88',
        white: '#ffffff'
      }
    }
  }
}
