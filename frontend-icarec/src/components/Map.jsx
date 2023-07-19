'use client'
import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const Map = () => {
  const containerStyle = {
      width: '100%',
      height: '10.77rem',
      borderRadius:'0.375rem'
    }
    const [userLocation, setUserLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null)
    const [zoneName, setZoneName] = useState('')
    const [zoneError, setZoneError] = useState(false)

    const handleMarkerDrag = (event) => {
    setMarkerPosition(event.latLng)
}

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        setMarkerPosition({ lat: latitude, lng: longitude })
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error)
      }
    );
  } else {
    console.error('Geolocalización no soportada')
  }
}, [])

useEffect(() => {
    if (markerPosition) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === 'OK') {
          console.log(results)
          if (results[0]) {
            setZoneName(results[3].formatted_address)
            setZoneError(false)
          } else {
            setZoneName('Nombre de zona no disponible')
            setZoneError(true)
          }
        } else {
          setZoneName('Error al obtener el nombre de la zona')
          setZoneError(true)
        }
      })
    }
  }, [markerPosition])
  
    return (
      <div className='z-1'>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || markerPosition || { lat: -14, lng: -79 }}
            zoom={7}
            onClick={(event) => setMarkerPosition(event.latLng)}
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                onDrag={handleMarkerDrag}
                options={{
                    icon: {
                      path: globalThis.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                      fillColor: 'green', 
                      fillOpacity: 1,
                      strokeWeight: 0,
                      scale: 7,
                    },
                  }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    )
}


export default Map