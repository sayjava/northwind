// tailwind.config.cjs

module.exports = {
    // add this section
    purge: [
        './src/**/*.html',
        './src/**/*.svelte'
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
}