/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'cmd':{min:"726px"},
        'rmd':{max:"725px"},
        'hsm':{max:'600px'},
        'gsc':{max:"1024px"},
     
        
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '@media print': {
          '@page': {
          margin:0,
          size: 'landscape',  // Sets the orientation to landscape
           },
          '*': {
            '-webkit-print-color-adjust': 'exact',
            'print-color-adjust': 'exact',
          },
          // Additional print-specific styles can go here
       
        }
      })
    }
  ],
}

