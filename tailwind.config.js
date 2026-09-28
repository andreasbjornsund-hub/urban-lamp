// Tailwind build for intrinsicallysafephones.com (replaces cdn.tailwindcss.com).
// Rebuild after changing classes in any page:  bash scripts/build-css.sh
module.exports = {
  content: ['./*.html', './de/*.html', './nl/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
