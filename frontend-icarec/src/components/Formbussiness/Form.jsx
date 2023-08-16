'use client'
import React, { useEffect, useState } from "react";
import Map from '../../components/Map'
import { IoIosAddCircle } from "react-icons/io";
import EtiquetasScroll from "./EtiquetasScroll";
import { saveFormPreview } from "@/redux/Slices/slicePreview";
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
    const initialValues = {
        name_business:"",
        geo_business:"",
        ruc:"",
        cellphone:"",
        facebook:"",
        name_web:"",
        list_service:[],
        images:[],
        schedule:"",
        location:{
            lat:"",
            long:""
        }
    }
    const inputService =""

    const [input, setInput] = useState(initialValues)
    const [addService, setAddService] = useState(inputService)
    const dispatch = useDispatch()
    const newImagesRedux = useSelector(state => state.preview.inputForm.images)
    useEffect(() => {
        if (newImagesRedux) {
            if (newImagesRedux.length >= 0) {
                setInput({
                    ...input,
                    ["images"]:[...newImagesRedux]
                }) 
            }
        }
    }, [newImagesRedux])
    

    const handleInputService = (e) => {
        e.preventDefault()
        setAddService(e.target.value)
    }
    const handleImputChange = (e) =>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleAddService = () => {
        input.list_service.push(addService)
        const service = input.list_service
        setInput({
            ...input,
            ["list_service"]:service
        })
        setAddService("")
    }

    const handleFileChange = (e) => {
        const file = e.target.files
        console.log(file);
        if (file.length > 0) {
            const fileURL = URL.createObjectURL(file[0])
            const objImages = {
                fileURL: fileURL,
                url_cloudinary:"",
                public_id: ""
            }
            input.images.push(objImages)
            const currentFile = input.images
            setInput({
                ...input,
                ["images"]:currentFile
            })   
        }
        // console.log(URL.createObjectURL(file[0]));
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(input);
        dispatch(saveFormPreview(input))
    }
    return (
        <>
        <div className="flex justify-center">CREAR MI NEGOCIO</div>
        <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="name_business"
                    id="name_business"
                    value={input.name_business}
                    onChange={handleImputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="name_business"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Nombre del Negocio
                </label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="geo_business"
                    id="geo_business"
                    value={input.geo_business}
                    onChange={handleImputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="geo_business"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Ubicacion del Negocio
                </label>
                <div className={`mt-3 w-full h-[11rem] border-2 border-gray-300 rounded-md`}>
                    <Map view={true}/>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 smartphone:grid-cols-2 smartphone:gap-6">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="ruc"
                        id="ruc"
                        value={input.ruc}
                        onChange={handleImputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="ruc"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        RUC
                    </label>
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="cellphone"
                        id="cellphone"
                        value={input.cellphone}
                        onChange={handleImputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="cellphone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Celular
                    </label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="url"
                    name="facebook"
                    id="facebook"
                    value={input.facebook}
                    onChange={handleImputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="facebook"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Facebook
                </label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="url"
                    name="name_web"
                    id="name_web"
                    value={input.name_web}
                    onChange={handleImputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="name_web"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Pagina Web
                </label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="schedule"
                    id="schedule"
                    value={input.schedule}
                    onChange={handleImputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="name_web"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Horario
                </label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="list_service"
                    id="list_service"
                    value={addService}
                    onChange={handleInputService}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="list_service"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Servicios
                </label>
                <button type="button" className="absolute left-[94%] top-4" onClick={handleAddService}>
                    <IoIosAddCircle className="text-[1.4rem] text-gray-500"/>
                </button>
            </div>
            <div className="scrolbar w-[100%] h-[5rem] p-2 border border-gray-400 rounded-xl mb-2 overflow-x-auto">
                <EtiquetasScroll input={input} setInput={setInput}/>
            </div>

            <div className="flex items-center justify-center w-full relative">
                <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center w-full sm:h-[4rem] smartphone:h-[4rem]  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                <div className="flex items-center justify-center pt-5 pb-6">
                    <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 absolute left-3 top-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                    </svg>
                    <div className="flex flex-col">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Sube Fotos</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                </div>
                <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <div className="flex items-center justify-center mt-2">
                <button
                type="submit"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Previsualizar
                </button>
            </div>
        </form>
        </>
    );
}
