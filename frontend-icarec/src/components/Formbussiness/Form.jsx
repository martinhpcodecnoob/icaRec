'use client'
import React, { useEffect, useState } from "react";
import Map from '../../components/Map'
import { IoIosAddCircle } from "react-icons/io";
import EtiquetasScroll from "./EtiquetasScroll";
import { saveFormPreview, saveLimitMessage } from "@/redux/Slices/slicePreview";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopServicesTwo from "../Modals/PopServicesTwo";

export default function Form() {
    const initialValues = {
        name_business:"",
        geo_business:"",
        description:"",
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
    const toastError ={
        name_business:"No superar los 50 caracteres",
        geo_business:"No superar los 100 caracteres",
        description:"No superar los 500 caracteres",
        cellphone:"Debe ser un numero o no mas de 9 caracteres",
        schedule:"No debe superar los 100 caracteres",
        addServices:"El servicio supera los 40 caracteres",
        services:"No superar los 10 servicios"
    }
    const inputService =""

    const [input, setInput] = useState(initialValues)
    const [addService, setAddService] = useState(inputService)
    const [compareInput, setCompareInput] = useState(false)
    const [refInputServices, setRefInputServices] = useState(null)
    const [visible, setVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([])
    const dispatch = useDispatch()
    const newImagesRedux = useSelector(state => state.preview.inputForm.images)
    const servicesReduxForm = useSelector(state => state.landing.services)
    const inputRedux = useSelector(state => state.preview.inputForm)

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

    useEffect(() => {
        if (Object.keys(inputRedux).length !== 0) {
            // console.log("Este es el input", JSON.stringify(input));
            // console.log("Este es el inputRedux", JSON.stringify(inputRedux));
            if (input !== inputRedux) {
                setCompareInput(input !== inputRedux)
                dispatch(saveFormPreview(input))
                return
            }
        }
        setCompareInput(true)
    }, [compareInput,addService])
    
    const showPopover = () => {
        setVisible(true);
    }
    const hidePopover = () => {
        setVisible(false);
    };
    const handleUrlBlur = (e) => {
        if (e.target.name === 'name_web' || e.target.name === 'facebook') {
            let url = input[e.target.name]
            if (url.trim() !== '' && !url.startsWith('http://') && !url.startsWith('https://')) {
                setInput({
                    ...input,
                    [e.target.name]:`https://${e.target.value}`
                })
            }
        }
    }

    const handleInputService = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        if (value.length <= 45) {
            setAddService(value)
            if (servicesReduxForm.length > 0) {
                const filteredSuggestions = servicesReduxForm.filter(word =>
                    word.toLowerCase().includes(value.toLowerCase()) && word.toLowerCase() !== value.toLowerCase() || word.toLowerCase() === value.toLowerCase()
                )
                setSuggestions(filteredSuggestions)
            }
            showPopover()
        }else{
            toast.error(toastError.addServices)
        }
    }
    const handleImputChange = (e) =>{
        e.preventDefault()
        const {name,value} = e.target
        if (name==='name_business' && value.length <= 50) {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }

        if (name === 'geo_business' && value.length <= 100) {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }

        if (name === 'description' && value.length <= 500) {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }

        if (name === 'cellphone' && /^[0-9]+$/.test(value) && value.length <= 9 || value==="") {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }

        if (name === 'facebook' || name === 'name_web') {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }

        if (name === 'schedule' && value.length <= 100) {
            setInput((prevState) => ({
                ...prevState,
                [name]: value
            }))
            setCompareInput(false)
            return
        }
        toast.error(toastError[name])
    }

    const handleAddService = () => {
        if (input.list_service.length < 10) {
            input.list_service.push(addService)
            const service = input.list_service
            setInput({
                ...input,
                ["list_service"]:service
            })
            setAddService("")
        }else{
            toast.error(toastError.services,{delay:3000})
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files
        console.log(file);

        if (file.length < 1) {
            dispatch(saveLimitMessage("No has subido ni una imagen"))
            return
        }

        if (file.length > 0) {
                if (file[0].size >= 1572864) {
                    dispatch(saveLimitMessage("La imagen solo debe pesar menos de 1.5 megabytes"))
                    return
                }
        }
        
        if (input.images) {
            if (input.images.length >= 3) {
                dispatch(saveLimitMessage('El limite es hasta 3 imagenes'))
                return
            }
        }

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
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(saveFormPreview(input))
    }

    return (
        <>
        <div className="flex font-bold justify-center text-center text-[1rem] text-[#100E80] bg-[#f3ba1a] mb-3 rounded-lg">¡QUE CONOZCAN TU NEGOCIO!</div>
        <form onChange={handleSubmit} onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="name_business"
                    id="name_business"
                    value={input.name_business}
                    onChange={handleImputChange}
                    // onBlur={handleSubmit}
                    className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                />
                <label
                    htmlFor="name_business"
                    className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    autoComplete="off"
                />
                <label
                    htmlFor="geo_business"
                    className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Ubicacion del Negocio
                </label>
                <div className={`mt-3 w-full h-[11rem] border-2 border-gray-300 rounded-md`}>
                    <Map view={true}/>
                </div>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={input.description}
                    onChange={handleImputChange}
                    className="block py-2.5 pl-2 px-0 w-full h-auto text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer scrolbar"
                    placeholder=" "
                    autoComplete="off"
                />
                <label
                    htmlFor="description"
                    className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Descripcion
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 smartphone:grid-cols-2 smartphone:gap-6">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="cellphone"
                        id="cellphone"
                        value={input.cellphone}
                        onChange={handleImputChange}
                        className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                    />
                    <label
                        htmlFor="cellphone"
                        className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Celular
                    </label>
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="url"
                        name="facebook"
                        id="facebook"
                        value={input.facebook}
                        onChange={handleImputChange}
                        onBlur={handleUrlBlur}
                        className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                    />
                    <label
                        htmlFor="facebook"
                        className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Facebook
                    </label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="url"
                    name="name_web"
                    id="name_web"
                    value={input.name_web}
                    onChange={handleImputChange}
                    onBlur={handleUrlBlur}
                    className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                />
                <label
                    htmlFor="name_web"
                    className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                />
                <label
                    htmlFor="name_web"
                    className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Horario
                </label>
            </div>
            <div className="relative w-full mb-3 group">
                <PopServicesTwo
                    inputValue={addService}
                    setInputValue={setAddService}
                    referenceElement={refInputServices}
                    suggestions={suggestions}
                    showPopover={showPopover}
                    hidePopover={hidePopover}
                    visible={visible}
                >
                    <input
                        ref={setRefInputServices}
                        type="text"
                        name="list_service"
                        id="list_service"
                        value={addService}
                        onChange={handleInputService}
                        onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleAddService()
                                }
                            }
                        }
                        className="block py-2.5 px-0 w-full h-9 text-sm text-gray-900 bg-[#f3ba1a] border-0 rounded-[1rem] border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                        onClick={showPopover} onMouseLeave={hidePopover}
                    />
                    <label
                        htmlFor="list_service"
                        className="left-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Servicios
                    </label>
                </PopServicesTwo>
                <button type="button" className="absolute left-[91%] top-2" onClick={handleAddService}>
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
                    className="w-8 h-9 mb-4 text-gray-500 dark:text-gray-400 absolute left-3 top-4"
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
                        PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                </div>
                <input 
                    onChange={handleFileChange}
                    id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <div className="flex items-center justify-center mt-2">
                <button
                    type="submit"
                    className="text-[#100E80] bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => toast.success("Actualizado",{autoClose:2000})}
                >
                ACTUALIZAR
                </button>
            </div>
        </form>
        <ToastContainer position="top-center" theme="light"/>
        </>
    );
}
