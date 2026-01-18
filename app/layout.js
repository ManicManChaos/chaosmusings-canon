import "./globals.css";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Manic Musings of Chaos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
