import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.html',
    ],
    theme: {
        clipPath: {
            'full-skew': 'polygon(0 50px, 100% 0, 100% calc(100% - 50px), 0 100%)',
            'bottom-skew': 'polygon(0 0, 100% 0, 100% calc(100% - 50px), 0 100%)',
        },
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
                azul: '#0D265C',
                dourado: '#D0AC43',
            },
        },
    },
    plugins: [require('daisyui'), require('tailwind-clip-path')],
} satisfies Config;
