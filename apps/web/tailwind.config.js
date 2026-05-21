/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"abtec-blue": {
					DEFAULT: "#262660",
					50: "#e9e9f0",
					100: "#c7c7d9",
					200: "#a3a3bf",
					300: "#7f7fa6",
					400: "#5c5c8c",
					500: "#3d3d73",
					600: "#262660",
					700: "#1e1e4d",
					800: "#15153a",
					900: "#0b0b26",
				},
				"abtec-green": {
					DEFAULT: "#3AB54A",
					50: "#eef8f0",
					100: "#d3edd7",
					200: "#b5e1bc",
					300: "#94d3a0",
					400: "#70c481",
					500: "#3AB54A",
					600: "#2d9c3b",
					700: "#227d2f",
					800: "#175b22",
					900: "#0b3714",
				},
				"abtec-orange": {
					DEFAULT: "#FF6A00",
				},
				"abtec-gray": {
					DEFAULT: "#f3f3f7",
				}
			},
			fontFamily: {
				sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
				heading: ["var(--font-oswald)", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
};
