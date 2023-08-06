'use client'
import { SessionProvider } from "next-auth/react";
import './globals.css'
import { Raleway } from 'next/font/google'
import Script from "next/script";
import ProvidersRedux from "@/redux/provider";

const raleway = Raleway({ subsets: ['latin'] })

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        <head>
          <Script
            strategy='beforeInteractive'
            src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=Function.prototype`}
            // Este script tiene un API_KEY pero el ultimo es una funcion pero puede ser cualquier funciona que pongas
          />
        </head>
          <ProvidersRedux>
            <body className={raleway.className}>
              <SessionProvider>
                {children}
              </SessionProvider>
            </body>
          </ProvidersRedux>
    </html>
  )
}
