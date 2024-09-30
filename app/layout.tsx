"use client"

import NavApp from '@/components/NavApp';
import { DataProvider } from '@/context/DataContext';
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from '@vercel/analytics/react';
import './globals.css';



export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body className="max-w-[1500px]  w-full px-4 bg-white mx-auto ">
        <NextUIProvider>
          <NavApp />
          <DataProvider>
            <main className="main-layout w-full">

              {children}

            </main>
          </DataProvider>
        </NextUIProvider>
      </body>
      <Analytics />
    </html>
  );
}
