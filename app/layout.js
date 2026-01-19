import "./globals.css";

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon/app/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/app/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/icon/app/icon-180.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
