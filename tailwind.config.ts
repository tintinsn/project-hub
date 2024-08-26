import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "dark-md-border": "0 0 0 1px #fff",
        "dark-sm-border": "0 0 0 1px #333",
        "light-sm-border": "0 5px 10px rgba(0,0,0,0.12)",
        "light-md-border": "0 8px 30px rgba(0,0,0,0.12)",
        "light-lg-border": "0 3px 16px rgba(4,8,109,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
