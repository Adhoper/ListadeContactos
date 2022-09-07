import { useEffect, useState } from "react"
import { Col, Card, Container, Row, CardHeader, CardBody, Button } from "reactstrap"
import ModalContacto from "./componentes/ModalContacto"
import TablaContacto from "./componentes/TablaContacto"


const App = () => {


    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null)

    const mostrarContactos = async () => {

        const response = await fetch("api/contacto/Lista");

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
        else {
            console.log("Error al cargar la lista")
        }
    }


    useEffect(() => {

        mostrarContactos();

    }, [])


    const guardarContacto = async (contacto) => {

        const response = await fetch("api/contacto/Guardar", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }

    }

    const editarContacto = async (contacto) => {

        const response = await fetch("api/contacto/Editar", {

            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }

    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("Desea eliminar el contacto?")

        if (!response) {
            return;
        }

        const response = await fetch("api/contacto/Eliminar/" + id, {

            method: 'DELETE',
        })

        if (response.ok) {
            
            mostrarContactos();
        }

    }



    return (

        <Container>
            <Row className="mt-5">

                <Col sm="12">

                    <Card>

                        <CardHeader className="bg-primary">

                            <h5 className="text-center">Lista de Contactos</h5>

                        </CardHeader>
                        <CardBody className="bg-dark">

                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal) } >Agregar Nuevo Contacto</Button>
                            <hr></hr>

                            <TablaContacto setEditar={setEditar}
                                mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} data={contactos} eliminarContacto={eliminarContacto} />
                        
                        </CardBody>

                    </Card>
                

                </Col>

            </Row>

            <ModalContacto mostrarModal={mostrarModal} setMostralModal={setMostrarModal}
                guardarContacto={guardarContacto} editar={editar} setEditar={setEditar} editarContacto={editarContacto} />

        </Container>
        
        )
}

export default App;
