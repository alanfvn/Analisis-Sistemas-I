import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import ComercioModal from './modals/ComercioModal';
import HttpMan from '../util/HttpMan';

import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import { useLocation,} from 'react-router-dom';

function Comercio(){

    const loc = useLocation();
    //control de form.
    const [data, setData] = React.useState({
        "comercio": "",
        "propietarios": ""
    });
    const [form, setForm] = React.useState({});
    const [show, setShow] = React.useState(false);

    //comercios
    const [comercios, setComercios] = React.useState([]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, 
            [name]: value
        });
    };  

    const cargar = React.useCallback(()=>{
        HttpMan.get(`/get_shops`).then(resp =>{
            setComercios(resp.data);
        });
    }, []);
    

    const abrirForm = (data) =>{
        setShow(true);
        setForm(data);
    }

    const borrar = async (id) => {
        var resp = window.confirm("Deseas borrar el comercio?");
        if (resp) {
            await HttpMan.delete('/delete_comercio', { data: { id }});
            window.location.reload();
        }
    }

    const submit = async (e) =>{
        const {comercio, propietarios} = data;

        if(comercio === "" || propietarios === ""){
            alert('VERIFICA LOS CAMPOS PORFAVOR');
            e.preventDefault();
            return;
        }
        await HttpMan.post('/post_comercio', {
            "id": -1,
            comercio,
            propietarios
        });
    }

    React.useEffect(()=>{
        cargar();
    }, [cargar]);

    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row>
                        <h1 className="shadow-sm mt-5 mb-5 p-3 text-center rounded">Comercios</h1>
                        {/* apartado de agregar comercio */}

                        <Col lg={7} md={6} sm={12} className="p-3 mb-5 shadow-sm rounded">
                            <Form onSubmit={submit}>
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Ingresa el nombre del comercio</Form.Label>
                                            <Form.Control
                                                name="comercio"
                                                onChange={handleInput}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* categoria de queja */}
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Ingrese los propietarios</Form.Label>
                                            <Form.Control
                                                name="propietarios"
                                                as="textarea"
                                                onChange={handleInput}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col >
                                        <Button type="submit" variant="primary">Agregar comercio</Button>
                                    </Col>
                                </Row>
                            </Form>                               
                        </Col>

                        {/* apartado para visualizar comercios */}
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>ID Comercio</th>
                                    <th>Comercio</th>
                                    <th>Sucursales</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comercios.map(data=>{
                                        const {id_comercio, nombre_comercio, sucursales} = data;
                                        return (
                                            <tr key={id_comercio}>
                                                <td>{id_comercio}</td>
                                                <td>{nombre_comercio}</td>
                                                <td>{sucursales}</td>
                                                <td className='text-center'>
                                                    <Button variant="secondary" onClick={()=>abrirForm(data)}>Editar</Button>
                                                </td>
                                                <td className='text-center'>
                                                    <Button variant="danger" onClick={()=>borrar(id_comercio)}>Borrar</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>   

                    {/* modal */}
                    <ComercioModal shown={show} comercio={form} close={()=>setShow(false)}/>
            </Container>
            <Footer/>
        </div>
    );
}

export default Comercio;