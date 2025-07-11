import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3B82F6',     // Light: blue-500
          'primary-dark': '#60A5FA', // Dark: blue-400
          secondary: '#7C3AED',   // Light: violet-600
          'secondary-dark': '#C4B5FD',
          accent: '#10B981',      // Light: emerald-500
          'accent-dark': '#34D399',
          background: '#F9FAFB',
          'background-dark': '#1F2937',
          surface: '#FFFFFF',
          'surface-dark': '#374151',
          border: '#E5E7EB',
          'border-dark': '#4B5563',
          text: '#111827',
          'text-dark': '#F9FAFB',
          'text-secondary': '#6B7280',
          'text-secondary-dark': '#9CA3AF',
          success: '#22C55E',
          'success-dark': '#4ADE80',
          warning: '#F59E0B',
          'warning-dark': '#FBBF24',
          error: '#EF4444',
          'error-dark': '#F87171',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      }
    },
  },
  plugins: [],
} satisfies Config; 