import "./global.css";

export const metadata = {
  title: "Tell No Lies",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon-nude-v2.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
