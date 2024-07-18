import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/customer/Navbar";

const inter = Inter({ subsets: ["latin"],variable:"--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={cn(
        "min-h-screen bg-background font-sans",
        inter.variable
      )}>
        
        <Navbar/>
        <div className="md:p-3 p-6 md:overflow-y-auto bg-violet-100 min-h-screen">
          {children}
        </div>
      </div>
  );
}