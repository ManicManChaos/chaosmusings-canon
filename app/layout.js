// app/layout.js
import "./global.css";

export const metadata = {
  title: "Chaos Musings",
  description: "Manic Musings of Chaos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
