import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SaaS Starter Code",
  description: "A starter codebase for SaaS applications",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminPanelLayout>
        <Navbar />
        {children}
        </AdminPanelLayout>
        
      
      </body>
    </html>
  );
}
