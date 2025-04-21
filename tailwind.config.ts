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
        presionarTecla: {
          "0%": {
            transform: "translateY(0)",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#eee",
          },
          "50%": {
            transform: "translateY(2px)",
            boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ddd",
          },
          "100%": {
            transform: "translateY(0)",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#eee",
          },
        },
      },
      animation: {
        presionarTecla: "presionarTecla 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
