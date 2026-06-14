/** @type {import('tailwindcss').Config} */
module.exports = {
  // Caminhos onde o Tailwind deve procurar por classes
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 1. CORES (Agora conectadas às variáveis do global.css!)
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        neutral: "var(--color-neutral)",
        surface: "var(--color-surface)",
        "on-tertiary": "var(--color-on-tertiary)",
        border: "var(--color-border)",
      },
      
      // 2. BORDAS ARREDONDADAS (Squircles do Design Apple)
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "32px",
      },
      
      // 3. ESPAÇAMENTOS (Paddings, Margins, Gaps)
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },

      // 4. TIPOGRAFIA (Família e Tamanhos)
      fontFamily: {
        // Define a Elms Sans como fonte padrão (sans) do projeto
        sans: ["Elms Sans", "sans-serif"],
      },
      fontSize: {
        "display-large": ["3.5rem", { fontWeight: "400" }],
        "display-medium": ["2.8rem", { fontWeight: "400" }],
        "display-small": ["2.25rem", { fontWeight: "400" }],
        "headline-large": ["2rem", { fontWeight: "400" }],
        "headline-medium": ["1.75rem", { fontWeight: "400" }],
        "headline-small": ["1.5rem", { fontWeight: "400" }],
        "title-large": ["1.375rem", { fontWeight: "400" }],
        "title-medium": ["1rem", { fontWeight: "400" }],
        "title-small": ["0.875rem", { fontWeight: "400" }],
        "body-large": ["1rem", { fontWeight: "400" }],
        "body-medium": ["0.875rem", { fontWeight: "400" }],
        "body-small": ["0.75rem", { fontWeight: "400" }],
        "label-large": ["0.875rem", { fontWeight: "400" }],
        "label-medium": ["0.75rem", { fontWeight: "400" }],
        "label-small": ["0.6875rem", { fontWeight: "400" }],
      },
    },
  },
  plugins: [],
}