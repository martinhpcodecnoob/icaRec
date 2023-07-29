'use client'
import BusinessSubComponent from '@/components/BusinessSubComponent'
import React from 'react'

const IndexPage = () => {
  const title = 'Título del componente'
  const whatsapp = '123456789'
  const horario = 'Lunes a Viernes, 9AM-5PM'
  const webMedia = {"webPage": ["pagina web"], "Facebook": ["pagina de facebook"]}
  const servicios = ['S1', 'Sv2', 'ci3', 'Sevi4', 'Sevico5', 'Servicio 6']
  const ruc = '1234567890'
  return (
    <div>
      <BusinessSubComponent
        componentType="view"
        businessName={title}
        whatsappNumber={whatsapp}
        schedule={horario}
        webMedia={webMedia}
        services={servicios}
        ruc={ruc}
      />
    </div>
  )
}

export default IndexPage