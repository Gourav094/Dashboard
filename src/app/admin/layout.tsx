import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import SideNav from "@/components/dashboard/SideNav";

const inter = Inter({ subsets: ["latin"],variable:"--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={cn(
        "min-h-screen bg-background font-sans flex",
        inter.variable
      )}>
        
        <div className="w-full md:w-64 border-r">
            <SideNav/>
        </div>
        <div className="p-6 md:p-8 md:overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
  );
}
