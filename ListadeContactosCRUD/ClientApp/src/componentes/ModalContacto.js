import {useEffect, useState } from "react"
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"


const modeloContacto = {

    idContacto: 0,
    nombre: "",
    apellido: "",
    correo: "",
    telefono: ""
}


const ModalContacto = ({ mostrarModal, setMostralModal, guardarContacto, editar, setEditar, editarContacto }) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setContacto(

            {
                ...contacto,
                [e.target.name]: e.target.value
            }

        )
    }

    const enviarDatos = () => {

        if (contacto.idContacto == 0) {
            guardarContacto(contacto)
        }
        else {
            editarContacto(contacto)
        }

        setContacto(modeloContacto)
    }


    useEffect(() => {

        if (editar != null) {
            setContacto(editar)
        }
        else {
            setContacto(modeloContacto)
        }
    }, [editar])


    const cerrarModal = () => {

        setMostralModal(!mostrarModal)
        setEditar(null)
    }

    return (

        <Modal isOpen={mostrarModal}>

            <ModalHeader>

                {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto"}
                
            
            </ModalHeader>
            <ModalBody>

                <Form>

                    <FormGroup>

                        <Label >Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre}></Input>
            
                    </FormGroup>
                    <FormGroup>

                        <Label>Apellido</Label>
                        <Input name="apellido" onChange={(e) => actualizarDato(e)} value={contacto.apellido}></Input>

                    </FormGroup>
                    <FormGroup>

                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo}></Input>

                    </FormGroup>
                    <FormGroup>

                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono}></Input>

                    </FormGroup>
            
                </Form>

            </ModalBody>
            <ModalFooter>

                <Button color="primary" size="sm" onClick={enviarDatos} >Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>

            </ModalFooter>

        </Modal>

        )
}

export default ModalContacto;