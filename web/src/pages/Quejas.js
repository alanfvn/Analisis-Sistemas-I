import React from 'react'
import QuejaModal from './modals/QuejaModal'
import Navigation from './components/Navigation';

import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import { useLocation,} from 'react-router-dom';

function Quejas(){ 
    const [show, setShow] = React.useState(false);
    const loc = useLocation();
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row className='mt-5'>
                    <h1 className="shadow-sm mb-5 p-3 text-center rounded">Quejas</h1>
                    <Col className="p-3 mb-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={()=>console.log('hi')}>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Selecciona el comercio</Form.Label>
                                        <Form.Control
                                            name="comercio"
                                            as="select"
                                            onChange
                                        >
                                            <option value="-1">Selecciona un comercio</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* categoria de queja */}
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione una categoria</Form.Label>
                                        <Form.Control
                                            name="categoria"
                                            as="select"
                                            onChange
                                        >
                                            <option value="-1">Selecciona la categoria</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione la fecha inicial</Form.Label>
                                        <Form.Control 
                                            name="fecha1"
                                            type="date" 
                                            onChange={()=>console.log('hi')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione la fecha final</Form.Label>
                                        <Form.Control 
                                            name="fecha2"
                                            type="date" 
                                            onChange={()=>console.log('hi')}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione el departamento</Form.Label>
                                        <Form.Control 
                                            name="departamento"
                                            as="select"
                                            onChange={()=>console.log('hi')}
                                        >
                                            <option value="-1">Seleccione el departamento</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione el municipio</Form.Label>
                                        <Form.Control 
                                            name="municipio"
                                            as="select"
                                            onChange={()=>console.log('hi')}
                                        >
                                            <option value="-1">Seleccione el municipio</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='mt-4'>
                                <Col >
                                    <Button type="submit" variant="primary">Filtrar información</Button>
                                </Col>
                            </Row>
                        </Form>                               
                    </Col>

                    {/* apartado para visualizar comercios */}
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>ID Queja</th>
                                <th>Comercio</th>
                                <th>Fecha</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td className='text-center'>
                                    <Button variant="info" onClick={()=>setShow(true)}>Detalles</Button>
                                </td>
                            </tr>        
                        </tbody>
                    </Table>
                </Row> 
                <QuejaModal shown={show} close={()=>setShow(false)}/>
            </Container>
        </div>
    );
}

export default Quejas;