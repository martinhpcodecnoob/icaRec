import MyWeb from "./MyWeb";

export async function generateMetadata({ params }) {
    // read route params
    const {idBusiness} = params

    // fetch data
    const singleBusiness = await getIdBusiness(idBusiness)
    const singleBusinessTwo = await singleBusiness.business
    return {
    title: singleBusinessTwo.business_name,
    keywords:singleBusinessTwo.services,
    twitter:{
        card:'summary_large_image'
    },
    openGraph: {
        title: singleBusinessTwo.business_name,
        description: singleBusinessTwo.description,
        siteName:'Kuskana',
        url:`${process.env.NEXT_PUBLIC_URL}/myweb/${idBusiness}`,
        images:singleBusinessTwo.images.length > 0 ? singleBusinessTwo.images?.map((img) => {
            return{
                url:img.url_cloudinary,
                width:800,
                height:600
            }
        }) : 'https://res.cloudinary.com/dl6jys7s8/image/upload/v1696291496/MetadataImages/material-oficina_sxhoxl.jpg',
        type:'website',
    },
    }
}

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


