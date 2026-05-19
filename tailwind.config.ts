import { type Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate"; // ton plugin

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.css"  // ajoute les CSS globaux si tu modifies des variables ici
  ],
  theme: {
    extend: {},
  },
  plugins: [animatePlugin],
  darkMode: 'class', // active le dark mode via la classe "dark"
};

export default config;
