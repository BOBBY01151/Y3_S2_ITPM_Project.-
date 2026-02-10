/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#001f5c",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#ff6600",
                    foreground: "#ffffff",
                },
                background: "#f5f7fa",
                foreground: "#1a1a1a",
                card: "#ffffff",
                border: "#e5e7eb",
                sidebar: {
                    DEFAULT: "#001f5c",
                    foreground: "#ffffff",
                    primary: "#ff6600",
                    accent: "#002a7a",
                    border: "#003399",
                }
            },
            borderRadius: {
                lg: "0.625rem",
                md: "calc(0.625rem - 2px)",
                sm: "calc(0.625rem - 4px)",
            }
        },
    },
    plugins: [],
}
