export const viewport = {
  themeColor: "#d9c3b3"
};

export const metadata = {
  title: "TELL NO LIES",
  description: "Chaos Musings"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
