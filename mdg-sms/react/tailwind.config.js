// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // Define your background color
        foreground: '#1a202c', // Define your foreground color
        border: '#e2e8f0', // Define your border color
      },
    },
  },
  plugins: [],
}