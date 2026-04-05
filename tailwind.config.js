/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fitpan Brand Colors
        primary: {
          50: "#F0F5F2",
          100: "#D9E8E1",
          200: "#B8D5C7",
          300: "#92BAAA",
          400: "#62A086",
          500: "#1F573F",
          600: "#1B4A35",
          700: "#163D2B",
          800: "#0F2C1F",
          900: "#0A1F16",
        },
        accent: {
          50: "#FEF7F0",
          100: "#FDEAE4",
          200: "#FAD5C8",
          300: "#F5B8A0",
          400: "#E8956F",
          500: "#C19A6B",
          600: "#A68457",
          700: "#886F47",
          800: "#6B573A",
          900: "#553E2D",
        },
        background: {
          light: "#FDFCFB",
          darker: "#F9F8F6",
          muted: "#EFE9E0",
        },
      },
      fontFamily: {
        // Headings: Bold, Modern
        heading: ["Montserrat", "sans-serif"],
        // Body: Clean, Readable on all devices
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        // Headings
        "h1": ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h2": ["2.25rem", { lineHeight: "1.3", fontWeight: "700" }],
        "h3": ["1.875rem", { lineHeight: "1.3", fontWeight: "700" }],
        "h4": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "h5": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "h6": ["1rem", { lineHeight: "1.5", fontWeight: "600" }],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        // Premium spacing scale
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "5rem",
        "6xl": "6rem",
        "7xl": "7rem",
        "8xl": "8rem",
      },
      boxShadow: {
        // Premium shadow system
        none: "none",
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        // Premium card shadow (soft, elevated)
        card: "0 4px 20px rgba(31, 87, 63, 0.08)",
        // Hover state
        "card-hover": "0 12px 32px rgba(31, 87, 63, 0.12)",
        // Soft glow effect
        glow: "0 0 20px rgba(193, 154, 107, 0.2)",
      },
      borderRadius: {
        // Soft modern corners
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      transition: {
        "fast": "all 0.2s ease-in-out",
        "base": "all 0.3s ease-in-out",
        "slow": "all 0.5s ease-in-out",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
