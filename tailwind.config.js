module.exports = {
  mode:"jit",
    content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    "./src/**/*.{html,ts}",
    "./pages/**/*.{html,js,ts,jsx}",
    "./components/**/*.{html,js,ts,jsx}",
    './*.{html,js,ts,jsx}'    
  ],
  theme: {
    extend: {
      colors:{
        ColorOne:"#f06b04",
        headerBg:'#0e70b4'
        },
        screens:{
          "3xl":"2000px"
        }
    },
    
  },
    variants:{
      extend:{},
    },
  plugins: [require('tailwind-scrollbar-hide')],
};