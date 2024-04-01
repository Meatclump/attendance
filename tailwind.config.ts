import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
	"bg-gray-400",
	"bg-red-400",
	"bg-orange-400",
	"bg-amber-400",
	"bg-yellow-400",
	"bg-lime-400",
	"bg-green-400",
	"bg-emerald-400",
	"bg-teal-400",
	"bg-cyan-400",
	"bg-sky-400",
	"bg-blue-400",
	"bg-indigo-400",
	"bg-violet-400",
	"bg-purple-400",
	"bg-fuchsia-400",
	"bg-pink-400",
	"text-gray-400",
	"text-red-400",
	"text-orange-400",
	"text-amber-400",
	"text-yellow-400",
	"text-lime-400",
	"text-green-400",
	"text-emerald-400",
	"text-teal-400",
	"text-cyan-400",
	"text-sky-400",
	"text-blue-400",
	"text-indigo-400",
	"text-violet-400",
	"text-purple-400",
	"text-fuchsia-400",
	"text-pink-400",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
