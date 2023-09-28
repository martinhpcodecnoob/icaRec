
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
  metadataBase: new URL('https://www.kuskana.com/'),
  title: "Kuskana",
    twitter:{
      card: 'summary_large_image',
    },
    openGraph: {
      title:"Kuskana",
      description:"Somos un Directorio de Negocios",
      siteName:"Kuskana",
      url:"https://www.kuskana.com/",
      images: [
        {
          url:"https://res.cloudinary.com/dl6jys7s8/image/upload/v1695918061/MetadataImages/Frame2_1_nr3ea8.png",
          width:800,
          height:600
        }
      ],
      type: 'website',
    },
  }

// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params
//   // const id = params.id
 
//   // fetch data
//   // const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []
 
//   return {
//     title: "Tiendas E",
//     twitter:{
//       card: 'summary_large_image',
//     },
//     openGraph: {
//       title:"Tiendas E",
//       description:"Somos un tienda de Negocios",
//       siteName:"Tiendas E`",
//       url:"https://ica-rec.vercel.app/",
//       images: [
//         {
//           url:"https://res.cloudinary.com/dl6jys7s8/image/upload/v1692326894/MartinHernandezPe%C3%B1a/Hughenst/eek3pnee5nxro0q4otd7.png",
//           width:800,
//           height:600
//         }
//       ],
//       type: 'website',
//     },
//   }
// }


export default async function RootLayout({ children }) {

  return (
    <html lang="es">
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
        {/* <Script
          id="Adsense-id"
          data-ad-client={GOOGLE_ADS_ID}
          async="true"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        /> */}
      </head>
          <ProvidersRedux>
            <body className={`${raleway.className} bg-[#FFF8EE]`}>
              <NextAuthProvider>
                  {children}
              </NextAuthProvider>
            </body>
          </ProvidersRedux>
    </html>
  )
}
