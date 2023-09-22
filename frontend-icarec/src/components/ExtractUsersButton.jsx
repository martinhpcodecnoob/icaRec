import React, {useState} from 'react'
import { extractUsers } from '../../utils/apiBackend'
import { toast } from 'react-toastify'

import * as XLSX from "xlsx";

import 'react-toastify/dist/ReactToastify.css'

const ExtractUsersButton = ({userId, accessToken}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const onClickExtractUsers = async () => {
      const extractUsersResponse =  await extractUsers(userId, accessToken)
      if(extractUsersResponse.status === 200){
       console.log("Datos de los Users: ", extractUsersResponse.data)
       const usersData = Array.isArray(extractUsersResponse.data.users) ? extractUsersResponse.data.users : [extractUsersResponse.data.users]
       console.log("userdat: ", usersData)
       const workbook = XLSX.utils.book_new()
       const data = [
         ["ID", "Nombre", "Celular", "DNI", "Email", "Sexo", "Roles", "Fecha de Creación"],
       ]
       usersData.forEach((user) => {
         data.push([
           user._id,
           user.name,
           user.cellphone || "",
           user.dni || "",
           user.email || "",
           user.sex || "",
           user.role.join(", ") || "",
           user.userCreationDate || "",
         ])
       })
  
       const worksheet = XLSX.utils.aoa_to_sheet(data)
  
       XLSX.utils.book_append_sheet(workbook, worksheet, "MiHoja")
  
       XLSX.writeFile(workbook, "MiArchivo.xlsx")
       toast.success('Usuarios extraidos exitosamente.', {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 3000,
       })
      }else if(extractUsersResponse.status === 401 || extractUsersResponse.status === 403){
       toast.error('Solo los administradores pueden acceder a este recurso', {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 3000,
       })
       setIsButtonDisabled(false)
      }
    }

  return (
    <button 
      className='text-[1rem] focus:outline-none text-white font-bold bg-[#319e2d] rounded-lg text-sm px-3 py-2.5'
      disabled={isButtonDisabled}
      onClick={onClickExtractUsers}
    >
      Extraer Usuarios
    </button>
  )
}

export default ExtractUsersButton