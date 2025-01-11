/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "eat-up": "eat-up 0.5s linear infinite",
        "eat-down": "eat-down 0.5s linear infinite",
      },
    },
    keyframes: {
      "eat-up": {
        "0%, 100%": { transform: "rotate(0deg)" },
        "50%": { transform: "rotate(-45deg)" },
      },
      "eat-down": {
        "0%, 100%": { transform: "rotate(0deg)" },
        "50%": { transform: "rotate(45deg)" },
      },
    },
  },
  plugins: [],
};
