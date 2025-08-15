/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales para hamburguesería
        primary: {
          DEFAULT: "#FF6B35",  // Naranja vibrante
          light: "#FF9F1C",    // Amarillo mostaza
          dark: "#E63946",     // Rojo tomate
          50: "#FFF0E5",
          100: "#FFE0CC",
          200: "#FFC299",
          300: "#FFA366",
          400: "#FF8533",
          500: "#FF6B35",
          600: "#E65100",
          700: "#CC4700",
          800: "#B33D00",
          900: "#993300"
        },
        // Colores secundarios
        secondary: {
          50: "#F9F8F4",
          100: "#F4F1DE",  // Beige claro
          200: "#EAD9B0",
          300: "#E0C183",
          400: "#D6A955",
          500: "#E07A5F",   // Terracota
          600: "#C45E4A",
          700: "#A84535",
          800: "#8C2E20",
          900: "#3D405B",   // Azul oscuro
          light: "#F4F1DE",  // Alias para el color claro
          DEFAULT: "#E07A5F", // Alias para el color por defecto
          dark: "#3D405B"    // Alias para el color oscuro
        },
        // Colores acentos
        accent: {
          yellow: "#F4D35E",  // Amarillo mostaza
          red: "#EE6C4D",     // Rojo coral
          green: "#7FB685"    // Verde menta
        },
        // Colores neutros
        neutral: {
          light: "#F8F9FA",
          DEFAULT: "#6C757D",
          dark: "#212529"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive']
      },
      boxShadow: {
        'burger': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'burger-hover': '0 8px 30px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
