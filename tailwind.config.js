/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			h1: ['Signika Negative']
		},
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				accent: 'var(--color-accent)',
				neutral: 'var(--color-neutral)',
				info: 'var(--color-info)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)',
				'primary-text': 'var(--color-text-primary)',
				'secondary-text': 'var(--color-text-secondary)',
				'primary-background': 'var(--color-bg-primary)',
				'secondary-background': 'var(--color-bg-secondary)'
			}
		},
		backgroundColor: (theme) => ({
			...theme('colors')
		})
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
