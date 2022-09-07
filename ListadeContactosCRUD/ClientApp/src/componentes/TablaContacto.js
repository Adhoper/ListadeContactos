﻿import { Button, Table } from "reactstrap"

const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {


    const enviarDatos = (contacto) => {

        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (

        <Table striped responsive className="table-striped table-dark">

            <thead>

                <tr>

                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>     

                </tr>

            </thead>
            <tbody>
                {

                    (data.length < 1) ? (

                        <tr>
                            <td className="text-center" colSpan="5">Sin Registros</td>
                        </tr>
                        
                    ) : (

                            data.map((item) => (

                                <tr key={item.idContacto}>

                                    <td>{item.nombre }</td>
                                    <td>{item.apellido }</td>
                                    <td>{item.correo }</td>
                                    <td>{item.telefono }</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                        <Button color="danger" size="sm" onClick={() => eliminarContacto(item.idContacto)} >Eliminar</Button>

                                    </td>

                                </tr>
                                
                                ))
                            
                            )
                }

            </tbody>

        </Table>
        
        )
}

export default TablaContacto;