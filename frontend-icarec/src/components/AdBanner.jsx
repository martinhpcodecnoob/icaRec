'use client'

import { useEffect } from 'react'

const AdBanner = (props) => {
    /* useEffect(() => {
        if (typeof window !== 'undefined') {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (err) {
            console.log(err)
          }
        }
      }, [])
 */
  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      {...props}
    />
  )
}
export default AdBanner