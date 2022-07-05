import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate() 

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().max(20,'El nombre es muy largo').min(3,'El nombre es muy corto').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email:Yup.string().email('No es un email valido').required('El email es obligatorio'),
        telefono:Yup.number().typeError('Debe ser un numero').integer('Numero no valido').positive('Numero no valido'),
        notas:''
    })

    const handleSubmit = async(valores) =>{
        try{
            let respuesta
            if(cliente.id){
                //editando
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url,{
                    method:'PUT',
                    body:JSON.stringify(valores),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/clientes')
            }
            else{
                //nuevo registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url,{
                    method:'POST',
                    body:JSON.stringify(valores),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/clientes')
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner/> :(
    <div className="bg-white mt-10 py-10 px-5 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h1>

        <Formik 
            initialValues={{
                nombre:cliente?.nombre ??'',
                empresa:cliente?.empresa ?? '',
                email:cliente?.email ??'',
                telefono:cliente?.telefono ??'',
                notas:cliente?.notas ??''
            }}
            enableReinitialize={true}
            onSubmit={async(values,{resetForm})=>{
                await handleSubmit(values)
                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors,touched})=>{
                // console.log(data)
                return(
            <Form className="mt-10">
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="nombre">Nombre: </label>
                    <Field
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        id="nombre"
                        placeholder="Nombre de cliente"
                        name="nombre"
                    />
                    {/* <ErrorMessage name="nombre"/> */}
                    {errors.nombre && touched.nombre ?(
                        <Alerta>{errors.nombre}</Alerta>
                    ):null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="empresa">Empresa: </label>
                    <Field
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        id="empresa"
                        placeholder="Empresa del cliente"
                        name="empresa"
                    />
                    {errors.empresa && touched.empresa ?(
                        <Alerta>{errors.empresa}</Alerta>
                    ):null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="email">Email: </label>
                    <Field
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        id="email"
                        placeholder="Email del cliente"
                        name="email"
                    />
                    {errors.email && touched.email ?(
                        <Alerta>{errors.email}</Alerta>
                    ):null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="telefono">Telefono: </label>
                    <Field
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        id="telefono"
                        placeholder="Telefono del cliente"
                        name="telefono"
                    />
                    {errors.telefono && touched.telefono ?(
                        <Alerta>{errors.telefono}</Alerta>
                    ):null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="notas">Notas: </label>
                    <Field
                        as="textarea"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                        id="notas"
                        placeholder="Notas del cliente"
                        name="notas"
                    />
                </div>
                <input
                    type="submit"
                    value={cliente?.nombre ? 'Editar Cliente':"Agregar Cliente"}
                    className="p-3 mt-5 text-lg text-white uppercase font-black bg-blue-900 w-full"
                />
            </Form>)}}
        </Formik>
    </div>
  ))
}

Formulario.defaultProps = {
    cliente:{},
    cargando:false
}

export default Formulario