import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brightBlue: '#3483EA',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': `linear-gradient(
                    315deg,
                    hsl(214deg 81% 56%) 0%,
                    hsl(217deg 80% 63%) 1%,
                    hsl(220deg 80% 68%) 3%,
                    hsl(221deg 80% 72%) 4%,
                    hsl(223deg 80% 76%) 7%,
                    hsl(224deg 80% 80%) 10%,
                    hsl(225deg 80% 84%) 14%,
                    hsl(226deg 80% 87%) 20%,
                    hsl(227deg 80% 90%) 27%,
                    hsl(228deg 81% 94%) 37%,
                    hsl(228deg 81% 97%) 51%,
                    hsl(0deg 0% 100%) 93%
                  ); `,
            },
            boxShadow: {
                white: '0px 0px 30px rgba(255, 255, 255, 0.2)',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
export default config;
