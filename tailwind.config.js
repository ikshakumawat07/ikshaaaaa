/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-violet': '#21112F',
        'royal-purple': '#503078',
        'lavender': '#B9A2E8',
        'blush-pink': '#F2B7CB',
        'sunset-orange': '#F4A16C',
        'cream': '#FFF5E9',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'curly': ['JustLikeHeaven', 'Comfortaa', 'cursive', 'sans-serif'],
        'pearl': ['TanPearl', 'Playfair Display', 'Georgia', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'times': ['"Times New Roman"', 'Times', 'serif'],
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #21112F 0%, #503078 30%, #B9A2E8 60%, #F2B7CB 80%, #F4A16C 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(80, 48, 120, 0.3) 0%, rgba(185, 162, 232, 0.1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'particle': 'particle 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(185, 162, 232, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(185, 162, 232, 0.6), 0 0 40px rgba(242, 183, 203, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
