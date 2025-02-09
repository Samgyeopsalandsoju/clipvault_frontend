/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: {
            light: '#FFFFFF',
            dark: '#18181b',
          },
          secondary: {
            light: '#F8F9FA',
            dark: '#27272a',
          },
          secondaryWithOpacity: {
            light: '#F8F9FA',
            dark: '#27272a80',
          },
          textfield: {
            light: '#F5F4EF',
            dark: '#F5F4EF',
          },
        },
        text: {
          primary: {
            light: '#FFFFFF',
            dark: '#f4f4f5',
          },
          secondary: {
            light: '#F8F9FA',
            dark: '#fff',
          },
          tertiary: {
            light: '#9CA3AF',
            dark: '#9CA3AF',
          },
          placeholder: {
            light: '#71717a',
            dark: '#71717a',
          },
        },
        border: {
          primary: {
            light: '#FFFFFF',
            dark: '#27272a',
          },
          secondary: {
            light: '#F8F9FA',
            dark: '#3f3f46',
          },
          divider: {
            light: '#828282',
            dark: '#847F7A',
          },
          focus: {
            light: '#52525b',
            dark: '#52525b',
          },
        },
      },
    },
  },
  plugins: [],
};
