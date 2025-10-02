import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchProvider } from "./context/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Bazar",
  description: "Your one-stop e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SearchProvider>
            <Navbar />   {/* ✅ Navbar at top */}
            <main>{children}</main>
            <Footer />   {/* ✅ Footer at bottom */}
          </SearchProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
