// Import necessary modules
import type { Config } from 'tailwindcss';
import svgToDataUri from 'mini-svg-data-uri';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
const colors = require("tailwindcss/colors");

// Type definition for plugin functions
interface PluginUtils {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  theme: (path: string) => Record<string, string | Record<string, string>>;
}

interface MatchUtilities {
  matchUtilities: (
    utilities: Record<string, (value: string) => Record<string, string>>,
    options: { values: Record<string, string>; type: string }
  ) => void;
  theme: (path: string) => Record<string, string | Record<string, string>>;
}

// Define a recursive interface for nested color objects
interface NestedColorObject {
  [key: string]: string | NestedColorObject;
}

// Helper function to flatten color objects into CSS variables
function addVariablesForColors({ addBase, theme }: PluginUtils) {
  const themeColors = theme('colors');

  const flattenColors = (obj: NestedColorObject, parentKey = ''): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = parentKey ? `${parentKey}-${key}` : key;
      if (typeof value === 'string') {
        acc[newKey] = value;
      } else {
        Object.assign(acc, flattenColors(value, newKey));
      }
      return acc;
    }, {} as Record<string, string>);
  };

  const allColors = flattenColors(themeColors);
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value])
  );

  addBase({
    ':root': newVars,
  });
}

// Plugin to add SVG patterns for backgrounds
function addSvgPatterns({ matchUtilities, theme }: MatchUtilities) {
  const backgroundColors = flattenColorPalette(theme('backgroundColor')) as Record<string, string>;

  matchUtilities(
    {
      'bg-grid': (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      'bg-grid-small': (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      'bg-dot': (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: backgroundColors, type: 'color' }
  );
}

// Tailwind CSS configuration
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderColor: {
        border: 'hsl(var(--border))', // Custom border utility
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'meteor-effect': 'meteor 5s linear infinite',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-82%, -62%) scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -40%) scale(2)',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, addSvgPatterns],
};

export default config;
