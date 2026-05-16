import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        "rose-dust": {
          50: "#FDF5F5",
          100: "#F5E4E4",
          200: "#EAC8C8",
          300: "#D4A0A0",
          400: "#C8A4A4",
          500: "#B88080",
          600: "#8B5E5E",
          700: "#6B4242",
        },
        lavender: {
          50: "#F5F2FF",
          100: "#EDE8F5",
          200: "#D4C8E8",
          300: "#C0A8D8",
          400: "#B8A8C8",
          500: "#9880B0",
          600: "#785890",
        },
        sage: {
          50: "#F0F5EF",
          100: "#E0EAE0",
          200: "#C0D4C0",
          300: "#9AB09A",
          400: "#7A9A7A",
          500: "#5A7A5A",
          600: "#3A5A3A",
        },
        beige: "#E8DFD0",
        charcoal: "#2C2C2C",
      },
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
      },
      fontSize: {
        "2xs": "11px",
        xs: "13px",
        sm: "15px",
        base: "17px",
        lg: "19px",
        xl: "22px",
        "2xl": "26px",
        "3xl": "30px",
      },
    },
  },
  plugins: [],
};

export default config;
