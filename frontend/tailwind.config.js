/** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: 'class', // Enable class-based dark mode
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   variants: {
//     extend:{
//       display:["focus-group"]
//     }
//   }
// }

// tailwind.config.js

export default {
  darkMode: 'class', // Enable class-based dark mode
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      // Extend your theme here
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'hover', 'group-hover'],
      borderColor: ['dark', 'hover', 'focus'],
      textColor: ['dark', 'hover', 'group-hover'],
      placeholderColor: ['dark', 'focus'],
    },
  },
  plugins: [],
};
