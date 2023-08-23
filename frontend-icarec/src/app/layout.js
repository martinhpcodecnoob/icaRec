
import './globals.css'
import { Raleway } from 'next/font/google'
import Script from "next/script";
import ProvidersRedux from "@/redux/provider";
import { NextAuthProvider } from "@/components/SesionProvider";
 
const raleway = Raleway({ subsets: ['latin'] })

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID

export const metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
 
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <Script
          strategy='beforeInteractive'
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=Function.prototype`}
          // Este script tiene un API_KEY pero el ultimo es una funcion pero puede ser cualquier funciona que pongas
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          id="google-analytics1"
        />
        <Script id="google-analytics2">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <Script
          id="Adsense-id"
          data-ad-client={GOOGLE_ADS_ID}
          async="true"
          strategy="beforeInteractive"
           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      </head>
 
          <ProvidersRedux>
            <body className={raleway.className}>
              <NextAuthProvider>
                {children}
              </NextAuthProvider>
            </body>
          </ProvidersRedux>
    </html>
  )
}
