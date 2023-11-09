'use client'

import React from "react";
import BusinessCard from "./BusinessCard";

const BusinessList = () => {
  const businessArray = [
    {
      "_id": "6500b0891463f2a1adcaa2fa",
      "business_name": "Hughenet",
      "business_location": "Fonavi la Angostura",
      "location_coordinates": {
        "latitude": "-14.036349425928938",
        "longitude": "-75.71722754489909"
      },
      "description": "Nuestra empresa de servicios de internet es un proveedor líder en conectividad de alta velocidad y soluciones digitales. Nos especializamos en ofrecer acceso a la web rápido y confiable, así como servicios adicionales como telefonía VoIP y televisión por internet. Nuestra misión es mantener a nuestros clientes conectados en un mundo cada vez más digital, brindando un servicio de alta calidad y atención al cliente excepcional. Ya sea para uso doméstico o empresarial, estamos comprometidos en satisfacer las necesidades de conectividad de nuestros clientes y brindarles una experiencia en línea inigualable.",
      "cellphone": "956005311",
      "facebook": "https://www.facebook.com",
      "website": "https://www.miweb.com",
      "schedule": "De lunes a viernes",
      "services": [
        "Servicio de internet",
        "internet satelital"
      ],
      "images": [
        {
          "url_cloudinary": "http://res.cloudinary.com/dl6jys7s8/image/upload/v1694544010/MartinHernandezPe%C3%B1a/Hughenet/dq9lr2u9tyebfpdo1acr.jpg",
          "public_id": "MartinHernandezPeña/Hughenet/dq9lr2u9tyebfpdo1acr",
          "_id": {
            "$oid": "6500b0891463f2a1adcaa2fb"
          }
        },
        {
          "url_cloudinary": "http://res.cloudinary.com/dl6jys7s8/image/upload/v1694544010/MartinHernandezPe%C3%B1a/Hughenet/ioitkcstmgvbjgwbmzzy.jpg",
          "public_id": "MartinHernandezPeña/Hughenet/ioitkcstmgvbjgwbmzzy",
          "_id": {
            "$oid": "6500b0891463f2a1adcaa2fc"
          }
        }
      ],
      "owner": {
        "$oid": "64ffe13029cf9252834e5725"
      },
    },
    {
      "_id": "65015049901acf17b5c3267b",
      "business_name": "Café del Amanecer",
      "business_location": "Av.Nueva 123",
      "location_coordinates": {
        "latitude": "-12.151199893316608",
        "longitude": "-76.97791884235066"
      },
      "description": "En nuestra pastelería, nos dedicamos a crear momentos dulces y memorables a través de una deliciosa variedad de pasteles, postres y repostería de alta calidad. Nuestros talentosos pasteleros artesanales preparan cada dulce con amor y cuidado, utilizando ingredientes frescos y de primera calidad. Ya sea que estés buscando un pastel personalizado para una ocasión especial, galletas recién horneadas para acompañar tu café o una selección de pasteles para endulzar tu día, en nuestra pastelería encontrarás una experiencia de sabor única. Ven y disfruta de un rincón de dulzura en cada bocado, donde la pasión por la repostería se fusiona con la excelencia en cada creación.",
      "cellphone": "555123456",
      "facebook": "https://www.facebook.com/CafeAmanecer",
      "website": "https:// http://www.cafedelamanecer.com",
      "schedule": "De lunes a viernes, de 7:00 AM a 6:00 PM",
      "services": [
        "Café gourmet",
        "Pasteles caseros",
        "desayuno"
      ],
      "images": [
        {
          "url_cloudinary": "http://res.cloudinary.com/dl6jys7s8/image/upload/v1694584904/JulioCastroAlejos/Caf%C3%A9%20del%20Amanecer/xswvgaw2uzpe5w91vcej.jpg",
          "public_id": "JulioCastroAlejos/Café del Amanecer/xswvgaw2uzpe5w91vcej",
          "_id": {
            "$oid": "65015049901acf17b5c3267c"
          }
        },
        {
          "url_cloudinary": "http://res.cloudinary.com/dl6jys7s8/image/upload/v1694584904/JulioCastroAlejos/Caf%C3%A9%20del%20Amanecer/gttzempp44t6j9y7h4ul.jpg",
          "public_id": "JulioCastroAlejos/Café del Amanecer/gttzempp44t6j9y7h4ul",
          "_id": {
            "$oid": "65015049901acf17b5c3267d"
          }
        }
      ],
      "owner": "650126209cfdcda762d95dab",
    }
  ];
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {businessArray.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
};

export default BusinessList;
