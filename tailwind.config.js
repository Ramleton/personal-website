/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			// backgroundImage: {
			// 	'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			// 	'gradient-conic':
			// 		'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			// }
			colors: {
				'app-bg-dark': '#070a0f',
				'nav-bg-dark': '#212121',
				'nav-button-bg-dark': '#2b2b2b',
				'nav-button-bg-hover-dark': '#222423'
			}
		}
	},
	plugins: []
};
