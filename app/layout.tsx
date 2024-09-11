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
      <body className="">
        <NextUIProvider>
          <NavApp />
          <DataProvider>
            <main className='mb-7 flex px-3 md:px-10 lg:px-20 flex justify-center'>
              <div>
                {children}
              </div>
            </main>
          </DataProvider>
        </NextUIProvider>
      </body>
      <Analytics />
    </html>
  );
}
