import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./provider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], 
  style: ["normal", "italic"], 
  display: "swap", 
});

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
      <body className={roboto.className}>
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
