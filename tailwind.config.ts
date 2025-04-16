import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        glitch: {
          "0%": {"clip-path": "inset(20% 0 50% 0)"},
          "5%": {"clip-path": "inset(10% 0 60% 0)"},
          "10%": {"clip-path": "inset(15% 0 55% 0)"},
          "15%": {"clip-path": "inset(25% 0 35% 0)"},
          "20%": {"clip-path": "inset(30% 0 40% 0)"},
          "25%": {"clip-path": "inset(40% 0 20% 0)"},
          "30%": {"clip-path": "inset(10% 0 60% 0)"},
          "35%": {"clip-path": "inset(15% 0 55% 0)"},
          "40%": {"clip-path": "inset(25% 0 35% 0)"},
          "45%": {"clip-path": "inset(30% 0 40% 0)"},
          "50%": {"clip-path": "inset(20% 0 50% 0)"},
          "55%": {"clip-path": "inset(10% 0 60% 0)"},
          "60%": {"clip-path": "inset(15% 0 55% 0)"},
          "65%": {"clip-path": "inset(25% 0 35% 0)"},
          "70%": {"clip-path": "inset(30% 0 40% 0)"},
          "75%": {"clip-path": "inset(40% 0 20% 0)"},
          "80%": {"clip-path": "inset(20% 0 50% 0)"},
          "85%": {"clip-path": "inset(10% 0 60% 0)"},
          "90%": {"clip-path": "inset(15% 0 55% 0)"},
          "95%": {"clip-path": "inset(25% 0 35% 0)"},
          "100%": {"clip-path": "inset(30% 0 40% 0)"},
        },
      },
      animation: {
        "glitch-after":
          "glitch var(--after-duration) infinite linear alternate-reverse",
        "glitch-before":
          "glitch var(--before-duration) infinite linear alternate-reverse",
      },
    },
  },
  plugins: [],
};
export default config;
