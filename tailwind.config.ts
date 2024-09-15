import type { Config } from "tailwindcss";

const config: Config = {
  safelist: [
    "bg-blue-500", // TypeScript
    "bg-yellow-400", // JavaScript
    "bg-green-500", // Python
    "bg-cyan-500", // Go
    "bg-orange-500", // Rust
    "bg-red-500", // Java
    "bg-red-400", // Ruby
    "bg-gray-500", // C
    "bg-blue-700", // C++
    "bg-blue-900", // HTML
    "bg-blue-600", // CSS
    "bg-blue-300", // Dockerfile
    "bg-gray-700", // Shell
    "bg-purple-500", // PHP
    "bg-orange-400", // Swift
    "bg-purple-600", // Kotlin
    "bg-blue-400", // Dart
    "bg-pink-400", // Perl
    "bg-indigo-400", // Lua
    "bg-purple-700", // Elixir
    "bg-red-300", // Haskell
    "bg-teal-400", // R
    "bg-red-600", // Scala
    "bg-gray-800", // Solidity
    "bg-gray-400", // YAML
    "bg-green-300", // JSON
    "bg-purple-300", // SQL
    "bg-gray-300", // Default
  ],

  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
