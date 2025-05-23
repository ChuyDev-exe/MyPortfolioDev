/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				"fade-up": "fadeUp 0.8s ease-out",
			  },
			  keyframes: {
				fadeUp: {
				  "0%": { opacity: "0", transform: "translateY(30px)" },
				  "100%": { opacity: "1", transform: "translateY(0)" },
				},
			  }
		},
	},
	plugins: [],
}
