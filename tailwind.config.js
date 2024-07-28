/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:{
        'auth_bg':"url(/public/auth_bg.jpg) "
      } ,
      spacing: {
        'wrap':"96rem",
      },
      fontFamily: {
        baloo: ['Baloo 2'],
      },
      colors:{
        primary:"#1B3986",
        secondary:"#1D9958",
        primary250:"#F6F7FA" ,
        "primary-50":"#848BB7" ,
        secondary250:"#F5F5F5" ,
        error:"#DC143C" ,
        'gradient-start': '#F6F7FA',
        'gradient-end': '#E0E4E8',
      },
      transitionProperty: {
        'width': 'width',
      },
      boxShadow: {
        'inner-custom': 'inset 0 2px 6px rgba(0, 0, 0, 0.1)',
        'inner-lg': 'inset 0 10px 15px rgba(0, 0, 0, 0.1)',
        'inner-primary': 'inset 0 0 10px rgba(29, 78, 216, 0.5)',
      },

    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
