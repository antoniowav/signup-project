import type { Config } from "tailwindcss";

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
      colors: {
        errorPrimary: "#5A0000",
        errorSecondary: "#FF0000",
        successPrimary: "#004006",
        successSecondary: "#69ED76",
      },
      fontFamily: {
        simmaBold: ["Simma-Lugnt-bold", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
