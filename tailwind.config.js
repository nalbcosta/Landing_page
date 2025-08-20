/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-1': '#8F3985',
                'brand-2': '#E980FC',
                'brand-dark': '#1C1018',
                'brand-muted': '#A2A79E',
                'brand-cream': '#F2EFE9',
            },
            // opcional: adicionar gradientes utilitários
            backgroundImage: {
                'accent-radial': 'radial-gradient(closest-corner at 10% 10%, rgba(233,128,252,0.14), transparent 20%), radial-gradient(closest-corner at 90% 80%, rgba(143,57,133,0.12), transparent 25%)'
            }
        },
    },
    plugins: [],
}