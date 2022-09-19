/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        tableGridBody: "1.4fr 0.9fr 0.15fr",
        tableGridHead: "1.4fr 0.9fr 0.15fr",
      },
    },
  },
  plugins: [],
};
