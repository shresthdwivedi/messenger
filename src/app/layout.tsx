import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "Messenger",
  description: "By Shresth Dwivedi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <main>
              {children}
          </main>
        <Toaster position="top-right"/>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
