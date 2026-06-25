import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        ember: "#ff4d3d",
        violet: "#8b5cf6",
        bone: "#f1eee8",
      },
    },
  },
  plugins: [],
};

export default config;
