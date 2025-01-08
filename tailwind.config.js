module.exports = {
  content: [
    "./public/**/*.{html,js,css}",
    "./src/**/*.{html,js,ejs,jsx,ts,tsx}",
    "./src/views/**/*.ejs",
    "./src/views/partials/**/*.ejs",
    "./src/views/layouts/**/*.ejs",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in": "url('/assets/Logo.png')",
        "login-left":"url('/assets/sign-in.png')"
      },
    },
  },
  plugins: [],
};
