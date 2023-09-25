import MyWeb from "./MyWeb";

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
    const idBusinessExtract = await getIdBusiness(idBusiness)
    return (
        <div>
            <MyWeb myBusiness={idBusinessExtract.business}/>
        </div>
    )
}

export async function generateStaticParams(){
    let urlID = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getTotalIdsBusiness`
    try {
        const response = await fetch(urlID)
        const idsBusinessResponse =await response.json()
        return idsBusinessResponse.idsBusiness.map(id => (
            {
                idBusiness:id
            }
        ))
    } catch (error) {
        return error
    }
}


