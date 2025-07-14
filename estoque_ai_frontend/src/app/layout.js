import "./globals.css";

export const metadata = {
  title: "Estoque_ai",
  description: "Um aplicativo para gerenciamento de materiais de escritório",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
