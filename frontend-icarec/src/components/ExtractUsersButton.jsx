import React, {useState} from 'react'
import { extractUsers } from '../../utils/apiBackend'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/*  import ReactExport from 'react-export-excel'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;  */

const ExtractUsersButton = ({userId, accessToken}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const onClickExtractUsers = async () => {

       const extractUsersResponse =  await extractUsers(userId, accessToken)

       if(extractUsersResponse.status === 200){
        console.log("Datos de los Users: ", extractUsersResponse.data)
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
      className=''
      disabled={isButtonDisabled}
      onClick={onClickExtractUsers}
    >
      Extraer Usuarios
    </button>
  )
}

export default ExtractUsersButton