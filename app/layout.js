export const metadata = {
  title: "CHAOS MUSINGS",
  description: "Tell No Lies.",
  themeColor: "#d9c3b3",
  icons: {
    apple: [
      { url: "/ui/app/icon-120.png", sizes: "120x120" },
      { url: "/ui/app/icon-167.png", sizes: "167x167" },
      { url: "/ui/app/icon-180.png", sizes: "180x180" }
    ],
    icon: "/ui/app/icon-180.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
