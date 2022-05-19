module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./comps/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "base": "1440px"
      },
      colors: {
        'standard' : 'var(--standard-mode)',
        'standardO' : 'var(--standard-original)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
      },
      fontWeight : {
        "headline" : "var(--fw-headine)",
        "body": "var(--fw-body)"
      },
      boxShadow: {
        'productViewer': "0px 10px 40px 0px #00113326 "
      },
      spacing: {
        "live_auction" : "var(--mt-live_auction)",
      }
    },
  },
  plugins: [],
}