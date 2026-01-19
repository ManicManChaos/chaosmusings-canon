import "./globals.css";

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        url: "/icon/app/icon-120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        url: "/icon/app/icon-167.png",
        sizes: "167x167",
        type: "image/png"
      },
      {
        url: "/icon/app/icon-180.png",
        sizes: "180x180",
        type: "image/png"
      }
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
