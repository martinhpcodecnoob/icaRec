import { data } from "autoprefixer"

const cloudname = process.env.NEXT_PUBLIC_CLOUDNAME
export const signResponseCloudinary = (nameComplete,bussinessFolder) => {
    // console.log(`${nameComplete}/${bussinessFolder} y ${cloudname}`);
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/cloudinary/signuploadform`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            nameCloud:cloudname,
            nameComplete:nameComplete,
            bussinessFolder:bussinessFolder
        })
    })
    .then((response) => response.json())
    .then((data) => data)
}

export function getAllBusinessOpcion1(){
        return fetch(`http://localhost:3004/api/business/getAllBusiness`)
                    .then((response) => {
                        return response.json()
                    })
                    .then(data => data)
  }