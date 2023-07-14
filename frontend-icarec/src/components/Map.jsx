'use client'
import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const containerStyle = {
    width: '40%',
    height: '500px',
    border: '1px solid black',
  }

const Map = () => {
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
            setZoneName(results[0].formatted_address)
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
      <div className='flex flex-col items-center p-2'>
        <p>User Loc:{JSON.stringify(userLocation)}</p>
        {markerPosition ? (
        <div className='p-4'>
          {zoneError ? (
            <p>Error al obtener el nombre de la zona</p>
          ) : (
            <p>
              <span className="font-bold text-lg">Ubicación:</span> {zoneName}
            </p>
          )}
        </div>
        ) : (
          <p className='p-4'>
            <span className="font-bold text-lg">Ubicación:</span> Seleccione una ubicación en el mapa con clic izquierdo
          </p>
        )}
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || markerPosition || { lat: -14, lng: -79 }}
            zoom={4}
            onClick={(event) => setMarkerPosition(event.latLng)}
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                onDrag={handleMarkerDrag}
                options={{
                    icon: {
                      path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
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