'use client'
import { guardarNombre } from "@/redux/Slices/slicePreview"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function page() {
    const miNombre = useSelector(state => state.maps.nombre)
    const [newnombre, setNewnombre] = useState(miNombre)
    const dispatch = useDispatch()
    useEffect(() => {
        setNewnombre("Giovanni")
    }, [newnombre])
    

    const modificar = () => {
        dispatch(guardarNombre(newnombre))
    }
  return (
    <div className="flex flex-col">
        Nombre:{miNombre}
        <button className="bg-blue-600" onClick={modificar}>Cambiar</button>
    </div>
  )
}
