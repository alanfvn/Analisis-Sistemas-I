import React from 'react';
import Navigation from './components/Navigation';
import ComercioModal from './modals/ComercioModal';

import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import { useLocation,} from 'react-router-dom';

function Comercio(){

    const loc = useLocation();
    const [show, setShow] = React.useState(false);


    
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row>
                        <h1 className="shadow-sm mt-5 mb-5 p-3 text-center rounded">Comercios</h1>
                        {/* apartado de agregar comercio */}

                        <Col lg={7} md={6} sm={12} className="p-3 mb-5 shadow-sm rounded">
                            <Form onSubmit={()=>console.log('hi')}>
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Ingresa el nombre del comercio</Form.Label>
                                            <Form.Control
                                                name="comercio"
                                                onChange
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
                                                onChange
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
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td className='text-center'>
                                        <Button variant="secondary" onClick={()=>setShow(true)}>Editar</Button>
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="danger" onClick={()=>null}>Borrar</Button>
                                    </td>
                                </tr>        
                            </tbody>
                        </Table>
                    </Row>   

                    {/* modal */}
                    <ComercioModal shown={show} close={()=>setShow(false)}/>
            </Container>
        </div>
    );
}

export default Comercio;