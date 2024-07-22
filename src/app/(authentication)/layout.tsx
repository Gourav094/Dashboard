import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"],variable:"--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={cn(
        "min-h-screen min-w-screen bg-background font-sans flex",
        inter.variable
      )}>
        {children}
      </div>
  );
}
