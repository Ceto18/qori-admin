// src/app/layout.tsx
import { Outfit } from "next/font/google";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import { ThemeProvider } from "@/shared/context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Qori Admin",
  description: "Panel administrativo Qori",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}