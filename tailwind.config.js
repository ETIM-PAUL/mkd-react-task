/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        tableGridBody: "1.4fr 1fr 0.3fr",
        tableGridHead: "1.4fr 1fr 0.3fr",
      },
    },
  },
  plugins: [],
};
