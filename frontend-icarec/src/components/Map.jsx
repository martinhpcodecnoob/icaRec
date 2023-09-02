'use client'

import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import { saveLoaction } from '@/redux/Slices/slicePreview'

const Map = ({latProp, longProp, view}) => {

  const containerStyle = {
    width: '100%',
    height: '10.77rem',
    borderRadius:'0.375rem'
  }

  const dispatch = useDispatch()
  const [userLocation, setUserLocation] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)
  const [showWarning, setShowWarning] = useState(false)
  const [permissionRequested, setPermissionRequested] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const handleMarkerDrag = (event) => {
    const { latLng } = event
    const lat = latLng.lat()
    const lng = latLng.lng()
    setMarkerPosition({ lat, lng })
    dispatch(saveLoaction({
      latitude:lat,
      longitude:lng
    }))
  }
  if(showWarning){
    console.log("sw: ", showWarning)
  }
  const handleMarkerPositionChanged = () => {
    const lat = markerPosition.lat
    const lng = markerPosition.lng
    dispatch(saveLoaction({
      latitude:lat,
      longitude:lng
    }))
  }

  const handleMarkeyClic = (event) =>{
    if (view) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
    } else{
      console.log("Bloquedo")
    }
  }

  useEffect(() => {
      setIsLoaded(true)
      if (navigator.geolocation) {
        setShowWarning(false)
        if (latProp && longProp) {
          setUserLocation({ lat: latProp, lng: longProp })
          setMarkerPosition({ lat: latProp, lng: longProp })
        }else{
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setShowWarning(false)
              const { latitude, longitude } = position.coords
              setUserLocation({ lat: latitude, lng: longitude })
              setMarkerPosition({ lat: latitude, lng: longitude })
            },
            (error) => {
              //Definir el tipo de error, si es un error de bloqueo por geoloc, proceder con el warning
              setShowWarning(true)
              console.error('Error al obtener la ubicación:', error)
            }
          )
        }
      } else {
        //Probablemente el warning tambien se ponga aqui
        setShowWarning(true)
        console.error('Geolocalización no soportada')
      }
  }, [latProp, longProp])
  
  if (!isLoaded) {
    return (
      <div className='flex justify-center m-12'>
        <div role="status">
          <svg aria-hidden="true" className="inline w-16 h-16 mr-4 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (showWarning === true) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <div className="w-full h-10.77rem rounded-md flex flex-col items-center justify-center m-4">
          <p className="text-gray-600 dark:text-gray-400">
            No se puede acceder a la geolocalización. Activa el permiso para usar el mapa. Para obtener instrucciones sobre cómo hacerlo, puedes visitar{' '}
            <a
              href="https://support.google.com/chrome/answer/142065?hl=es-419&co=GENIE.Platform%3DAndroid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              esta página
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='z-1'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || markerPosition || { lat: -14, lng: -79 }}
          zoom={7}
          onClick={handleMarkeyClic}
        >
          {markerPosition && (
            <Marker
              position={markerPosition}
              draggable={view}
              onDrag={handleMarkerDrag}
              onPositionChanged={handleMarkerPositionChanged}
              options={{
                  icon: {
                    path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: 'green', 
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 8,
                  },
                }}
            />
          )}
        </GoogleMap>
    </div>
  )
}

export default Map