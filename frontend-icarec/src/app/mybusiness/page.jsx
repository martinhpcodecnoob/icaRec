import React from 'react'
import MyBusiness from './MyBusiness'

export async function getServicesB() {
    let urlID = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getAllBusinessServices`
    try {
        const response = await fetch(urlID,{next:{revalidate:2}})
        const services = response.json()
        return services
    } catch (error) {
        return error
    }
}

export default async function page() {
    const dataServices = await getServicesB()
    return (
        <div>
            <MyBusiness servicess={dataServices.services}/>
        </div>
    )
}
