import MyBusiness from "../MyBusiness"
import { getServicesB } from "../page"

export async function getIdBusiness(idBusiness){
    let urlID = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getIdBusiness/${idBusiness}`
    try {
        const response = await fetch(urlID, {next:{revalidate:2}})
        return response.json()
    } catch (error) {
        return error
    }
}

export default async function page({params}) {
    const {idBusiness} = params
    const dataIdBusiness = await getIdBusiness(idBusiness)
    const {business} = dataIdBusiness
    const formatDataIdBusiness = {
        name_business:business.business_name,
        geo_business:business.business_location,
        description:business.description,
        cellphone:business.cellphone,
        facebook:business.facebook,
        name_web:business.website,
        list_service:business.services,
        images:business.images.map( img => {
            return {
                fileURL:'',
                url_cloudinary:img.url_cloudinary,
                public_id:img.public_id
            }
        }),
        schedule:business.schedule,
        location:{
            lat:+business.location_coordinates.latitude,
            long:+business.location_coordinates.longitude
        }
    }
    const servicesB = await getServicesB()
    return (
        <div>
            <MyBusiness 
                servicess={servicesB.services} 
                formatDataIdBusiness={formatDataIdBusiness} 
                userIDBusiness={business.owner}
                businessID={business._id}
            />
        </div>
    )
}

// export async function generateStaticParams(context){
//     console.log("Estye es el context: ",context);
//     // const dataIdBusiness = await getIdBusiness()
//     // try {
//     //     return {
//     //         idBusiness:dataIdBusiness.business.owner
//     //     }
//     // } catch (error) {
//     //     return error
//     // }
// }
