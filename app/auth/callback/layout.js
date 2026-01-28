import "./global.css";
export const metadata = {
  title: "chaosmusings.app",
  description: "Chaos Musings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* iOS / iPad Home Screen Icons */}
        <link rel="apple-touch-icon" sizes="120x120" href="/icon/icon/app/icon-120.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon/icon/app/icon-167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/icon/app/icon-180.png" />

        {/* Prevent old cached icon from winning */}
        <meta name="apple-mobile-web-app-title" content="chaosmusings.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}