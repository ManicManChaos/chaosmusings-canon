import "./global.css";

export const metadata = {
  title: "Chaos Musings",
  description: "Manic Musings of Chaos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* iPad-focused icons (from /public/icon/app/) */}
        <link rel="apple-touch-icon" sizes="120x120" href="/icon/app/icon-120.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon/app/icon-167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/app/icon-180.png" />

        {/* Basic viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
