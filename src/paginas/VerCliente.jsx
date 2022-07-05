import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

const VerCliente = () => {
    const {id} = useParams()
    const [cliente,setCliente] = useState({})
    const [cargando,setCargando] = useState(true)

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI = async() =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(typeof error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    }, [])

  return (
    Object.keys(cliente).length === 0 ?<p>No hay Resultado</p>:(
    <div>
        {cargando ? 'cargando...': (
            <>
            <h1 className="uppercase font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
            <p className="mt-3">Informacion del cliente</p>

            <p className="uppercase text-2xl mt-4 text-gray-700"><label className="font-bold text-gray-800">Cliente:</label> {cliente.nombre}</p>
            {cliente.email &&(
                <p className="uppercase text-2xl mt-4 text-gray-700"><label className="font-bold text-gray-800">Email:</label> {cliente.email}</p>
            )}
            {cliente.telefono &&(
                <p className="uppercase text-2xl mt-4 text-gray-700"><label className="font-bold text-gray-800">Telefono:</label> {cliente.telefono}</p>
            )}

            <p className="uppercase text-2xl mt-4 text-gray-700"><label className="font-bold text-gray-800">Empresa:</label> {cliente.empresa}</p>
            {cliente.notas &&(
                <p className="uppercase text-2xl mt-4 text-gray-700"><label className="font-bold text-gray-800">Notas:</label> {cliente.notas}</p>
            )}
            </>
        )}
    </div>)
  )
}

export default VerCliente