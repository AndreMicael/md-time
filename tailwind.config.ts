import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.html',
    ],
    theme: {
        screens: {
            xxs: '393px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '4xl': '1920px',
        },
        fontFamily: {
            encode: ['Encode Sans', 'sans-serif'],
            encodeCondensed: ['Encode Sans Condensed', 'sans-serif'],
            encodeSemiCondensed: ['Encode Sans Semi Condensed', 'sans-serif'],
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    plugins: [require('daisyui')],
} satisfies Config;
