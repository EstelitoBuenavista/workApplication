import "./globals.css";

export const metadata = {
  title: "Programming Test 1",
  description: "Simple survey application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
