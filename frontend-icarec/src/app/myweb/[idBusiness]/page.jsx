import MyWeb from "./MyWeb";

export async function getIdBusiness(idBusiness){
    let urlID = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getIdBusiness/${idBusiness}`
    try {
        const response = await fetch(urlID)
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
